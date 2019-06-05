function map(input_start, input_end, output_start, output_end, input) {
    const output = output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start);
    return output;
}

export default class DemoPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            position: {
                left: 0,
                top: 0
            },
            info: {}
        };
    }

    showTargetInfo() {
        if (!this.state.show) {
            return null;
        }

        return (
            <div className="target-info" style={{
                ...this.state.position
            }}>
                <p>{this.state.info}</p>
            </div>
        );
    }

    render() {
        const data = { ...this.props.data };
        if (!data.targets.length) {
            return null;
        }
        data.targets = data.targets.length > 5 ? data.targets.slice(0, 5) : data.targets;
        return (
            <div className="crispr-target-map">
                <svg viewBox={`0 0 100 ${(data.targets.length * 3) + 2}`} xmlns="http://www.w3.org/2000/svg">
                    {data.targets.map((item, i) => (
                        <g
                            key={`key-${i}`}
                            transform={`translate(${map(0, data.end - data.start, 10, 90, item.position)}, ${i * 3})`}
                            className="target-pin"
                            onMouseOver={() => {
                                const viewBoxX = map(0, data.end - data.start, 10, 90, item.position);
                                const padding = map(0, 100, 0, 748, 10);
                                const absoluteX = map(10, 90, padding, 748 - padding, viewBoxX);

                                const realY = map(0, 100, 0, 748, (data.targets.length * 3) + 2);
                                const absoluteY = map(0, (data.targets.length * 3) + 2, 0, realY, i * 3);

                                this.setState({
                                    show: true,
                                    position: {
                                        left: absoluteX + 32,
                                        top: absoluteY + 7
                                    },
                                    info: `Sequence: ${item.match}\nPosition: ${item.position}`
                                });
                            }}
                            onMouseOut={() => { this.setState({ show: false }); }}
                        >
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.50123 0.133833C1.35391 0.0484167 1.18279 -0.000483751 1.00024 -0.000483751C0.447824 -0.000483751 0 0.44734 0 0.999758C0 1.55218 0.447824 2 1.00024 2C1.18277 2 1.35388 1.95111 1.50119 1.8657L3.06065 0.999759L1.50123 0.133833Z" className="target-pin"/>
                        </g>
                    ))}

                    <line x1="0" y1={(data.targets.length * 3) + 1} x2="100" y2={(data.targets.length * 3) + 1} style={{
                        stroke: "rgb(0,0,0)",
                        strokeWidth: 0.1
                    }} />
                    <line
                        onMouseOver={(e) => {
                            const absoluteX = 748 / 2;
                            const realY = map(0, 100, 0, 748, (data.targets.length * 3) + 2);
                            const absoluteY = map(0, (data.targets.length * 3) + 2, 0, realY, (data.targets.length * 3) + 1);
                            this.setState({
                                show: true,
                                position: {
                                    left: absoluteX - 55,
                                    top: absoluteY - 50
                                },
                                info: `Length: ${data.end - data.start}\nPosition start: ${data.start}\nPosition end: ${data.end}`
                            });
                        }}
                        onMouseOut={() => { this.setState({ show: false }); }}
                        x1="10"
                        y1={(data.targets.length * 3) + 1}
                        x2="90"
                        y2={(data.targets.length * 3) + 1}
                        strokeLinecap="round"
                        className="gene-sequence"
                        style={{
                            strokeWidth: 1.4
                        }}
                        />
                </svg>
                {this.showTargetInfo()}
                <style jsx global>{`
                    .crispr-target-map {
                        position: relative;
                        background-size: 20px 20px;
                        background-image: radial-gradient(circle, #c8ccd0 1px, rgba(0, 0, 0, 0) 1px);
                        padding: 20px 0;
                        border-radius: 5px;
                        border: 1px solid #f2f3f4;
                        margin-bottom: 10px;
                    }

                    .target-info {
                        pointer-events: none;
                        position: absolute;
                        border-radius: 5px;
                        background: rgba(0, 0, 0, 0.4);
                        padding: 5px;
                        color: white;
                        font-size: 12px;
                        font-family: "PT Sans", sans-serif;
                    }

                    .target-info p {
                        white-space: pre-wrap;
                        margin: 0;
                    }

                    .target-pin {
                        fill: #007fff;
                        fill-opacity: 0.8;
                    }

                    .target-pin:hover {
                        fill-opacity: 1;
                        cursor: pointer;
                    }

                    .gene-sequence {
                        stroke: #7FE49B;
                        stroke-opacity: 0.8;
                    }

                    .gene-sequence:hover {
                        stroke-opacity: 1;
                        cursor: pointer;
                    }
                `}</style>
            </div>
        );
    }
}
