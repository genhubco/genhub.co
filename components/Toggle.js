import React, { useState } from "react";
import css from "styled-jsx/css";
import classnames from "classnames";

const Toggle = ({ disabled, children, onToggle = () => {} }) => {
	const [toggle, setToggle] = useState(false);
	return (
		<button onClick={() => {
			const newToggle = !toggle;
			setToggle(newToggle);
			onToggle(newToggle);
		}} disabled={disabled} className={classnames("toggle", {
			"toggle-disabled": disabled,
			"toggle-toggled": toggle,
			"toggle-untoggled": !toggle
		})}>
			{children}
			<style jsx>{styles}</style>
		</button>
	);
};

const styles = css`
.toggle {
	vertical-align: bottom;
	font-family: "PT Sans", sans-serif;
	box-sizing: border-box;
	cursor: pointer;
	display: inline-block;
	height: 23px;
	min-width: 23px;
	border-radius: 3px;
	font-size: 12px;
}

.toggle-untoggled {
	background-color: white;
	border: 1px solid #EBEBEB;
}

.toggle-toggled {
	background-color: #dddfe2;
	border: 1px solid #dddfe2;
}

.toggle-toggled:active {
	background-color: white;
}

.toggle-untoggled:active {
	background-color: #dddfe2;
}

.toggle-disabled {
	cursor: default;
	color: #EBEBEB;
}

`;

export default Toggle;