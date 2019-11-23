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

class ProfileSettings extends React.Component {
    static async getInitialProps(ctx) {
        const { id } = ctx.query;

        const cookies = parseCookies(ctx);
        const token = cookies[process.env.TOKEN_COOKIE_NAME];
        const authUser = decode(token);

        try {
            const userRes = await get(process.env.PROFILE_URL + `.get?id=${id}`);
            const user = userRes.data;
            return { user, token, authUser };
        } catch(e) {
            console.log(e);
            const status = e.response ? e.response.status : 500;
            return { status };
        }
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
                            prefix="genhub.co/"
                        />
                        <Button onClick={async () => {
                            try {
                                const newInputs = getData();
                                const response = await post(process.env.PROFILE_URL + ".update", newInputs, {
                                    headers: { "Authorization": "Bearer " + token }
                                });
                                setCookie({}, process.env.TOKEN_COOKIE_NAME, response.data.token);
                                router.push({ pathname: "/profile-projects", query: { id: authUser.id }});
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
                        {(authUser && authUser.id === user.id) && <p className="desc profile-email">{authUser.email} (Private)</p>}
                        {(authUser && authUser.id === user.id) && <Button onClick={() => {
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
                    options={
                        (authUser && authUser.id === user.id) ?
                        [
                            { display: "projects", href: { pathname: "/profile-projects", query: { id: user.id }}},
                            { display: "settings", href: { pathname: "/profile-settings", query: { id: user.id } }}
                        ] :
                        [{ display: "projects", href: { pathname: "/profile-projects", query: { id: user.id }}}]
                    }
                >
                    {this.renderSettings()}
                </Nav>
            </Page>
        );
    }
}

export default withRouter(ProfileSettings);
