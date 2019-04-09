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
        <style jsx global>{`
            .card {
                margin: 0 auto 25px;
                padding-top: 30px;
                padding-bottom: 30px;
                width: 500px;
                border-radius: 5px;
                border: 1px solid rgba(200,200,200,0.30);
            }

            .card-title {
                margin-left: 30px;
                margin-right: 30px;
                font-family: "PT Sans", sans-serif;
            }

            .card-image img {
                max-width: 100%;
            }

            .card-desc {
                margin-left: 30px;
                margin-right: 30px;
                font-family: "PT Sans", sans-serif;
            }

            .card-link {
                margin-left: 30px;
                margin-right: 30px;
                text-align: right;
            }

            .card-link a {
                color: #007fff;
                font-family: "PT Sans", sans-serif;
                text-decoration: none;
            }

        `}</style>
    </div>
);
