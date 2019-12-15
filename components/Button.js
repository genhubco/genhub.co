import React from "react";
import css from "styled-jsx/css";
import classnames from "classnames";

const Button = ({ loading, text = "", onClick = () => {} }) => {
	return (
		<button onClick={onClick} disabled={loading} className={classnames("btn", { "btn-disabled": loading })}>
			{loading ? "..." : text}
			<style jsx>{styles}</style>
		</button>
	);
};

const styles = css`
.btn {
	vertical-align: bottom;
	border: none;
	font-size: 16px;
	font-family: "PT Sans", sans-serif;
	border-radius: 9px;
	background-color: #007FFF;
	box-sizing: border-box;
	color: white;
	cursor: pointer;
	display: inline-block;
	height: 40px;
	min-width: 80px;
}

.btn:hover {
	background-color: #2793ff;
}

.btn-disabled {
	cursor: default;
	background-color: #2793ff;
}

`;

export default Button;