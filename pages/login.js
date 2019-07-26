import Link from "next/link";
import { post } from "axios";
import { withRouter } from "next/router";
import { setCookie } from "nookies";

import Page from "../components/Page";
import Footer from "../components/Footer";

function getEnv() {
    const branches = {
        "master": "prod",
        "staging": "stag"
    };
    const currentEnv = branches[process.env["NOW_GITHUB_COMMIT_REF"]];
    const env = currentEnv || "dev";
    return env;
}

class Login extends React.Component {
    static async getInitialProps(ctx) {
        try {
            const { res, router } = ctx;
            if (!ctx.query) {
                return {};
            }
            const { provider, code } = ctx.query;
            if (!provider || !code) {
                return {};
            }
            const env = getEnv();
            const response = await post(process.env.LOGIN_URL, { provider, code, env });
            setCookie(ctx, process.env.TOKEN_COOKIE_NAME, response.data.token);
            if (res) {
                res.writeHead(302, { Location: "/" });
                res.end();
                return {};
            }

            router.push("/");
            return { error: "" };
        } catch (e) {
            console.log(e);
            return { error: "Failed to authenticate. Please try another method." };
        }
    }

    render () {
        const env = getEnv();
        const redirect_uri_google = "https://mocks.genhub.now.sh/callback/" + env + "?provider=google";
        const redirect_uri_github = "https://mocks.genhub.now.sh/callback/" + env + "?provider=github";
        const googleURL = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + process.env.GOOGLE_CLIENT_ID + "&" +
                          "redirect_uri=" + redirect_uri_google + "&" +
                          "response_type=code&" +
                          "scope=email profile";
        const githubURL = "https://github.com/login/oauth/authorize?client_id=" + process.env.GITHUB_CLIENT_ID + "&" +
                          "scope=user user:email" + "&" +
                          "redirect_uri=" + redirect_uri_github;
        return (
            <Page content="center" header={null} footer={null}>
                <div className="login-wrapper">
                    <div className="login-content">
                        <Link href="/">
                            <a className="logo"><img src="/static/applogo.svg"/></a>
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
                        <p className="error">{this.props.error}</p>
                    </div>
                    <Footer />
                </div>
                <style jsx global>{`
                    .logo img {
                        height: 40px;
                        margin-bottom: 30px;
                    }

                    .login-content {
                        width: 400px;
                        border-radius: 5px;
                        border: 1px solid rgba(200,200,200,0.30);
                        text-align: center;
                        padding: 15px 0;
                    }

                    .login-content-buttons {
                        margin-top: 10px;
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
