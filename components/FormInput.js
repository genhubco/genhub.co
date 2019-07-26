import classnames from "classnames";

export default class FormInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: props.initialValue || "" };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const value = e.target.value;
        this.setState({ value });
        this.props.onChange(value);
    }

    render() {
        const { desc, prefix, error, className } = this.props;
        const { value } = this.state;
        return (
            <div className={classnames("input-container", className)}>
                <span className="desc">{desc}</span>
                <div className="input-group">
                    <span className="desc">{prefix}</span>
                    <input value={value} onChange={this.onChange} className="input" />
                </div>
                <p className="error">{error}</p>
                <style jsx>{`
                    .input-container {
                        width: 350px;
                    }

                    .input {
                        margin-left: 2px;
                        outline: none;
                        border: none;
                        padding: 0;
                        flex: 2;
                        height: 20px;
                        margin-bottom: 2px;
                        font-size: 14px;
                    }

                    .input-group {
                        display: flex;
                        box-sizing: border-box;
                        align-items: center;
                        border: 1px solid #dddfe2;
                        border-radius: 5px;
                        background: white;
                        height: 30px;
                        padding: 0 5px;
                    }
                `}</style>
            </div>
        )
    }
}
