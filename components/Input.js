import React, { useState } from "react";
import classnames from "classnames";
import css from "styled-jsx/css";

import Text from "./Text";

const Input = ({
	initialState = { value: "" },
	onChange = () => {},
	className = "",
	prefix = "",
	error = "",
	disabled,
	placeholder = ""
}) => {
	const [state, setState] = useState(initialState);

	const handleChange = (e) => {
		const newState = { value: e.target.value };
		setState(newState);
		onChange(newState.value);
	};

	return (
		<div className={classnames("input-container", className)}>
			<div className="input-group">
				<p className="input-prefix">{prefix}</p>
				<input placeholder={placeholder} disabled={disabled} value={state.value} onChange={handleChange} className="input"/>
			</div>
			<Text error>{error}</Text>
			<style jsx>{styles}</style>
		</div>
	);
};

const styles = css`
.input-container {
	min-width: 200px;
}

.input-prefix {
	margin: 0;
	box-sizing: border-box;
	font-family: "PT Sans", sans-serif;
	color: #a7afb5;
}

.input {
	box-sizing: border-box;
	padding: 0 0 2px 10px;
	outline: none;
	border: none;
	flex: 2;
	height: 30px;
	font-size: 16px;
}

.input::placeholder {
	color: #a7afb5;
}

.input-group {
	display: flex;
	box-sizing: border-box;
	align-items: center;
	border: 1px solid #EBEBEB;
	border-radius: 9px;
	background: white;
	height: 40px;
	padding: 0 10px;
}
`;

export default Input;