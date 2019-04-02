import Link from 'next/link';
import { withRouter } from 'next/router';
import "../styles/header.css";

export default withRouter(({router}) => (
    <div className="header">
        <Link href="/">
            <a className="logo"><img src="/static/applogo.svg"/></a>
        </Link>
        {router.route !== "/demo" && <Link href="/demo">
            <a className="link">
                Demo
            </a>
        </Link>}
    </div>
));
