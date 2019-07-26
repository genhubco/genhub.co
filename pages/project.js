import { decode } from "jsonwebtoken";
import ms from "ms";
import { parse } from "toml";
import { get, post } from "axios";
import { parseCookies } from "nookies";
import { highlightToml, keysMap, lifeCycleMap } from "granit-utils";
import Editor from "granit";
import Error from 'next/error';
import Link from "next/link";

import Page from "../components/Page";
import Interval from "../components/Interval";
import Header from "../components/Header";
import Nav from "../components/Nav";
import ImageUpload from "../components/ImageUpload";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import StatusBar from "../components/StatusBar";
import CrisprTargetMap from "../components/CrisprTargetMap";
import Table from "../components/Table";
import sharedState from "../components/SharedState";

class Project extends React.Component {
    static async getInitialProps(ctx) {
        const projectUserId = ctx.query.user;
        const projectId = ctx.query.id;

        const cookies = parseCookies(ctx);
        const token = cookies[process.env.TOKEN_COOKIE_NAME];
        const authUser = decode(token);

        try {
            const projectPromise = get(process.env.PROJECTS_URL + `.get?id=${projectId}`);
            const resultsPromise = get(process.env.RESULTS_URL + `.list?project=${projectId}`);
            const userPromise = get(process.env.PROFILE_URL + `.get?id=${projectUserId}`);
            const [projectRes, resultsRes, userRes] = await Promise.all([projectPromise, resultsPromise, userPromise]);
            const project = projectRes.data;
            const results = resultsRes.data;
            const user = userRes.data;

            const resultUsersPromises = results.map(item => get(process.env.PROFILE_URL + `.get?id=${item.user}`));
            const resultsUsers = await Promise.all(resultUsersPromises);
            const mappedUsers = resultsUsers.map(item => item.data);

            mappedUsers.forEach((item, i) => { results[i].user = item; });
            results.sort((a, b) => b.created_at - a.created_at);

            return { user, project, results, token, authUser };
        } catch (e) {
            console.log(e);
            const status = e.response ? e.response.status : 500;
            return { status };
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
        return {
            headers,
            results: fixedData
        };
    }

    renderConfig() {
        const { project, user, authUser, token } = this.props;
        const EditorWithMapAndTable = sharedState(({ state, setState }) => (
            <div>
                <p className="desc">Write your config:</p>
                <Editor
                    defaultValue={project.config}
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
                            const { created_at, updated_at, user, ...rest } = project;
                            const newProject = { ...rest, config: value };
                            await post(process.env.PROJECTS_URL + ".set", newProject, { headers: { Authorization: "Bearer " + token } });
                            setState({ status: "success", message: "✓ Compiled", result: res.data, config: parsedToml });
                        } catch (e) {
                            console.log(e);
                            if (e.name == "SyntaxError") {
                                setState({ status: "error", message: "× Failed to parse toml file." });
                            } else {
                                setState({ status: "error", message: "× Oops, an unexpected error occured, sorry about that." });
                            }
                        }
                    }}
                    editable={authUser.id === user.id}
                />
            </div>
        ), ({ state, setState }) => (
            <div className="search-results">
                <StatusBar status={state.status} message={state.message}/>
                <CrisprTargetMap className="project-crispr-target-map" data={state.result} />
                <Table data={this.formatResultsForTable(state)} />
            </div>
        ));
        return (
            <div className="project-config">
                <EditorWithMapAndTable initialState={{ status: "success", message: "✓ Compiled", result: { targets: [] }, config: parse(project.config) }}/>
                <style jsx global>{`
                    .project-crispr-target-map {
                        margin: 20px 0;
                    }
                `}</style>
            </div>
        );
    }

    renderResults() {
        const { authUser, user, project, token, results } = this.props;
        const noResults = (
            <div className="no-results-container">
                <p className="desc">
                    No results found.
                </p>
                <style jsx>{`
                    .no-results-container {
                        text-align: center;
                    }
                `}</style>
            </div>
        );
        const ResultsWithHeader = sharedState(({ state, setState }) => (
            <div className="project-results-header">
                <span className="text">Total {results.length} results</span>
                <div>
                    {
                        state.error ?
                        <span className="error button-with-error-span"> {state.error} </span> :
                        null
                    }
                    <Button onClick={async () => {
                        try {
                            const newResult = { id: null, image: "", desc: "", project: project.id };
                            const response = await post(process.env.RESULTS_URL + ".set", newResult, {
                                headers: { Authorization: "Bearer " + token }
                            });
                            const userResponse = await get(process.env.PROFILE_URL + `.get?id=${response.data.user}`);
                            const newResultData = {
                                ...response.data,
                                user: userResponse.data
                            };
                            setState({ results: [ ...state.results, newResultData], error: "" });
                        } catch (e) {
                            console.log(e);
                            setState({ error: "Failed to add new result." });
                        }
                    }} className="btn-primary">add new result +</Button>
                </div>
                <style jsx>{`
                    .project-results-header {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #f2f3f4;
                        padding-bottom: 5px;
                        margin-bottom: 10px;
                        align-items: center;
                    }

                    .button-with-error-span {
                        margin-right: 5px;
                    }
                `}</style>
            </div>
        ), ({ state, setState }) => (
            !state.results.length ? noResults : state.results.map((item, i) => (
                <div key={item.id} className="project-result">
                    <div className="project-result-header">
                        <Link href={`/profile?id=${item.user.id}&tab=projects`}>
                            <a className="internal-link">
                                <img className="project-result-header-user" src={`${process.env.AVATAR_URL}?id=${item.user.email_sha256}&size=20`} /> {item.user.username}
                            </a>
                        </Link>
                        <span className="desc">
                            <Interval every={5000} render={(time) => {
                                if (!time) {
                                    return null;
                                }

                                return item.updated_at ?
                                "updated " + ms(time - item.updated_at, { long: true }) + " ago" :
                                "added "  + ms(time - item.created_at, { long: true }) + " ago";
                            }} />
                        </span>
                    </div>
                    <div className="project-result-content">
                        <div className="project-result-left">
                            <ImageUpload
                                initialValue={item.image}
                                onAdd={async (base64) => {
                                    try {
                                        const base64String = base64.split(",")[1];
                                        const imageName = "result.png";
                                        const { data } = await post("https://api.zeit.co/v9/now/deployments", {
                                            name: process.env.RESULT_IMAGES_NOW_NAME,
                                            version: 2,
                                            files: [{ file: imageName, data: base64String, encoding: "base64" }]
                                        }, {
                                            headers: {
                                                Authorization: `Bearer ${process.env.ZEIT_API_TOKEN}`,
                                                "Content-Type": "application/octet-stream"
                                            }
                                        });
                                        const url = `https://${data.url}/${imageName}`;
                                        const { created_at, updated_at, user, ...rest } = item;
                                        const newResult = { ...rest, image: url };
                                        await post(process.env.RESULTS_URL + ".set", newResult, {
                                            headers: { Authorization: `Bearer ${token}` }
                                        });
                                        return { url, error: "" };
                                    } catch (e) {
                                        return { error: "Failed to upload the image." };
                                    }
                                }}
                                onRemove={async () => {
                                    try {
                                        const { created_at, updated_at, user, ...rest } = item;
                                        const newResult = { ...rest, image: "" };
                                        await post(process.env.RESULTS_URL + ".set", newResult, {
                                            headers: {
                                                Authorization: `Bearer ${token}`
                                            }
                                        });
                                        return { url: "", error: "" };
                                    } catch (e) {
                                        return { error: "Failed to remove the image." };
                                    }
                                }}
                            />
                        </div>
                        <div className="project-result-right">
                            <Textarea
                                placeholder={authUser.id === user.id ? "Add some comments..." : "No comments yet..."}
                                initialValue={item.desc}
                                editable={authUser.id === user.id}
                                onSave={async (value) => {
                                    try {
                                        const { created_at, updated_at, user, ...rest } = item;
                                        const newResult = { ...rest, desc: value };
                                        await post(process.env.RESULTS_URL + ".set", newResult, {
                                            headers: { Authorization: "Bearer " + token }
                                        });
                                        return { value, lastSavedValue: value, readMode: true, error: "" };
                                    } catch (e) {
                                        console.log(e);
                                        return { error: "Failed to update the comment." };
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <style jsx>{`
                        .project-result {
                            margin-bottom: 15px;
                        }

                        .project-result-content {
                            display: flex;
                        }

                        .project-result-left {
                            margin-right: 10px;
                        }

                        .project-result-header {
                            margin-bottom: 5px;
                        }

                        .project-result-header-user {
                            vertical-align: bottom;
                            border-radius: 50%;
                        }
                    `}</style>
                </div>
            ))
        ));
        return (
            <div className="project-results">
                <ResultsWithHeader initialState={{ results, error: "" }}/>
            </div>
        );
    }

    render() {
        const { user, project, authUser, status } = this.props;
        if (status) {
            return (<Error statusCode={status} />);
        }
        return (
            <Page header={<Header user={authUser}/>}>
                <div className="project-header">
                    <h3 className="title">{project.title}</h3>
                    <div className="project-header-user">
                        <Link href={`/profile?id=${user.id}&tab=projects`}>
                            <a className="internal-link">{user.username} <img className="project-header-user-img" src={`${process.env.AVATAR_URL}?id=${user.email_sha256}&size=20`} /></a>
                        </Link>
                    </div>
                </div>
                <Nav
                    options={["config", "results"]}
                    render={(option) => {
                        if (option === "config") {
                            return this.renderConfig();
                        } else if (option === "results") {
                            return this.renderResults();
                        }
                    }}
                />
                <style jsx>{`
                    .project-header {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #f2f3f4;
                        margin-bottom: 20px;
                    }

                    .project-header-user-img {
                        vertical-align: bottom;
                        border-radius: 50%;
                    }
                `}</style>
            </Page>
        );
    }
}

export default Project;
