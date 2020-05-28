import React, { useState } from "react";
import css from "styled-jsx/css";
import Text from "./Text";
import Button from "./Button";
import Toggle from "./Toggle";
import { map, format } from "../utils";

const CrisprTargetMap = ({
	targets = [],
	start = 0,
	end = 0,
	defaultStart = 0,
	defaultEnd = 0,
	width = 730,
	onZoom = () => { }
}) => {
	const [state, setState] = useState({
		zoomMode: false,
		zoomPosStart: 0,
		zoomCursorPos: 0,
		showInfo: false,
		infoPos: {
			left: 0,
			top: 0
		},
		info: ""
	});

	const paddingTop = 50;
	const paddingBottom = 20;
	const paddingX = 80;
	const levelHeight = 20;
	const targetLineLength = 40;

	const groupTargets = targets => {
		const mapped = targets.map(item => ({
			...item,
			posInPx: map(item.index, start, end, paddingX, width - paddingX)
		}));
		const levels = [];

		mapped.forEach(target => fitAtLevel(levels, target, 0));

		return levels;
	};

	const fitAtLevel = (levels, target, level) => {
		if (levels.length <= level) {
			levels.push([target]);
			return;
		}
		let fit = true;
		for (let i = 0; i < levels[level].length; i++) {
			const curr = levels[level][i];
			if (Math.abs(curr.posInPx - target.posInPx) < targetLineLength + 10) {
				fit = false;
			}
		}

		if (!fit) {
			fitAtLevel(levels, target, level + 1);
		} else {
			levels[level].push(target);
		}
	};

	const forwardTargets = groupTargets(targets.filter(item => item.strand === "forward")).reverse();
	const backwardsTargets = groupTargets(targets.filter(item => item.strand === "backward"));

	const forwardTargetsHeight = forwardTargets.length * levelHeight;
	const middleHeight = levelHeight;
	const backwardTargetsHeight = backwardsTargets.length * levelHeight;
	const height = paddingTop + forwardTargetsHeight + middleHeight + backwardTargetsHeight + paddingBottom;

	const topLevelPos = level => {
		return paddingTop + (level * levelHeight);
	};

	const bottomLevelPos = level => {
		return paddingTop + forwardTargetsHeight + middleHeight + (level * levelHeight);
	};

	return (
		<div className="crispr-target-map">
			{state.zoomMode && <div
				className="crispr-target-map-mouse-catcher"
				onMouseDown={() => {
					if (!state.zoomMode) {
						return;
					}
					setState(prevState => ({
						...prevState,
						zoomPosStart: prevState.zoomCursorPos
					}));
				}}
				onMouseUp={() => {
					const zoomStart = Math.min(state.zoomPosStart, state.zoomCursorPos);
					const zoomEnd = Math.max(state.zoomPosStart, state.zoomCursorPos);
					const mappedStart = map(zoomStart, paddingX, width - paddingX, start, end);
					const mappedEnd = map(zoomEnd, paddingX, width - paddingX, start, end);
					const searchData = {
						start: Math.floor(mappedStart),
						end: Math.floor(mappedEnd)
					};
					setState(prevState => ({
						...prevState,
						zoomPosStart: 0
					}));

					if (searchData.start === searchData.end) {
						return;
					}
					onZoom(searchData);
				}}
				onMouseMove={e => {
					if (!state.zoomMode) {
						return;
					}

					let newPos = e.nativeEvent.offsetX + 2;
					if (newPos < paddingX) {
						newPos = paddingX;
					}
					if (newPos > width - paddingX) {
						newPos = width - paddingX;
					}

					setState({
						...state,
						zoomCursorPos: newPos
					});
				}} />}
			<svg className="crispr-target-map-svg" viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
				{forwardTargets.map((levelItems, level) => levelItems.map((item, i) => (
					<line
						onMouseOver={() => setState({
							showInfo: true,
							infoPos: {
								top: topLevelPos(level) + 10,
								left: item.posInPx - 120
							},
							info: `Sequence: ${item.seq.slice(3, 23)}\nPosition: ${format(item.index)}`
						})}
						onMouseOut={() => setState({
							...state,
							showInfo: false
						})}
						key={`${item.index}-${level}-${i}`}
						x1={item.posInPx - targetLineLength}
						y1={topLevelPos(level)}
						x2={item.posInPx}
						y2={topLevelPos(level)}
						strokeLinecap="round"
						className="crispr-target-map-target-sequence"
						style={{ strokeWidth: 9 }}
					/>
				))).flat()}
				<line
					x1="0"
					y1={paddingTop + forwardTargetsHeight}
					x2={width}
					y2={paddingTop + forwardTargetsHeight}
					style={{
						stroke: "rgb(0,0,0)",
						strokeWidth: 1
					}}
				/>
				<line
					x1={paddingX}
					y1={paddingTop + forwardTargetsHeight}
					x2={width - paddingX}
					y2={paddingTop + forwardTargetsHeight}
					strokeLinecap="round"
					className="crispr-target-map-location-sequence"
					style={{ strokeWidth: 9 }}
				/>
				{backwardsTargets.map((levelItems, level) => levelItems.map((item, i) => (
					<line
						onMouseOver={() => setState({
							showInfo: true,
							infoPos: {
								top: bottomLevelPos(level) + 10,
								left: item.posInPx - 90
							},
							info: `Sequence: ${item.seq.slice(3, 23)}\nPosition: ${format(item.index)}`
						})}
						onMouseOut={() => setState({
							...state,
							showInfo: false
						})}
						key={`${item.index}-${level}-${i}`}
						x1={item.posInPx}
						y1={bottomLevelPos(level)}
						x2={item.posInPx + targetLineLength}
						y2={bottomLevelPos(level)}
						strokeLinecap="round"
						className="crispr-target-map-target-sequence"
						style={{ strokeWidth: 9 }}
					/>
				))).flat()}
				{state.zoomMode && state.zoomPosStart &&
					[<line
						key="1"
						x1={state.zoomPosStart}
						y1="0"
						x2={state.zoomPosStart}
						y2={height}
						style={{
							stroke: "rgb(0,0,0)",
							strokeWidth: 1
						}}
					/>, <rect
						key="2"
						fill={"#f0f8ff"}
						fillOpacity="50%"
						x={Math.min(state.zoomPosStart, state.zoomCursorPos)}
						width={Math.abs(state.zoomPosStart - state.zoomCursorPos)}
						height={height}
					/>]
				}
				{state.zoomMode && state.zoomCursorPos && <line
					x1={state.zoomCursorPos}
					y1="0"
					x2={state.zoomCursorPos}
					y2={height}
					style={{
						stroke: "rgb(0,0,0)",
						strokeWidth: 1
					}}
				/>}
			</svg>
			{
				(forwardTargets.length !== 0) && <div style={{
					top: 10,
					left: 10
				}} className="crispr-target-map-info-text"><Text desc>{"+ strand"}</Text></div>
			}
			{
				(backwardsTargets.length !== 0) && <div style={{
					top: height - 30,
					left: 10
				}} className="crispr-target-map-info-text"><Text desc>{"- strand"}</Text></div>
			}
			<div className="crispr-target-map-info-text" style={{
				top: paddingTop + forwardTargetsHeight,
				left: 3
			}}>
				<Text small>{format(start)}</Text>
			</div>
			<div className="crispr-target-map-info-text" style={{
				top: paddingTop + forwardTargetsHeight,
				left: width - 73
			}}>
				<Text small>{format(end)}</Text>
			</div>
			<div className="crispr-target-map-controls" style={{
				top: 10,
				left: width - 80
			}}>
				<div className="crispr-target-map-controls-separator">
					<Toggle onToggle={toggle => setState(prevState => ({
						...prevState,
						zoomMode: toggle
					}))}>⟷</Toggle>
				</div>
				<Button small secondary disabled={start === defaultStart && end === defaultEnd} onClick={() => {
					onZoom({
						start: defaultStart,
						end: defaultEnd
					});
				}}>―</Button>
			</div>
			{
				state.showInfo && <div className="crispr-target-map-target-info" style={{ ...state.infoPos }}>
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
	box-sizing: border-box;
	border: 1px solid #f2f3f4;
}

.crispr-target-map-svg {
	display: block;
}

.crispr-target-map-target-info {
	width: 210px;
	height: 40px;
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

.crispr-target-map-target-info p {
	white-space: pre-wrap;
	margin: 0;
}

.crispr-target-map-target-sequence {
	stroke: #007fff;
	stroke-opacity: 0.8;
}

.crispr-target-map-location-sequence {
	stroke: #7FE49B;
	stroke-opacity: 0.8;
}

.crispr-target-map-target-sequence:hover {
	stroke-opacity: 1;
	cursor: pointer;
}

.crispr-target-map-mouse-catcher {
	position: absolute;
	left: 0px;
	top: 0px;
	height: 100%;
	width: 100%;
	cursor: ew-resize;
}

.crispr-target-map-info-text {
	box-sizing: border-box;
	pointer-events: none;
	position: absolute;
	font-size: 12px;
	width: 68px;
	text-align: center;
}

.crispr-target-map-controls {
	position: absolute;
}

.crispr-target-map-controls-separator {
	display: inline-block;
	padding-right: 5px;
}
`;

export default CrisprTargetMap;