import React from "react";
import Link from "next/link";
import classnames from "classnames";
import { decode } from "jsonwebtoken";
import { withRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";

// class Header extends React.Component {
//     static async getInitialProps(ctx) {
//         const cookies = parseCookies(ctx);
//         const token = cookies[process.env.TOKEN_COOKIE_NAME];
//         const loggedIn = token != null;
//         const decoded = decode(token);
//         return {
//             user: decoded,
//             loggedIn,
//         };
//     }
// }

// {
//     this.props.loggedIn ?
//     <Link href={`/profile?id=${this.props.user.id}`}>
//         <a>
//             <img className="header-avatar" src={`https://api.adorable.io/avatars/285/${this.props.user.id}`} />
//         </a>
//     </Link> :
//     <Link href="/login">
//         <a className={classnames("internal-link btn-link", {
//             "internal-link-active": router.route === "/login"
//         })}>
//             login
//         </a>
//     </Link>
// }

export default withRouter(({router}) => (
    <div className="header">
        <Link href="/">
            <a className="logo"><img src="/static/applogo.svg"/></a>
        </Link>
        <div>
            <Link href="/docs?project=api&doc=search">
                <a className={classnames("internal-link btn-link", {
                    "internal-link-active": router.route === "/docs"
                })}>
                    docs
                </a>
            </Link>
            <Link href="/demo">
                <a className={classnames("internal-link btn-link", {
                    "internal-link-active": router.route === "/demo"
                })}>
                    demo
                </a>
            </Link>
        </div>
        <style jsx global>{`
            .header {
                width: 100%;
                display: flex;
                justify-content: space-between;
            }

            .logo img {
                height: 30px;
                margin-left: 10px;
                margin-top: 5px;
            }
        `}</style>
    </div>
));
