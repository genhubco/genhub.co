import React from "react";
import { highlightToml, keysMap, lifeCycleMap } from "granit-utils";
import Editor from "granit";
import { post } from "axios";
import { parse } from "toml";
import config from "../vars.json";

import Head from "../components/Head";
import Header from "../components/Header";
import StatusBar from "../components/StatusBar";
import Table from "../components/Table";
import "../styles/page.css";
import "../styles/editor.css";

export default class DemoPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            status: "success",
            message: "Compiled"
        };

        this.compileAndRank = this.compileAndRank.bind(this);
    }

    async compileAndRank(value) {
        this.setState({
            status: "loading",
            message: "Compiling..."
        });
        const url = config.api.search;
        try {
            const parsedToml = parse(value);
            parsedToml.numItems = 10;
            const res = await post(url, JSON.stringify(parsedToml));
            this.setState({
                results: res.data,
                status: "success",
                message: "Compiled"
            });
        } catch (e) {
            const errors = {
                "invalid-input-algo": "Invalid algorithm chosen",
                "invalid-input-pam": "Invalid pam sequence",
                "invalid-input-grna": "Invalid guide rna",
                "invalid-input-gene": "Invalid gene name specified"
            };
            const message = e.response ? errors[e.response.data] : "Oops, an unexpected error occured, sorry about that.";
            this.setState({
                status: "error",
                message
            });
        }
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

    renderDeepLearning() {
        if (this.state.results.cnn_score == null) {
            return;
        }
        return (
            <div>
                <p className="text">
                    CNN On-target probability: <span className="cnn-result">
                        {(this.state.results.cnn_score * 100).toFixed(2)} %
                    </span>
                </p>
            </div>
        );
    }

    renderScoring() {
        if (this.state.results.cfd_score == null) {
            return;
        }
        return (
            <div>
                <p className="text">CFD score: <span className="cfd-result">{this.state.results.cfd_score.toFixed(2)}</span></p>
            </div>
        );
    }

    formatResultsForTable(data) {
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
                    {item.match.slice(3, item.match.length)}
                </span>
            ),
            cnn_score: item.cnn_score != null ? (
                <span style={{ color: this.lerpColor("0xEE6868", "0x7FE49B", item.cnn_score) }}>{item.cnn_score.toFixed(2)}</span>
            ) : null,
            cfd_score: item.cfd_score != null ? (
                <span style={{ color: this.lerpColor("0xEE6868", "0x7FE49B", item.cfd_score) }}>{item.cfd_score.toFixed(2)}</span>
            ) : null,
        }))
        return {
            headers,
            results: fixedData
        };
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
        return (
            <div>
                <Head/>
                <Header/>
                <div className="content-big">
                    <p className="small-title">Write commands for the run:</p>
                    <Editor
                        keysMap={keysMap}
                        lifeCycleMap={lifeCycleMap}
                        highlight={highlightToml}
                        width={750}
                        height={200}
                        padding={20}
                        onSave={this.compileAndRank}
                        defaultValue={defaultText}
                    />
                    <StatusBar status={this.state.status} message={this.state.message}/>
                    <Table data={this.formatResultsForTable(this.state.results)} />
                </div>
            </div>
        );
    }
}
