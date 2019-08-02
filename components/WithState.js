import classnames from "classnames";

export default class WithState extends React.Component {
    constructor(props) {
        super(props);
        this.mounted = true;
        this.state = props.initialState;
        this.data = props.initialData;
        this.safeSetState = this.safeSetState.bind(this);
        this.setData = this.setData.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    setData(data) {
        const currentData = this.data;
        this.data = { ...currentData, ...data };
    }

    getData() {
        return this.data;
    }

    safeSetState(newState) {
        if (!this.mounted) {
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
