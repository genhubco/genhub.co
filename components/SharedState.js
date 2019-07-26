import classnames from "classnames";

export default function (renderComponent1, renderComponent2) {
    const SharedState = class SharedState extends React.Component {
        constructor(props) {
            super(props);
            this._isMounted = true;
            this.state = props.initialState;
            this.safeSetState = this.safeSetState.bind(this);
            this.setData = this.setData.bind(this);
            this.getData = this.getData.bind(this);

            this.data = {};
        }

        componentDidMount() {
            this._isMounted = true;
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        setData(key, value) {
            this.data[key] = value;
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
                    {renderComponent1({ state: this.state, setState: this.safeSetState, setData: this.setData, getData: this.getData })}
                    {renderComponent2({ state: this.state, setState: this.safeSetState, setData: this.setData, getData: this.getData })}
                </div>
            );
        }
    }
    return SharedState;
}
