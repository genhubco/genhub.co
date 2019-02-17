export default (props) => (
    <div class="card">
        <div class="card-image">
            <img src={`/static/${props.img}`} />
        </div>
        <h2 class="card-title">
            {props.title}
        </h2>
        <div class="card-desc">
            {props.desc}
        </div>
        <div class="card-link">
            <a target="_blank" href={props.link}>See full article</a>
        </div>
    </div>
);
