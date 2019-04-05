import classNames from "classnames";
import "../styles/status-bar.css";

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
        </div>
    );
}
