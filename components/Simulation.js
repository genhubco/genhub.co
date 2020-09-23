import React, { useState } from "react";
import css from "styled-jsx/css";
import { svgPath } from "../utils/index";
import { map } from "../utils/index";

const Simulation = ({ color = "black", values = [], selected = 200, setSelected = () => { } }) => (
	<svg
		viewBox={`0 0 ${values.length} 120`}
		width="100%"
		height="120px"
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
		<rect x="0" y="0" width="100%" height="120" fill="url(#lines)" pointerEvents="none" />
		{svgPath(5, 115, values, color)}
		<line x1="0" x2="100%" y1="120" y2="120" stroke="#d2d6d9" strokeWidth="2" pointerEvents="none" />
		<line x1={selected} x2={selected} y1="0" y2="120" stroke="black" strokeWidth="3" pointerEvents="none" />
		<style jsx>{styles}</style>
	</svg>
);

const styles = css`
.simulation {
	display: block;
}

.simulation:hover {
	cursor: crosshair;
}
`;

export default Simulation;