import { withRouter } from 'next/router';
import Link from 'next/link';
import classnames from "classnames";

export default withRouter(({children, router, options, params}) => (
    <div>
        <div className="side-bar">
            {options.map((item, i) => (
                item.section ?
                <Link key={`option-${i}`} href={`${router.route}?${params.section}=${item.section}&${params.item}=${item.name}`}>
                    <a className={classnames("option internal-link", {
                        "internal-link-active": router.query[params.item] === item.name
                    })}>{item.display}</a>
                </Link> :
                <p key={`section-${i}`} className="section">{item.display}</p>
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

            .section {
                font-family: "PT Sans", sans-serif;
                color: #a7afb5;
                display: block;
            }
        `}</style>
    </div>
));
