import classnames from "classnames";
import Button from "./Button";

async function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () { resolve(reader.result); };
        reader.onerror = function (error) { reject(error); };
    });
}

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            url: props.initialValue,
            error: "",
            loading: false
        };

        this.uploadImage = this.uploadImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    async uploadImage(e) {
        this.setState({ loading: true });
        const { onAdd } = this.props;
        const file = e.target.files[0];
        if (this._isMounted) {
            const base64 = await getBase64(file);
            const newState = await onAdd(base64);
            this.setState({ ...newState, loading: false });
        }
    }

    async removeImage() {
        const newState = await this.props.onRemove();
        this.setState(newState);
    }

    render() {
        const { className } = this.props;
        const { url, loading, error } = this.state;
        return (
            <div className={classnames("image-upload", className)}>
                <div className="image-upload-image-container">
                    {
                        url ?
                        <img className="image-upload-image" src={url} /> :
                        <img className="image-upload-placeholder" src="/static/image-placeholder.svg" />
                    }
                </div>
                {
                    url ?
                    <Button onClick={this.removeImage} className="small-btn-primary">remove image -</Button> :
                    <label className={classnames("small-btn-primary", {
                        "image-upload-btn-disabled": loading
                    })}>
                        <input className="image-upload-input" type="file" onChange={this.uploadImage} />
                        {loading ? "..." : "add image +"}
                    </label>
                }
                <span className="error">{error}</span>
                <style jsx>{`
                    .image-upload-image-container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid #dddfe2;
                        border-radius: 5px;
                        margin-bottom: 3px;
                        height: 370px;
                        width 370px;
                        box-sizing: border-box;
                    }

                    .image-upload-image {
                        max-width:100%;
                        max-height:100%;
                        height: auto;
                    }

                    .image-upload-placeholder {
                        height: 30px;
                        width 30px;
                    }

                    .image-upload-input {
                        display: none;
                    }

                    .image-upload-btn-disabled {
                        cursor: auto;
                        background-color: #f2f3f4;
                    }
                `}</style>
            </div>
        );
    }
}
