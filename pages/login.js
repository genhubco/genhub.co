import Link from "next/link";
import { post } from "axios";
import { withRouter } from "next/router";
import { setCookie } from "nookies";
import { decode } from "jsonwebtoken";

import Page from "../components/Page";

class Login extends React.Component {
    static async getInitialProps({ query }) {
        return query;
    }

    constructor(props) {
        super(props);
        this.state = { redirect_uri_base: null, error: "" };
    }

    async componentDidMount() {
        const { provider, code, router } = this.props;
        const location = window.location.origin + window.location.pathname + "?provider=";
        const redirect_uri_base = process.env.PROXY_REDIRECT_URL + "?to=" + location;

        if (provider && code) {
            try {
                const redirect_uri = redirect_uri_base + provider;
                const { data } = await post(process.env.LOGIN_URL, { provider, code, redirect_uri });
                const authUser = decode(data.token);
                setCookie({}, process.env.TOKEN_COOKIE_NAME, data.token);
                router.push(`/profile?id=${authUser.id}&tab=projects`);
            } catch (e) {
                this.setState({ redirect_uri_base, error: "Authentication failed. Please try another method." });
            }
        } else {
            this.setState({ redirect_uri_base, error: "" });
        }
    }

    render () {
        const { redirect_uri_base } = this.state;
        const googleURL = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + process.env.GOOGLE_CLIENT_ID + "&" +
                          "redirect_uri=" + redirect_uri_base + "google&" +
                          "response_type=code&" +
                          "scope=email profile";
        const githubURL = "https://github.com/login/oauth/authorize?client_id=" + process.env.GITHUB_CLIENT_ID + "&" +
                          "scope=user user:email" + "&" +
                          "redirect_uri=" + redirect_uri_base + "github";
        return (
            <Page contentClassName="content-small-center" header={null}>
                {
                    redirect_uri_base ? (
                        <div className="login-wrapper">
                            <div className="login-content">
                                <Link href="/">
                                    <a className="login-logo"><img src="/static/applogo.svg"/></a>
                                </Link>
                                <p className="text">Log in via:</p>
                                <div className="login-content-buttons">
                                    <a
                                        className="google-login-button"
                                        href={googleURL}>
                                        <div className="google-login-button-logo"><img src="/static/google-logo.svg" /></div>
                                    </a>
                                    <a
                                        className="github-login-button"
                                        href={githubURL}>
                                        <div className="github-login-button-logo"><img src="/static/github-logo.svg" /></div>
                                    </a>
                                </div>
                                <p className="error">{this.state.error}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="login-placeholder">
                            <p className="text">Processing request. Please wait...</p>
                        </div>
                    )
                }

                <style jsx global>{`
                    .login-logo {
                        display: inline-block;
                        height: 30px;
                        margin-bottom: 30px;
                    }

                    .login-logo img {
                        height: 30px;
                    }

                    .login-placeholder {
                        text-align: center;
                    }

                    .login-content {
                        width: 400px;
                        border-radius: 5px;
                        border: 1px solid rgba(200,200,200,0.30);
                        text-align: center;
                        padding: 15px 0;
                        margin: 0 auto 30px auto;
                    }

                    .login-content-buttons {
                        margin: 10px 0;
                        display: flex;
                        justify-content: center;
                    }

                    .google-login-button {
                        margin-right: 15px;
                    }

                    .github-login-button, .google-login-button {
                        font-size: 14px;
                        width: 160px;
                        border: 1px solid #dddfe2;
                        border-radius: 5px;
                        font-family: "PT Sans", sans-serif;
                    }

                    .github-login-button:hover, .google-login-button:hover {
                        background-color: #f2f3f4;
                        color: white;
                        cursor: pointer;
                    }

                    .github-login-button, .google-login-button-logo {
                        padding-top: 5px;
                    }

                    .github-login-button img, .google-login-button-logo img {
                        height: 20px;
                    }
                `}</style>
            </Page>
        );
    }
}

export default withRouter(Login);
