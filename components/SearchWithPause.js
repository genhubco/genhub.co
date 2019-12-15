import React from "react";
import css from "styled-jsx/css";

import WithState from "./WithState";
import Input from "./Input";

const Inputs = ({ onChange = () => {} }) => {
	return (
		<WithState initialData={{
			timer: 0,
			species: "homo-sapiens",
			gene: ""
		}} render={({ getData, setData }) => {
			const handleChange = (key, val) => {
				setData({ [key]: val });
				const { species, gene, timer } = getData();

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
					<div className="search-input-wrapper">
						<Input
							disabled
							onChange={(val) => handleChange("species", val)}
							initialState={{ value: getData().species }}
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
					<style jsx>{inputStyles}</style>
				</div>
			);
		}}/>
	);
};

const inputStyles = css`
.search-container {
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	padding-bottom: 20px;
}

.search-input-wrapper {
	width: 355px;
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