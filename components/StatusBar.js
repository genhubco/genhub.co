import classNames from "classnames";

export default (props) => {
    const statuses = {
        loading: "loading-icon.svg",
        success: "check-icon.svg",
        error: "x-icon.svg"
    };

    return (
        <div className="status-bar">
            <p className={classNames("status-bar-text text", {
                "status-bar-loading": props.status === "loading",
                "status-bar-error": props.status === "error",
                "status-bar-success": props.status === "success"
            })}>{props.message}</p>
            <p className="desc">Available genes can be found <a target="_blank" href="https://data.genhub.co/datasets/genes/" className="link">here</a>.</p>
            <style jsx global>{`
                .status-bar {
                    display: flex;
                    justify-content: space-between;
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
