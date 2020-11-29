import React from "react";
import css from "styled-jsx/css";
import { svgPath, map } from "../utils/index";

const Simulation = ({ limits = [], color = "black", values = [], selected = 200, setSelected = () => { } }) => {
	let height = 120;
	let showHeight = 110;
	let showStart = 20;
	const off = showHeight;
	const on = showStart;
	return (
		<svg
			viewBox={`0 0 ${values.length} ${height}`}
			width="100%"
			height={`${height}px`}
			className="simulation"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="none"
			onClick={e => {
				const x = e.clientX;
				const rect = e.target.getBoundingClientRect();
				const relX = map(x - rect.left, 0, rect.width, 0, 1000);
				setSelected(Math.floor(relX));
			}}
		>
			<defs>
				<pattern id="lines" x="0" y="0" width="100%" height="20" patternUnits="userSpaceOnUse">
					<line stroke="#d2d6d9" x1="0" x2="100%" y1="0" y2="0" />
				</pattern>
			</defs>
			<rect x="0" y="0" width="100%" height={height} fill="url(#lines)" pointerEvents="none" />
			<line x1="0" x2="100%" y1={off} y2={off} stroke="red" strokeWidth="7" opacity="0.2" pointerEvents="none" />
			<line x1="0" x2="100%" y1={on} y2={on} stroke="#6ed827" strokeWidth="7" opacity="0.2" pointerEvents="none" />
			{svgPath(showHeight, showStart, values, color, limits)}
			<line x1="0" x2="100%" y1={height} y2={height} stroke="#d2d6d9" strokeWidth="2" pointerEvents="none" />
			<line x1={selected} x2={selected} y1="0" y2={height} stroke="black" strokeWidth="3" pointerEvents="none" />
			<style jsx>{styles}</style>
		</svg>
	);
};

const styles = css`
.simulation {
	display: block;
}

.simulation:hover {
	cursor: crosshair;
}
`;

export default Simulation;