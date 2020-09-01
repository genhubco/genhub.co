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
	border: none;
	display: inline-block;
	border-radius: 10px;
}

.btn-secondary {
	background-color: white;
}

.btn-primary {
	background-color: #007fff;
	color: white;
}

.btn-big {
	height: 50px;
	min-width: 200px;
	font-size: 16px;
	padding: 0 30px;
}

.btn-medium {
	height: 40px;
	min-width: 80px;
	font-size: 16px;
	padding: 0 20px;
}

.btn-small {
	height: 25px;
	min-width: 110px;
	font-size: 14px;
	padding: 0 10px;
	border-radius: 5px;
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