import React from "react";
import Link from "next/link";
import classnames from "classnames";
import { get } from "axios";
import { withRouter } from "next/router";

export default withRouter(({ router, user }) => {
    return (
        <div className="header">
            <Link href="/">
                <a className="header-logo"><img src="/static/applogo.svg"/></a>
            </Link>
            <div className="header-links">
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
                {
                    user ?
                    <Link href={`/profile?id=${user.id}`}>
                        <a className="header-avatar-link">
                            <img src={`${process.env.AVATAR_URL}?id=${user.id}&size=20`} />
                        </a>
                    </Link> :
                    <Link href="/login">
                        <a className={classnames("internal-link btn-link", {
                            "internal-link-active": router.route === "/login"
                        })}>
                            login
                        </a>
                    </Link>
                }
            </div>
            <style jsx global>{`
                .header {
                    margin-top: 10px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }

                .header-logo {
                    height: 30px;
                    margin-left: 25px;
                }

                .header-logo img {
                    height: 30px;
                }

                .header-avatar-link {
                    display: inline-block;
                    height: 20px;
                    vertical-align: bottom;
                }

                .header-avatar-link img {
                    border-radius: 50%;
                }

                .header-links {
                    padding-top: 5px;
                    margin-right: 25px;
                }
            `}</style>
        </div>
    );
});
