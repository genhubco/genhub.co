import classnames from "classnames";

export default class RadioGroup extends React.Component {
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
        const { name, className, options } = this.props;
        return (
            <div className={classnames("radio-group", className)}>
                {options.map((item, i) => (
                    <div key={`option-${i}`} className="radio-button">
                        <input
                            className="radio-input"
                            type="radio"
                            name={name}
                            value={item.value}
                            checked={this.state.value == item.value}
                            onChange={this.onChange}
                            disabled={item.disabled}
                        />
                        <span className="text">{item.display}</span>
                    </div>
                ))}
                <style jsx>{`
                    .radio-input {
                        margin-right: 10px;
                    }
                `}</style>
            </div>
        );
    }
}
