import classnames from "classnames";

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = { loading: false };
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async onClick(e) {
        this.setState({ loading: true });
        await this.props.onClick(e);
        if (this._isMounted) {
            this.setState({ loading: false });
        }
    }

    render() {
        const { className, children } = this.props;
        const { loading } = this.state;
        return (
            <button onClick={this.onClick} disabled={loading} className={classnames("btn", className, {
                "btn-disabled": loading
            })}>
                {loading ? "..." : children }
                <style>{`
                    .btn-disabled {
                        cursor: default;
                        background-color: #f2f3f4;
                    }
                `}</style>
            </button>
        );
    }
}
