import React, { useState } from "react";
import css from "styled-jsx/css";
import { map, format } from "../utils";

const CrisprTargetMap = ({ targets = [], start = 0, end = 0, width = 730 }) => {
	const [state, setState] = useState({
		show: false,
		position: {
			left: 0,
			top: 0
		},
		info: ""
	});

	const fitAtLevel = (levels, target, level) => {
		if (levels.length <= level) {
			levels.push([target]);
			return;
		}
		let fit = true;
		for (let i = 0; i < levels[level].length; i++) {
			const curr = levels[level][i];
			if (Math.abs(curr.pos - target.pos) < 7) {
				fit = false;
			}
		}

		if (!fit) {
			fitAtLevel(levels, target, level + 1);
		} else {
			levels[level].push(target);
		}
	};

	const groupTargets = (targets, strand) => {
		const mapped = targets.map(item => ({
			...item,
			pos: map(item.index, start, end, 10, 90)
		}));
		const levels = [];

		mapped.forEach(target => {
			fitAtLevel(levels, target, 0);
		});

		return strand === 1 ? levels.reverse() : levels;
	};

	if (!targets.length) {
		return null;
	}

	const forwardTargets = groupTargets(targets.filter(item => item.strand === 1), 1);
	const backwardsTargets = groupTargets(targets.filter(item => item.strand === -1), -1);

	const levelHeight = 3;

	const numLevelsTop = forwardTargets.length;
	const viewHeightTop = numLevelsTop * levelHeight;

	const numLevelsBottom = backwardsTargets.length;
	const viewHeightBottom = numLevelsBottom * levelHeight;

	const numLevelsMiddle = 1;
	const viewHeightMiddle = numLevelsMiddle * levelHeight;

	const viewBoxPaddingX = 10;
	const viewBoxWidth = 100;
	const viewBoxHeight = viewHeightTop + viewHeightMiddle + viewHeightBottom + levelHeight;
	const levelHeightInPx = 22;
	const heightInPx = (numLevelsTop + numLevelsMiddle + numLevelsBottom) * levelHeightInPx;

	const targetLength = 5;
	return (
		<div className="crispr-target-map">
			<svg viewBox={`0 0 100 ${viewBoxHeight}`} xmlns="http://www.w3.org/2000/svg">
				{forwardTargets.length && <text x="1" y="3" className="strand-text">{"+ strand"}</text>}
				{backwardsTargets.length && <text x="1" y={viewBoxHeight - 1} className="strand-text">{"- strand"}</text>}
				{forwardTargets.length && <text x={viewBoxWidth - 4} y="3" className="strand-text">{"-->"}</text>}
				{backwardsTargets.length && <text x={viewBoxWidth - 4} y={viewBoxHeight - 1} className="strand-text">{"<--"}</text>}
				{forwardTargets.map((levelItems, level) => levelItems.map((item, i) => (
					<line
						onMouseOver={() => setState({
							show: true,
							pos: {
								top: map((level + 1) * levelHeight, 0, viewBoxHeight, 0, heightInPx) - 25,
								left: map(item.pos, 0, viewBoxWidth, 0, width) + 50
							},
							info: `Sequence: ${item.sequence}\nPosition: ${format(item.index)}`
						})}
						onMouseOut={() => setState({
							...state,
							show: false
						})}
						key={`${item.index}-${level}-${i}`}
						x1={item.pos - targetLength}
						y1={(level + 1) * levelHeight}
						x2={item.pos}
						y2={(level + 1) * levelHeight}
						strokeLinecap="round"
						className="target-sequence"
						style={{ strokeWidth: 1.4 }}
					/>
				))).flat()}
				<line
					x1="0"
					y1={viewHeightTop + viewHeightMiddle}
					x2={viewBoxWidth}
					y2={viewHeightTop + viewHeightMiddle}
					style={{
						stroke: "rgb(0,0,0)",
						strokeWidth: 0.1
					}}
				/>
				<line
					onMouseOver={() => setState({
						show: true,
						pos: {
							top: map(viewHeightTop, 0, viewBoxHeight, 0, heightInPx),
							left: map(viewBoxWidth / 2, 0, viewBoxWidth, 0, width) - 100
						},
						info: `Length: ${format(end - start)} bp\nStart: ${format(start)}\nEnd: ${format(end)}`
					})}
					onMouseOut={() => setState({
						...state,
						show: false
					})}
					x1={viewBoxPaddingX}
					y1={viewHeightTop + viewHeightMiddle}
					x2={viewBoxWidth - viewBoxPaddingX}
					y2={viewHeightTop + viewHeightMiddle}
					strokeLinecap="round"
					className="location-sequence"
					style={{ strokeWidth: 1.4 }}
				/>
				{backwardsTargets.map((levelItems, level) => levelItems.map((item, i) => (
					<line
						onMouseOver={() => setState({
							show: true,
							pos: {
								top: map(viewHeightTop + viewHeightMiddle + (level * levelHeight), 0, viewBoxHeight, 0, heightInPx),
								left: map(item.pos, 0, viewBoxWidth, 0, width) + 50
							},
							info: `Sequence: ${item.sequence}\nPosition: ${format(item.index)}`
						})}
						onMouseOut={() => setState({
							...state,
							show: false
						})}
						key={`${item.index}-${level}-${i}`}
						x1={item.pos}
						y1={viewHeightTop + viewHeightMiddle + ((level + 1) * levelHeight)}
						x2={item.pos + targetLength}
						y2={viewHeightTop + viewHeightMiddle + ((level + 1) * levelHeight)}
						strokeLinecap="round"
						className="target-sequence"
						style={{ strokeWidth: 1.4 }}
					/>
				))).flat()}
			</svg>
			{
				state.show && <div className="target-info" style={{ ...state.pos }}>
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
	border-radius: 9px;
	border: 1px solid #f2f3f4;
}

.target-info {
	width: 200px;
	height: 55px;
	box-sizing: border-box;
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

.target-sequence {
	stroke: #007fff;
	stroke-opacity: 0.8;
}

.location-sequence {
	stroke: #7FE49B;
	stroke-opacity: 0.8;
}

.target-sequence:hover, .location-sequence:hover {
	stroke-opacity: 1;
	cursor: pointer;
}

.strand-text {
	fill: #a7afb5;
	font-size: 2px;
	font-family: "PT Sans", sans-serif;
}
`;

export default CrisprTargetMap;