import classNames from "classnames";

export default (props) => {
    const statuses = {
        loading: "loading-icon.svg",
        success: "check-icon.svg",
        error: "x-icon.svg"
    };

    return (
        <div className="status-bar">
            <img className="status-bar-img" src={`/static/icons/${statuses[props.status]}`} />
            <p className={classNames("status-bar-text", {
                "status-bar-loading": props.status === "loading",
                "status-bar-error": props.status === "error",
                "status-bar-success": props.status === "success"
            })}>{props.message}</p>
            <style jsx global>{`
                .status-bar {
                    margin-bottom: 10px;
                }

                .status-bar-img {
                    height: 12px;
                    display: inline-block;
                    margin-right: 4px;
                }

                .status-bar-text {
                    font-family: "PT Sans", sans-serif;
                    vertical-align: bottom;
                    font-size: 14px;
                    display: inline;
                }

                .status-bar-loading {
                    color: #F1A54D;
                }

                .status-bar-success {
                    color: #7FE49B;
                }

                .status-bar-error {
                    color: #EE6868;
                }
            `}</style>
        </div>
    );
}
