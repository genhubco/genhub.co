import React from "react";
import css from "styled-jsx/css";
import classnames from "classnames";

const Button = ({ primary, secondary, small, medium, big, disabled, children, onClick = () => { } }) => (
	<button onClick={onClick} disabled={disabled} className={classnames("btn", {
		"btn-disabled": disabled,
		"btn-small": small,
		"btn-medium": medium,
		"btn-big": big,
		"btn-primary": primary,
		"btn-secondary": secondary
	})}>
		{children}
		<style jsx>{styles}</style>
	</button>
);

const styles = css`
.btn {
	letter-spacing: 1px;
	vertical-align: bottom;
	font-family: "PT Sans", sans-serif;
	box-sizing: border-box;
	cursor: pointer;
	display: inline-block;
}

.btn-secondary {
	border-style: solid;
	border-color: #EBEBEB;
	background-color: white;
}

.btn-primary {
	border-style: solid;
	border-color: #006bd8;
	background-color: #007fff;
	color: white;
}

.btn-big {
	border-width: 3px;
	height: 50px;
	min-width: 200px;
	border-radius: 9px;
	font-size: 16px;
	padding: 0 30px;
}

.btn-medium {
	border-width: 2px;
	height: 40px;
	min-width: 80px;
	border-radius: 6px;
	font-size: 16px;
	padding: 0 20px;
}

.btn-small {
	border-width: 1px;
	height: 23px;
	min-width: 23px;
	border-radius: 3px;
	font-size: 12px;
}

.btn-secondary:hover {
	background-color: #f2f3f4;
}

.btn-primary:hover {
	background-color: #1489ff;
}

.btn-disabled {
	pointer-events: none;
	cursor: default;
	color: #EBEBEB;
}

`;

export default Button;