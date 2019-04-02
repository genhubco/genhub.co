import classNames from "classnames";
import "../styles/status-bar.css";

export default (props) => {
    const statuses = {
        loading: {
            img: "loading-icon.svg",
            text: "Compiling..."
        },
        success: {
            img: "check-icon.svg",
            text: "Compiled"
        },
        error: {
            img: "x-icon.svg",
            text: "Invalid input"
        }
    };

    return (
        <div className="status-bar">
            <img className="status-bar-img" src={`/static/icons/${statuses[props.status].img}`} />
            <p className={classNames("status-bar-text", {
                "status-bar-loading": props.status === "loading",
                "status-bar-error": props.status === "error",
                "status-bar-success": props.status === "success"
            })}>{statuses[props.status].text}</p>
        </div>
    );
}
