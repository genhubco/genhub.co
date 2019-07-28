import React from "react";

export default class Interval extends React.Component {
    constructor(props) {
        super(props);
        this._interval = 0;
        this.state = { time: null };
    }

    componentDidMount() {
        const { every } = this.props;
        this.setState({ time: Date.now() });
        this._interval = setInterval(() => { this.setState({ time: Date.now() }); }, every);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
        this._interval = 0;
    }

    render() {
        const { render } = this.props;
        return render(this.state.time);
    }
}
