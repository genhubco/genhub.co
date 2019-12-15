import React, { useState } from "react";
import css from "styled-jsx/css";

const map = (num, inMin, inMax, outMin, outMax) => {
	return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};

const format = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const CrisprTargetMap = ({ targets = [], start = 0, end = 0, width = 730 }) => {
	const [state, setState] = useState({
		show: false,
		position: {
			left: 0,
			top: 0
		},
		info: {}
	});

	if (!targets.length) {
		return null;
	}

	return (
		<div className="crispr-target-map">
			<svg viewBox={`0 0 100 ${(targets.length * 3) + 2}`} xmlns="http://www.w3.org/2000/svg">
				{targets.map((item, i) => {
					const pos = item.index - start;
					return (
						<g
							key={`key-${i}`}
							transform={`translate(${map(pos, 0, end - start, 10, 90)}, ${i * 3})`}
							className="target-pin"
							onMouseOver={() => {
								const viewBoxX = map(pos, 0, end - start, 10, 90);
								const padding = map(10, 0, 100, 0, width);
								const absoluteX = map(viewBoxX, 10, 90, padding, width - padding);

								const realY = map((targets.length * 3) + 2, 0, 100, 0, width);
								const absoluteY = map(i * 3, 0, (targets.length * 3) + 2, 0, realY);

								setState({
									show: true,
									position: {
										left: absoluteX + 32,
										top: absoluteY + 7
									},
									info: `Sequence: ${item.sequence.substring(5, 25)}\nPosition: ${format(item.index)}\nScore: ${item.score.toFixed(2)}`
								});
							}}
							onMouseOut={() => setState({ show: false })}
						>
							<path fillRule="evenodd" clipRule="evenodd" d="M1.50123 0.133833C1.35391 0.0484167 1.18279 -0.000483751 1.00024 -0.000483751C0.447824 -0.000483751 0 0.44734 0 0.999758C0 1.55218 0.447824 2 1.00024 2C1.18277 2 1.35388 1.95111 1.50119 1.8657L3.06065 0.999759L1.50123 0.133833Z" className="target-pin"/>
						</g>
					);
				})}

				<line x1="0" y1={(targets.length * 3) + 1} x2="100" y2={(targets.length * 3) + 1} style={{
					stroke: "rgb(0,0,0)",
					strokeWidth: 0.1
				}} />
				<line
					onMouseOver={() => {
						const absoluteX = width / 2;
						const realY = map((targets.length * 3) + 2, 0, 100, 0, width);
						const absoluteY = map((targets.length * 3) + 1, 0, (targets.length * 3) + 2, 0, realY);
						setState({
							show: true,
							position: {
								left: absoluteX - 55,
								top: absoluteY - 50
							},
							info: `Length: ${end - start} bp\nPosition start: ${start}\nPosition end: ${end}`
						});
					}}
					onMouseOut={() => setState({ show: false })}
					x1="10"
					y1={(targets.length * 3) + 1}
					x2="90"
					y2={(targets.length * 3) + 1}
					strokeLinecap="round"
					className="gene-sequence"
					style={{ strokeWidth: 1.4 }}
				/>
			</svg>
			{
				state.show && <div className="target-info" style={{ ...state.position }}>
					<p>{state.info}</p>
				</div>
			}
			<style jsx>{styles}</style>
		</div>
	);
};

const styles = css`
.crispr-target-map {
	position: relative;
	background-size: 20px 20px;
	background-image: radial-gradient(circle, #c8ccd0 1px, rgba(0, 0, 0, 0) 1px);
	padding: 20px 0;
	border-radius: 5px;
	border: 1px solid #f2f3f4;
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
`;

export default CrisprTargetMap;