import { withRouter } from 'next/router';
import Link from 'next/link';
import classnames from "classnames";

export default class Explorer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { selectedItem: props.default };
    }

    renderBody() {
        const { tree, render } = this.props;
        if (tree[this.state.selectedItem].children) {
            return (
                <ul className="explorer-list">
                    {tree[this.state.selectedItem].children.map((item, i) => (
                        <li key={`item-${item}-${i}`} className="explorer-list-item">
                            <button className="explorer-header-button" onClick={() => this.setState({ selectedItem: item })}>{item}</button>
                        </li>
                    ))}
                </ul>
            );
        }

        return render(tree[this.state.selectedItem].content);
    }

    render() {
        const { tree } = this.props;
        return (
            <div className="explorer">
                <div className="explorer-header">{tree[this.state.selectedItem].path.split("/").map((item, i) => [
                    <button
                        key={`header-item-${item}-${i}`}
                        className="explorer-header-button"
                        onClick={() => this.setState({ selectedItem: item })}>
                        {item}
                    </button>,
                    <span key={`separator-${item}-${i}`}>{ tree[item].children && "/" }</span>
                ])}</div>
                <div className="explorer-body">
                    {this.renderBody()}
                </div>
            </div>
        );
    }
}
