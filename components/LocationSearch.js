import React from "react";
import css from "styled-jsx/css";
import classnames from "classnames";

import WithState from "./WithState";
import Input from "./Input";

const availableSpecies = ["homo_sapiens"];

const Inputs = ({ onChange = () => {} }) => (
	<WithState initialState={{
		species: "homo_sapiens"
	}} initialData={{
		timer: 0,
		gene: ""
	}} render={({ state, setState, getData, setData }) => {
		const handleSelect = (val) => {
			const { gene } = getData();
			setState({ species: val });
			onChange({
				species: val,
				gene
			});
		};
		const handleChange = (key, val) => {
			setData({ [key]: val });
			const species = state.species;
			const { gene, timer } = getData();

			clearTimeout(timer);
			const newTimer = setTimeout(() => {
				onChange({
					species,
					gene
				});
			}, 500);
			setData({ timer: newTimer });
		};
		return (
			<div className="search-container">
				<div className="search-input-container">
					<div className="search-input-wrapper">
						<Input
							disabled
							initialState={{ value: state.species }}
							prefix="species:"
						/>
					</div>
					<div className="search-input-wrapper">
						<Input
							placeholder="EMX1, ENS..., etc."
							onChange={(val) => handleChange("gene", val)}
							initialState={{ value: getData().gene }}
							prefix="gene:"
						/>
					</div>
				</div>
				<div className="search-species-options">
					{availableSpecies.map((item, i) => (
						<div key={`key-${item}-${i}`} className="search-species-option-container">
							<div
								onClick={() => handleSelect(item)}
								className={classnames("search-species-option", {
									"search-species-option-selected": state.species === item
								})}>
								{item}
							</div>
						</div>
					))}
				</div>
				<style jsx>{inputStyles}</style>
			</div>
		);
	}}/>
);

const inputStyles = css`
.search-input-container {
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	padding-bottom: 10px;
}

.search-input-wrapper {
	width: 355px;
}

.search-species-option-container {
	display: inline-block;
	box-sizing: border-box;
	padding-right: 7px;
}

.search-species-options {
	padding-left: 5px;
	padding-bottom: 10px;
}

.search-species-option {
	padding: 3px 7px;
	border: 1px solid #a7afb5;
	border-radius: 9px;
	color: #a7afb5;
	letter-spacing: 0.5px;
	font-family: "PT Sans", sans-serif;
	font-size: 14px;
	margin: 0;
	cursor: pointer;
}

.search-species-option:hover, .search-species-option-selected {
	color: black;
	border: 1px solid black;
}
`;

const SearchWithPause = ({ onChange = () => {} }) => (
	<WithState initialData={{ lastReq: null }} render={({ getData, setData }) => (
		<Inputs onChange={async (data) => {
			if (!data.species || !data.gene) {
				return;
			}
			let { lastReq } = getData();
			if (lastReq) {
				const newLast = lastReq.then(() => onChange(data));
				setData({ lastReq: newLast });
			} else {
				const newReq = onChange(data);
				setData({ lastReq: newReq });
			}
		}} />
	)} />
);

export default SearchWithPause;