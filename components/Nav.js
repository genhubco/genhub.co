import { withRouter } from 'next/router';
import classnames from "classnames";
import Link from 'next/link';

export default withRouter(({ options, className, router, children }) => (
    <div className="nav">
        <div className={classnames("nav-options", className)}>
            {options.map(({ display, href }, i) => (
                <Link key={`option-${i}`} href={href} >
                    <a className={classnames("nav-option", {
                        "selected": router.route == href.pathname
                    })}>
                        <span className="nav-option-span">{display}</span>
                        {router.route == href.pathname ? <div className="nav-option-indicator" /> : null}
                    </a>
                </Link>
            ))}
        </div>
        <div className="nav-content">
            {children}
        </div>
        <style jsx>{`
            .nav {
                font-family: "PT Sans", sans-serif;
            }

            .nav-options {
                border-bottom: 1px solid #f2f3f4;
            }

            .nav-content {
                padding: 30px 0;
            }

            .nav-option {
                color: black;
                text-decoration: none;
                margin-right: 15px;
                cursor: pointer;
                display: inline-block;
                vertical-align: top;
            }

            .nav-option:hover {
                color: #007fff;
            }

            .selected {
                color: #007fff;
            }

            .nav-option-indicator {
                height: 6px;
                width: 6px;
                margin: 0 auto 3px;
                background: #007fff;
                border-radius: 50%;
            }
        `}</style>
    </div>
));
