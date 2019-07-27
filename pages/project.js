import { decode } from "jsonwebtoken";
import ms from "ms";
import toml from "toml";
import { get, post } from "axios";
import { parseCookies } from "nookies";
import Error from "next/error";
import Link from "next/link";

import Page from "../components/Page";
import EditorWithMapAndTable from "../components/EditorWithMapAndTable";
import Interval from "../components/Interval";
import Header from "../components/Header";
import Nav from "../components/Nav";
import ImageUpload from "../components/ImageUpload";
import TextareaWithPreview from "../components/TextareaWithPreview";
import Button from "../components/Button";
import WithState from "../components/WithState";

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

    renderConfig() {
        const { project, user, authUser, token } = this.props;
        return (
            <div className="project-config">
                <EditorWithMapAndTable
                    initialState={{ status: "success", message: "✓ Compiled", predictions: JSON.parse(project.predictions), config: project.config }}
                    onSave={async (value) => {
                        try {
                            const parsedToml = toml.parse(value);
                            parsedToml.numItems = 10;
                            const res = await post(process.env.SEARCH_URL, JSON.stringify(parsedToml));
                            const { created_at, updated_at, user, ...rest } = project;
                            const newProject = { ...rest, config: value, predictions: JSON.stringify(res.data) };
                            await post(process.env.PROJECTS_URL + ".update", newProject, {
                                headers: { Authorization: "Bearer " + token }
                            });
                            return { status: "success", message: "✓ Compiled", predictions: res.data };
                        } catch (e) {
                            console.log(e);
                            if (e.name == "SyntaxError") {
                                return { status: "error", message: "× Failed to parse toml file." };
                            } else {
                                return { status: "error", message: "× Invalid config." };
                            }
                        }
                    }}
                />
            </div>
        );
    }

    renderResult(item) {
        const { authUser, user, token } = this.props;
        return (<WithState key={item.id} initialState={item} initialData={item} render={({ state, setState, getData, setData }) => (
            <div className="project-result">
                <div className="project-result-header">
                    <Link href={`/profile?id=${state.user.id}&tab=projects`}>
                        <a className="internal-link">
                            <img className="project-result-header-user" src={`${process.env.AVATAR_URL}?id=${state.user.email_sha256}&size=20`} /> {state.user.username}
                        </a>
                    </Link>
                    <span className="desc">
                        <Interval every={5000} render={(time) => {
                            if (!time) {
                                return null;
                            }

                            const data = getData();
                            const hasUpdated = data.updated_at != null;
                            let diff = hasUpdated ? time - data.updated_at : time - data.created_at ;
                            const text = diff < 0 ? "just now" : ms(diff, { long: true }) + " ago";
                            return hasUpdated ? "Updated " + text : "Created " + text;
                        }} />
                    </span>
                </div>
                <div className="project-result-content">
                    <div className="project-result-left">
                        <ImageUpload
                            initialValue={state.image}
                            editable={authUser && authUser.id === user.id}
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
                                    const { id, project, desc, ...rest } = getData();
                                    const newResult = { id, project, desc, image: url };
                                    await post(process.env.RESULTS_URL + ".update", newResult, {
                                        headers: { Authorization: `Bearer ${token}` }
                                    });
                                    setData({ image: url, updated_at: Date.now() });
                                    return { value: url, error: "" };
                                } catch (e) {
                                    console.log(e);
                                    return { error: "Failed to upload the image." };
                                }
                            }}
                            onRemove={async () => {
                                try {
                                    const { id, project, desc, ...rest } = getData();
                                    const newResult = { id, project, desc, image: "" };
                                    await post(process.env.RESULTS_URL + ".update", newResult, {
                                        headers: { Authorization: `Bearer ${token}` }
                                    });
                                    setData({ image: "", updated_at: Date.now() });
                                    return { value: "", error: "" };
                                } catch (e) {
                                    console.log(e);
                                    return { error: "Failed to remove the image." };
                                }
                            }}
                        />
                    </div>
                    <div className="project-result-right">
                        <TextareaWithPreview
                            placeholder={authUser && authUser.id === user.id ? "Add some comments..." : "No comments yet..."}
                            initialValue={state.desc}
                            editable={authUser && authUser.id === user.id}
                            onSave={async (value) => {
                                try {
                                    const { id, project, image, ...rest } = getData();
                                    const newResult = { id, project, image, desc: value };
                                    await post(process.env.RESULTS_URL + ".update", newResult, {
                                        headers: { Authorization: "Bearer " + token }
                                    });
                                    setData({ desc: value, updated_at: Date.now() });
                                    return { value, lastSavedValue: value, editMode: false, error: "" };
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
        )} />);
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
        return (<WithState initialState={{ results, error: "" }} render={({ state, setState }) => (
            <div className="project-results">
                <div className="project-results-header">
                    <span className="text">Total {state.results.length} results</span>
                    {(authUser && authUser.id === user.id) && <div>
                        {
                            state.error ?
                            <span className="error button-with-error-span"> {state.error} </span> :
                            null
                        }
                        <Button onClick={async () => {
                            try {
                                const newResult = { image: "", desc: "", project: project.id };
                                const response = await post(process.env.RESULTS_URL + ".create", newResult, {
                                    headers: { Authorization: "Bearer " + token }
                                });
                                const userResponse = await get(process.env.PROFILE_URL + `.get?id=${response.data.user}`);
                                const newResultData = {
                                    ...response.data,
                                    user: userResponse.data
                                };
                                setState({ results: [newResultData, ...state.results], error: "" });
                            } catch (e) {
                                console.log(e);
                                setState({ error: "Failed to add new result." });
                            }
                        }} className="btn-primary">add new result +</Button>
                    </div>}
                </div>
                <div>
                    {!state.results.length ? noResults : state.results.map((item, i) => this.renderResult(item))}
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
        )}/>);
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
