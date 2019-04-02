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
            status: "success"
        };

        this.compileAndRank = this.compileAndRank.bind(this);
    }

    async compileAndRank(value) {
        this.setState({
            status: "loading",
        });
        const url = "https://grna-scoring-service-git-master.genhub.now.sh/api/score";
        try {
            const res = await axios.post(url, value);
            this.setState({
                status: res.status === 200 ? "success" : "error"
            });
        } catch (e) {
            this.setState({
                status: "error"
            });
        }
    }

    render() {
        const defaultText = `target_seq = "ACTGTACCTGCACGGTACGT"\nscoring_algo = "all"`;
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
                    <StatusBar status={this.state.status}/>
                </div>
            </div>
        );
    }
}
