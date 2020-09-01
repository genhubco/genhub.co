import React, { useState } from "react";
import css from "styled-jsx/css";

const Select = ({
	items = [],
	initialState = { value: "" },
	onChange = () => { },
}) => {
	const [state, setState] = useState(initialState);

	const handleSelect = e => {
		const newState = { value: e.target.value };
		setState(newState);
		onChange(newState.value);
	};

	return (
		<div className="select-container">
			<select value={state.value} className="select" onChange={handleSelect}>
				{items.map((item, i) =>
					<option
						key={`${item.key}-${i}`}
						value={item.key}>
						{item.display}
					</option>
				)}
			</select>
			<style jsx>{styles}</style>
		</div>
	);
};

const styles = css`
.select-container {
	display: inline-block;
	min-width: 200px;
}

.select {
	height: 40px;
	width: 100%;
	box-sizing: border-box;
	border: 1px solid #EBEBEB;
	border-radius: 9px;
	background: white;
	padding: 0 10px;
	appearance: none;
	font-size: 16px;
}
`;

export default Select;