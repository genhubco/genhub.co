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

class ProjectConfig extends React.Component {
    static async getInitialProps(ctx) {
        const projectUserId = ctx.query.user;
        const projectId = ctx.query.id;

        const cookies = parseCookies(ctx);
        const token = cookies[process.env.TOKEN_COOKIE_NAME];
        const authUser = decode(token);

        try {
            const projectPromise = get(process.env.PROJECTS_URL + `.get?id=${projectId}`);
            const userPromise = get(process.env.PROFILE_URL + `.get?id=${projectUserId}`);
            const [projectRes, userRes] = await Promise.all([projectPromise, userPromise]);
            const project = projectRes.data;
            const user = userRes.data;

            return { user, project, token, authUser };
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
                    editable={authUser && authUser.id === user.id}
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
                        <Link href={`/profile-projects?id=${user.id}`}>
                            <a className="internal-link">
                                <span>{user.username}</span> <img className="project-header-user-img" src={`${process.env.AVATAR_URL}?id=${user.email_sha256}&size=17`} />
                            </a>
                        </Link>
                    </div>
                </div>
                <Nav
                    options={[
                        { display: "config", href: { pathname: "/project-config", query: { id: project.id, user: user.id }}},
                        { display: "results", href: { pathname: "/project-results", query: { id: project.id, user: user.id }}}
                    ]}
                >
                    {this.renderConfig()}
                </Nav>
                <style jsx>{`
                    .project-header {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #f2f3f4;
                        margin-bottom: 20px;
                    }

                    .project-header-user-img {
                        vertical-align: text-bottom;
                        border-radius: 50%;
                    }
                `}</style>
            </Page>
        );
    }
}

export default ProjectConfig;
