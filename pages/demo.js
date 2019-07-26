import { highlightToml, keysMap, lifeCycleMap } from "granit-utils";
import Editor from "granit";
import { post } from "axios";
import { parse } from "toml";
import { decode } from "jsonwebtoken";
import { parseCookies } from "nookies";

import StatusBar from "../components/StatusBar";
import Header from "../components/Header";
import Table from "../components/Table";
import CrisprTargetMap from "../components/CrisprTargetMap";
import Page from "../components/Page";
import sharedState from "../components/SharedState";

export default class DemoPage extends React.Component {
    static async getInitialProps(ctx) {
        const cookies = parseCookies(ctx);
        const token = cookies[process.env.TOKEN_COOKIE_NAME];
        const authUser = decode(token);

        return { authUser };
    }

    lerpColor(a, b, amount) {
        const ah = parseInt(a.replace(/#/g, ''), 16),
            ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
            bh = parseInt(b.replace(/#/g, ''), 16),
            br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
            rr = ar + amount * (br - ar),
            rg = ag + amount * (bg - ag),
            rb = ab + amount * (bb - ab);

        return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
    };

    formatResultsForTable(state) {
        const data = state.result.targets;
        const config = state.config;
        if (!data.length) {
            return {
                headers: [],
                results: [],
            };
        };
        const headersMap = {
            match: "Match",
            cnn_score: "CNN",
            cfd_score: "CFD"
        };
        const headers = Object.keys(data[0]).map(item => ({
            key: item,
            display: headersMap[item]
        }));
        const fixedData = data.map(item => ({
            match: (
                <span>
                    <span style={{ color: "#a7afb5"}}>{item.match.slice(0, 3)}</span>
                    {item.match.slice(3, item.match.length).split("").map((letter, i) => {
                        if (!config.grna) {
                            return letter;
                        }
                        if (letter !== config.grna[i]) {
                            return (<span key={`key-${i}`} style={{ color: "#EE6868" }}>{letter}</span>);
                        }
                        return letter;
                    })}
                </span>
            ),
            cnn_score: item.cnn_score != null ? (
                <span style={{ color: this.lerpColor("0xEE6868", "0x7FE49B", item.cnn_score) }}>{item.cnn_score.toFixed(2)}</span>
            ) : null,
            cfd_score: item.cfd_score != null ? (
                <span style={{ color: this.lerpColor("0xEE6868", "0x7FE49B", item.cfd_score) }}>{item.cfd_score.toFixed(2)}</span>
            ) : null,
        }))
        return { headers, results: fixedData };
    }

    render() {
        const defaultText = "# Algorithms available: \"cnn\", \"cfd\", \"all\"\n" +
                            "algo = \"all\"\n" +
                            "# Name of the gene you are targeting\n" +
                            "gene = \"EMX1\"\n" +
                            "# PAM sequence\n" +
                            "pam = \"CGG\"\n" +
                            "# Your guide RNA\n" +
                            "grna = \"GAGCGTCGTCG\"";
        const EditorWithMap = sharedState(({ state, setState }) => (
            <div>
                <p className="text">Write your config:</p>
                <Editor
                    keysMap={keysMap}
                    lifeCycleMap={lifeCycleMap}
                    highlight={highlightToml}
                    width={750}
                    height={200}
                    padding={20}
                    onSave={async (value) => {
                        setState({ status: "loading", message: "• Compiling..." });
                        try {
                            const parsedToml = parse(value);
                            parsedToml.numItems = 10;
                            const res = await post(process.env.SEARCH_URL, JSON.stringify(parsedToml));
                            setState({ config: parsedToml, result: res.data, status: "success", message: "✓ Compiled" });
                        } catch (e) {
                            if (e.name == "SyntaxError") {
                                setState({ status: "error", message: "× Failed to parse toml file." });
                            } else {
                                setState({ status: "error", message: "× Oops, an unexpected error occured, sorry about that." });
                            }
                        }
                    }}
                    defaultValue={defaultText}
                />
            </div>
        ), ({ state, setState }) => (
            <div>
                <StatusBar status={state.status} message={state.message}/>
                <CrisprTargetMap data={state.result}/>
                <Table data={this.formatResultsForTable(state)} />
            </div>
        ));
        return (
            <Page header={<Header user={this.props.authUser} />}>
                <EditorWithMap initialState={{ status: "success", message: "✓ Compiled", result: { targets: [] }, config: parse(defaultText) }}/>
                <style>{`
                    .crispr-target-map {
                        margin: 20px 0;
                    }

                    .rank-table-container {
                        margin-bottom: 20px;
                    }
                `}</style>
            </Page>
        );
    }
}
