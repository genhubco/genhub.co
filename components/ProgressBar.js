import { map } from "./Animation";

export default ({ progress, width }) => (
    <div className="progress-bar-container">
        <div className="progress-bar"/>
        <style jsx>{`
            .progress-bar-container {
                display: inline-block;
                height: 7px;
                width: ${width}px;
                border: 1px solid #007fff;
                border-radius: 7px;
            }

            .progress-bar {
                border-radius: 7px;
                height: 7px;
                background: #007fff;
                width: ${map(progress, 0, 1, 0, width)}px;
            }
        `}</style>
    </div>
);
