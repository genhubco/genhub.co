import { highlightToml, keysMap, lifeCycleMap } from "granit-utils";
import Editor from "granit";
import { parse } from "toml";

import StatusBar from "../components/StatusBar";
import Table from "../components/Table";
import CrisprTargetMap from "../components/CrisprTargetMap";

export default class EditorWithMapAndTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.initialState;
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
        const { config, predictions } = state;
        const data = predictions.targets;
        if (!data.length) {
            return {
                headers: [],
                results: [],
            };
        };
        const headersMap = {
            position: "Position",
            match: "Match",
            cnn_score: "CNN",
            cfd_score: "CFD"
        };
        const headers = Object.keys(data[0]).map(item => ({
            key: item,
            display: headersMap[item]
        }));
        const fixedData = data.map(item => ({
            position: (<span>{item.position}</span>),
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
        const { config, predictions, status, message } = this.state;
        return (
            <div>
                <p className="text">{this.props.editable ? "Write your config:" : "Config:"}</p>
                <Editor
                    editable={this.props.editable}
                    initialValue={config}
                    keysMap={keysMap}
                    lifeCycleMap={lifeCycleMap}
                    highlight={highlightToml}
                    width={750}
                    height={200}
                    padding={20}
                    onSave={async (value) => {
                        this.setState({ status: "loading", message: "• Compiling..." });
                        const newState = await this.props.onSave(value);
                        this.setState(newState);
                    }}
                />
                <StatusBar status={status} message={message}/>
                <CrisprTargetMap data={predictions}/>
                <Table data={this.formatResultsForTable({ config: parse(config), predictions })} />
                <style>{`
                    .crispr-target-map {
                        margin: 20px 0;
                    }

                    .rank-table-container {
                        margin-bottom: 20px;
                    }
                `}</style>
            </div>
        );
    }
}
