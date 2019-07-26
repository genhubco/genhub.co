import classnames from "classnames";
import Button from "./Button";

export default class Textarea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.initialValue,
            lastSavedValue: props.initialValue,
            readMode: true,
            error: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(e) {
        const value = e.target.value;
        this.setState({ value });
    }

    onCancel() {
        this.setState({ value: this.state.lastSavedValue, readMode: true, error: "" });
    }

    async onSave() {
        const value = this.state.value;
        const newState = await this.props.onSave(value);
        this.setState(newState);
    }

    render() {
        const { className, editable } = this.props;
        const { value, lastSavedValue, readMode, error } = this.state;
        return (
            <div className={classnames("textarea-container", className)}>
                <textarea
                    placeholder={this.props.placeholder}
                    className={classnames("textarea", {
                        "textarea-preview": readMode
                    })}
                    value={value}
                    onChange={this.onChange}
                    readOnly={readMode && this.props.editable}
                />
                <div className="textarea-controls">
                {error && <p className="textarea-error error">{error}</p>}
                {
                    this.state.readMode && this.props.editable ?
                    <Button onClick={() => this.setState({ readMode: false })} className="small-btn-primary">edit ≠</Button> :
                    [
                        <Button key="item-1" onClick={this.onCancel} className="small-btn-primary">cancel</Button>,
                        <Button key="item-2" onClick={this.onSave} className="small-btn-primary">save changes</Button>
                    ]
                }
                </div>
                <style jsx>{`
                    .textarea {
                        border: 1px solid #dddfe2;
                        border-radius: 5px;
                        box-sizing: border-box;
                        width: 370px;
                        height: 370px;
                        resize: vertical;
                        padding: 10px;
                        font-size: 14px;
                    }

                    .textarea-preview {
                        resize: none;
                    }

                    .textarea::placeholder {
                        color: #a7afb5;
                    }

                    .textarea-controls {
                        display: flex;
                        justify-content: flex-end;
                    }

                    .textarea-error {
                        margin-right: 10px;
                    }
                `}</style>
            </div>
        );
    }
}
