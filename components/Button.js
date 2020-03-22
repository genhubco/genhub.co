import React from "react";
import css from "styled-jsx/css";
import classnames from "classnames";

const Button = ({ small, medium, disabled, children, onClick = () => {} }) => (
	<button onClick={onClick} disabled={disabled} className={classnames("btn", {
		"btn-disabled": disabled,
		"btn-small": small,
		"btn-medium": medium
	})}>
		{children}
		<style jsx>{styles}</style>
	</button>
);

const styles = css`
.btn {
	vertical-align: bottom;
	border: 1px solid #EBEBEB;
	font-family: "PT Sans", sans-serif;
	background-color: white;
	box-sizing: border-box;
	cursor: pointer;
	display: inline-block;

}

.btn-medium {
	height: 40px;
	min-width: 80px;
	border-radius: 9px;
	font-size: 16px;
}

.btn-small {
	height: 23px;
	min-width: 23px;
	border-radius: 3px;
	font-size: 12px;
}

.btn:hover {
	background-color: #f2f3f4;
}

.btn-disabled {
	pointer-events: none;
	cursor: default;
	color: #EBEBEB;
}

`;

export default Button;