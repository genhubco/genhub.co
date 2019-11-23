import { decode } from "jsonwebtoken";
import Router, { withRouter } from "next/router";
import { post } from "axios";
import toml from "toml";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import Page from "../components/Page";
import Header from "../components/Header";
import Link from "next/link";
import WithState from "../components/WithState";
import Input from "../components/Input";
import Button from "../components/Button";
import RadioGroup from "../components/RadioGroup";

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
            Router.push("/login");
        }

        return { authUser, token };
    }

    renderForm() {
        const { router, authUser } = this.props;
        return (
            <div>
                <WithState initialState={{ titleError: "" }} initialData={{ title: "" }} render={({ state, setState, setData, getData }) => (
                    <div className="new-project">
                        <Input
                            className="create-project-input"
                            onChange={(value) => setData({ title: value })}
                            error={state.titleError}
                            initialValue=""
                            desc="Set title for your new project:"
                            prefix={`genhub.co/${authUser.username}/`}
                        />
                        <RadioGroup
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
                                const parsedToml = toml.parse(defaultConfig);
                                parsedToml.numItems = 10;
                                const res = await post(process.env.SEARCH_URL, JSON.stringify(parsedToml));
                                const newInputs = { ...getData(), config: defaultConfig, predictions: JSON.stringify(res.data) };
                                const { data } = await post(process.env.PROJECTS_URL + ".create", newInputs, {
                                    headers: { Authorization: `Bearer ${this.props.token}` }
                                });
                                router.push({ pathname: "/project-config", query: { id: data.id, user: authUser.id } });
                                setState({ titleError: "" });
                            } catch (e) {
                                console.log(e);
                                const message = e.response.data.code === "invalid_input_title" ?
                                e.response.data.message :
                                "Something went wrong. Please try again later.";

                                setState({ titleError: message });
                            }
                        }} className="btn-primary create-project-btn">create project</Button>
                    </div>
                )} />
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
                        <Link href={`/profile-projects?id=${authUser.id}`}>
                            <a className="internal-link">{authUser.username} <img className="new-project-header-user-image" src={`${process.env.AVATAR_URL}?id=${authUser.email_sha256}&size=17`} /></a>
                        </Link>
                    </div>
                </div>
                <div className="new-project-content">
                    {this.renderForm()}
                </div>
                <style jsx>{`
                    .new-project-header-user-image {
                        vertical-align: text-bottom;
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
