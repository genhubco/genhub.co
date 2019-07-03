import React from "react";
import Link from "next/link";
import { post } from "axios";
import { withRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import Page from "../components/Page";
import Footer from "../components/Footer";

class Login extends React.Component {
    static async getInitialProps(ctx) {
        try {
            const { res } = ctx;
            if (!ctx.query) {
                return {};
            }
            const { provider, code } = ctx.query;
            if (!provider || !code) {
                return {};
            }
            const response = await post(process.env.AUTH_URL, { provider, code });
            setCookie(ctx, process.env.TOKEN_COOKIE_NAME, response.data.token);
            if (res) {
                res.writeHead(302, { Location: "/" });
                res.end();
                return {};
            }

            Router.push("/");
            return {};
        } catch (e) {
            return { error: "Failed to authenticate. Please try another method." };
        }
    }

    render () {
        const googleURL = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + process.env.GOOGLE_CLIENT_ID + "&" +
                          "redirect_uri=" + process.env.GOOGLE_REDIRECT_URI + "&" +
                          "response_type=code&" +
                          "scope=email profile";
        const githubURL = "https://github.com/login/oauth/authorize?client_id=" + process.env.GITHUB_CLIENT_ID + "&" +
                          "scope=user user:email";
        return (
            <Page content="center" header={null} footer={null}>
                <div className="login-wrapper">
                    <div className="login-content">
                        <Link href="/">
                            <a className="logo"><img src="/static/applogo.svg"/></a>
                        </Link>
                        <p className="small-title">Log in via:</p>
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
                        <p className="error-text">{this.props.error}</p>
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
                        display: flex;
                        justify-content: center;
                    }

                    .google-login-button {
                        margin-right: 15px;
                    }

                    .github-login-button, .google-login-button {
                        outline: none;
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

                    .error-text {
                        color: #EE6868;
                        font-family: "PT Sans", sans-serif;
                        font-size: 12px;
                    }
                `}</style>
            </Page>
        );
    }
}

export default withRouter(Login);
