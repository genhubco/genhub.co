import classnames from "classnames";

export default class WithState extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = true;
        this.state = props.initialState;
        this.data = props.initialData;
        this.safeSetState = this.safeSetState.bind(this);
        this.setData = this.setData.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setData(data) {
        const currentData = this.data;
        this.data = { ...currentData, ...data };
    }

    getData() {
        return this.data;
    }

    safeSetState(newState) {
        if (!this._isMounted) {
            return;
        }
        this.setState(newState);
    }

    render() {
        const { className } = this.props;
        return (
            <div className={classnames("shared-state", className)}>
                {this.props.render({ state: this.state, setState: this.safeSetState, setData: this.setData, getData: this.getData })}
            </div>
        );
    }
}
