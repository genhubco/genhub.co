import { decode } from "jsonwebtoken";
import { withRouter, useRouter } from "next/router";
import { post } from "axios";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import Page from "../components/Page";
import Header from "../components/Header";
import Link from "next/link";
import sharedState from "../components/SharedState";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import FormRadioGroup from "../components/FormRadioGroup";

class NewProject extends React.Component {
    static async getInitialProps(ctx) {
        const cookies = parseCookies(ctx);
        const token = cookies[process.env.TOKEN_COOKIE_NAME];
        const authUser = decode(token);

        if (!authUser && ctx.res) {
            const res = ctx.res;
            res.writeHead(302, { Location: '/login' });
            res.end();
        } else if (!authUser && !ctx.res) {
            const router = useRouter();
            router.push("/login");
        }

        return { authUser, token };
    }

    getNewProjectResponseMessage(res) {
        if (!res) {
            return "Something went wrong. Please try again later.";
        }

        if (typeof res.data.error === "string") {
            return res.data.error;
        }

        if (typeof res.data.error === "object" && res.data.code === "invalid_input") {
            return "Username must be url-friendly. Allowed characters: `A-Za-z0-9_-`.";
        }

        return "Something went wrong. Please try again later.";
    }

    renderForm() {
        const { router, authUser } = this.props;
        const NewProjectForm = sharedState(({ setData, state }) => (
            <div>
                <FormInput
                    className="create-project-input"
                    onChange={(value) => setData("title", value)}
                    error={state.titleError}
                    initialValue=""
                    desc="Set title for your new project:"
                    prefix="genhub.co/projects/"
                />
                <FormRadioGroup
                    initialValue="public"
                    name="visibility"
                    options={[{
                        value: "private",
                        display: "Private (Coming soon)",
                        disabled: true
                    }, {
                        value: "public",
                        display: "Public",
                        disabled: false
                    }]}
                />
            </div>
        ), ({ setState, getData }) => (
            <Button onClick={async () => {
                try {
                    const defaultConfig = "# Algorithms available: \"cnn\", \"cfd\", \"all\"\n" +
                                        "algo = \"all\"\n" +
                                        "# Name of the gene you are targeting\n" +
                                        "gene = \"EMX1\"\n" +
                                        "# PAM sequence\n" +
                                        "pam = \"CGG\"\n" +
                                        "# Your guide RNA\n" +
                                        "grna = \"GAGCGTCGTCG\"";
                    const newInputs = { ...getData(), id: null, config: defaultConfig };
                    const { data } = await post(process.env.PROJECTS_URL + ".set", newInputs, {
                        headers: { Authorization: `Bearer ${this.props.token}` }
                    });
                    router.push({ pathname: "/project", query: { id: data.id, user: authUser.id, tab: "config" } });
                    setState({ titleError: "" });
                } catch (e) {
                    console.log(e);
                    const message = this.getNewProjectResponseMessage(e.response);
                    setState({ titleError: message });
                }
            }} className="btn-primary create-project-btn">create project</Button>
        ));
        return (
            <div>
                <NewProjectForm initialState={{ titleError: "" }} />
                <style>{`
                    .create-project-btn {
                        margin: 20px 0;
                    }

                    .create-project-input {
                        margin-bottom: 10px;
                    }
                `}</style>
            </div>
        );
    }

    render() {
        const { authUser } = this.props;
        return (
            <Page header={<Header user={authUser}/>}>
                <div className="new-project-header">
                    <h3 className="title">New Project</h3>
                    <div className="new-project-header-user">
                        <Link href={`/profile?id=${authUser.id}`}>
                            <a className="internal-link">{authUser.username} <img className="new-project-header-user-image" src={`${process.env.AVATAR_URL}?id=${authUser.email_sha256}&size=20`} /></a>
                        </Link>
                    </div>
                </div>
                <div className="new-project-content">
                    {this.renderForm()}
                </div>
                <style jsx>{`
                    .new-project-header-user-image {
                        vertical-align: bottom;
                        border-radius: 50%;
                    }

                    .new-project-header {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #f2f3f4;
                        margin-bottom: 10px;
                    }
                `}</style>
            </Page>
        );
    }
}

export default withRouter(NewProject);
