import "../styles/card.css";

export default (props) => (
    <div className="card">
        <div className="card-image">
            <img src={`/static/${props.img}`} />
        </div>
        <h2 className="card-title">
            {props.title}
        </h2>
        <div className="card-desc">
            {props.desc}
        </div>
        <div className="card-link">
            <a target="_blank" href={props.link}>See full article</a>
        </div>
    </div>
);
