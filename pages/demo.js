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
        const url = "https://grna-scoring-service-git-master.genhub.now.sh/api/score";
        try {
            const res = await axios.post(url, value);
            const status = res.status === 200 ? "success" : "error";
            this.setState({
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

    render() {
        const defaultText = `pam = "AGG"\ntarget = "ACTGTACCTGCACGGTACGT"\ntemplate = "ACTGTACCTGCACGGTACAA"\nalgo = "deep_learning"`;
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
                    <p className="small-title">Scores:</p>
                    <p className="title">Coming soon...</p>
                </div>
            </div>
        );
    }
}
