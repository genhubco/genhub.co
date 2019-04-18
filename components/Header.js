import Link from 'next/link';
import { withRouter } from 'next/router';

export default withRouter(({router}) => (
    <div className="header">
        <Link href="/">
            <a className="logo"><img src="/static/applogo.svg"/></a>
        </Link>
        {router.route !== "/demo" && <Link href="/demo">
            <a className="link btn-link">
                Demo
            </a>
        </Link>}
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
