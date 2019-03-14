import Link from 'next/link';
import { withRouter } from 'next/router'

export default withRouter(({router}) => (
    <div className="header">
        <Link href="/">
            <a className="logo"><img src="/static/applogo.svg"/></a>
        </Link>
        {router.route !== "/demo" && <Link href="/demo">
            <button className="btn-primary">
                Demo
            </button>
        </Link>}
    </div>
));
