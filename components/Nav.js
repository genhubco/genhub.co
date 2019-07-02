import classnames from "classnames";

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.options[0]
        };
        this.onOptionSelected = this.onOptionSelected.bind(this);
    }

    onOptionSelected(newOption) {
        this.setState({ selected: newOption });
    }

    render() {
        const { options, render } = this.props;
        const { selected } = this.state;
        return (
            <div className="nav">
                <div className="nav-options">
                    {options.map((option, i) => (
                        <div
                            key={`option-${i}`}
                            className={classnames("nav-option", {
                                "selected": selected == option
                            })}
                            onClick={() => this.onOptionSelected(option)}>
                            <span>{option}</span>
                            {selected == option ? <div className="nav-option-indicator" /> : null}
                        </div>
                    ))}
                </div>
                <div className="nav-content">
                    {this.props.render(this.state.selected)}
                </div>
                <style jsx>{`
                    .nav {
                        font-family: "PT Sans", sans-serif;
                        margin-bottom: 15px;
                    }

                    .nav-option {
                        margin-right: 15px;
                        cursor: pointer;
                        color: #7d8791;
                        display: inline-block;
                        vertical-align: top;
                    }

                    .nav-option:hover {
                        color: black;
                    }

                    .selected {
                        color: #007fff;
                    }

                    .nav-option-indicator {
                        height: 6px;
                        width: 6px;
                        margin: auto;
                        background: #007fff;
                        border-radius: 50%;
                    }
                `}</style>
            </div>
        )
    }
}
