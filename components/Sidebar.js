import { withRouter } from 'next/router';
import Link from 'next/link';
import classnames from "classnames";

export default withRouter(({children, router, options, param}) => (
    <div>
        <div className="side-bar">
            {options.map((item, i) => (
                <Link key={`key-${i}`} href={`${router.route}?${param}=${item.name}`}>
                    <a className={classnames("option internal-link", {
                        "internal-link-active": router.query[param] === item.name
                    })}>{item.display}</a>
                </Link>
            ))}
        </div>
        <div className="side-bar-content">
            {children}
        </div>
        <style jsx global>{`
            .side-bar-content {
                margin-left: 150px;
                padding-left: 20px;
                vertical-align: top;
                border-left: 1px solid #f2f3f4;
            }

            .side-bar {
                position:fixed;
                display: inline-block;
                width: 150px;
            }

            .option {
                margin-top: 10px;
                display: block;
            }
        `}</style>
    </div>
));
