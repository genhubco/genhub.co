import React from "react";
import Head from "../components/Head";
import Header from "../components/Header";
import StatusBar from "../components/StatusBar";
import "../styles/page.css";
import "../styles/editor.css";

import { highlightToml, keysMap, lifeCycleMap } from "granit-utils";
import Editor from "granit";
import axios from "axios";

export default class DemoPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: {},
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
        const url = "https://api.genhub.co/score";
        try {
            const res = await axios.post(url, value);
            const status = res.status === 200 ? "success" : "error";
            this.setState({
                results: res.data,
                status,
                message: "Compiled"
            });
        } catch (e) {
            const errors = {
                "invalid-input-pam": "Invalid PAM sequence",
                "invalid-input-target": "Invalud target sequence",
                "invalid-input-template": "Invalid template sequence",
                "invalid-input-algo": "Invalid algorithm chosen"
            }
            this.setState({
                status: "error",
                message: errors[e.response.data]
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

    render() {
        const defaultText = `pam = "CGG"\ntarget = "AGTCTGAGAAGGGTC"\ntemplate = "GAG"\nalgo = "all"`;
        const deepLearningColor = this.lerpColor("0xEE6868", "0x7FE49B", this.state.results.cnn_score);
        const scoringColor = this.lerpColor("0xEE6868", "0x7FE49B", this.state.results.cfd_score);
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
                    {this.renderDeepLearning()}
                    {this.renderScoring()}
                </div>
                <style jsx global>{`
                      .cnn-result {
                          color: ${deepLearningColor};
                      }
                      .cfd-result {
                          color: ${scoringColor};
                      }
                `}</style>
            </div>
        );
    }
}
