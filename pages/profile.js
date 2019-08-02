import { decode } from "jsonwebtoken";
import ms from "ms";
import axios from "axios";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { withRouter } from "next/router";
import Link from "next/link";
import Error from "next/error";
const { get, post } = axios;

import Page from "../components/Page";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Input from "../components/Input";
import Button from "../components/Button";
import WithState from "../components/WithState";

class Profile extends React.Component {
    static async getInitialProps(ctx) {
        const { id } = ctx.query;

        const cookies = parseCookies(ctx);
        const token = cookies[process.env.TOKEN_COOKIE_NAME];
        const authUser = decode(token);

        try {
            const projectsPromise = get(process.env.PROJECTS_URL + `.list?user=${id}`);
            const userPromise = get(process.env.PROFILE_URL + `.get?id=${id}`);
            const [projectsRes, userRes] = await Promise.all([projectsPromise, userPromise]);
            const projects = projectsRes.data;
            const user = userRes.data;
            projects.sort((a, b) => b.created_at - a.created_at);
            return { user, projects, token, authUser, now: Date.now() };
        } catch(e) {
            console.log(e);
            const status = e.response ? e.response.status : 500;
            return { status };
        }
    }

    renderProjects() {
        const { projects, authUser, user, now } = this.props;
        if (!projects.length) {
            return (
                <div className="no-user-projects-container">
                    <p className="desc">
                        No projects found.
                        {authUser && <Link href="/new-project">
                            <span><a className="internal-link"> Create new project</a>?</span>
                        </Link>}
                    </p>
                    <style jsx>{`
                        .no-user-projects-container {
                            text-align: center;
                        }
                    `}</style>
                </div>
            );
        }
        return (
            <div>
                <div className="user-projects-header">
                    <span className="text">Total {projects.length} projects</span>
                    {authUser && <Link href="/new-project">
                        <a className="internal-link">create new project +</a>
                    </Link>}
                </div>
                {projects.map((item, i) => (
                    <div key={item.id} className="user-project-container">
                        <Link href={`/project?id=${item.id}&user=${item.user}&tab=config`}>
                            <a className="internal-link">{item.title}</a>
                        </Link>
                        <p className="desc">{
                            item.updated_at ?
                            `Updated ${ms(now - item.updated_at, { long: true })} ago` :
                            `Created ${ms(now - item.created_at, { long: true })} ago`
                        }</p>
                    </div>
                ))}
                <style jsx>{`
                    .user-projects-header {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #f2f3f4;
                        padding-bottom: 5px;
                        margin-bottom: 10px;
                    }

                    .user-project-container {
                        border: 1px solid #f2f3f4;
                        border-radius: 5px;
                        padding: 10px;
                        margin-bottom: 10px;
                    }
                `}</style>
            </div>
        )
    }

    renderSettings() {
        const { authUser, token, router } = this.props;
        if (!authUser) {
            return null;
        }
        return (
            <div className="settings-container">
                <WithState initialState={{ usernameError: "" }} initialData={{ username: "" }} render={({ state, setState, setData, getData }) => (
                    <div>
                        <Input
                            onChange={(value) => setData({ username: value })}
                            error={state.usernameError}
                            initialValue={authUser.username}
                            desc="Change username:"
                            prefix="genhub.co/profile/"
                        />
                        <Button onClick={async () => {
                            try {
                                const newInputs = getData();
                                const response = await post(process.env.PROFILE_URL + ".update", newInputs, {
                                    headers: { "Authorization": "Bearer " + token }
                                });
                                setCookie({}, process.env.TOKEN_COOKIE_NAME, response.data.token);
                                router.push({ pathname: "/profile", query: { ...router.query, tab: "projects" }});
                                setState({ usernameError: "" });
                            } catch (e) {
                                console.log(e);
                                const message = e.response.data.code === "invalid_input_username" ?
                                e.response.data.message :
                                "Something went wrong. Please try again later.";

                                setState({ usernameError: message });
                            }}} className="btn-primary save-changes-btn">save changes</Button>
                    </div>
                )} />
                <style>{`
                    .save-changes-btn {
                        margin-top: 20px;
                    }
                `}</style>
            </div>
        );
    }

    render() {
        const { user, projects, router, token, authUser, status } = this.props;
        if (status) {
            return <Error statusCode={status} />;
        }
        return (
            <Page header={<Header user={authUser}/>}>
                <div className="profile">
                    <img className="profile-avatar" src={`${process.env.AVATAR_URL}?id=${user.email_sha256}&size=100`}/>
                    <div className="profile-info">
                        <p className="text">{user.username}</p>
                        {authUser && <p className="desc profile-email">{authUser.email} (Private)</p>}
                        {authUser && <Button onClick={() => {
                            destroyCookie({}, process.env.TOKEN_COOKIE_NAME);
                            router.push("/");
                        }} className="small-btn-primary log-out-btn">log out</Button>}
                    </div>
                    <style jsx>{`
                        .profile {
                            margin-bottom: 30px;
                            height: 100px;
                        }

                        .profile-avatar {
                            height: 100px;
                            display: inline-block;
                            border-radius: 50%;
                            margin-right: 20px;
                        }

                        .profile-info {
                            padding-top: 23px;
                            display: inline-block;
                            vertical-align: top;
                        }

                        .profile-email {
                            margin-bottom: 5px;
                        }
                    `}</style>
                </div>
                <Nav
                    options={authUser ? ["projects", "settings"] : ["projects"]}
                    render={(option) => {
                        if (option === "projects") {
                            return this.renderProjects();
                        } else if (option === "settings") {
                            return this.renderSettings();
                        }
                    }}
                />
            </Page>
        );
    }
}

export default withRouter(Profile);
