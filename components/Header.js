import Link from 'next/link';
import classnames from "classnames";
import { withRouter } from 'next/router';

export default withRouter(({router}) => (
    <div className="header">
        <Link href="/">
            <a className="logo"><img src="/static/applogo.svg"/></a>
        </Link>
        <div>
            <Link href="/docs?doc=api">
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
            }
        `}</style>
    </div>
));
