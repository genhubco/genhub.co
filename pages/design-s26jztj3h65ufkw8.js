import React from "react";
import css from "styled-jsx/css";

import Page from "../components/Page";
import LocationList from "../components/LocationList";
import SearchWithPause from "../components/SearchWithPause";
import CrisprTargetMap from "../components/CrisprTargetMap";
import Table from "../components/Table";
import Alert from "../components/Alert";
import ExternalLink from "../components/ExternalLink";
import Text from "../components/Text";
import WithState from "../components/WithState";
import StatusBar from "../components/StatusBar";

const format = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const lerpColor = (colorFrom, colorTo, amount) => {
	const ah = parseInt(colorFrom.replace(/#/g, ""), 16),
		ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
		bh = parseInt(colorTo.replace(/#/g, ""), 16),
		br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
		rr = ar + amount * (br - ar),
		rg = ag + amount * (bg - ag),
		rb = ab + amount * (bb - ab);

	return "#" + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
};

const Demo = () => {
	return (
		<Page title={"Design - GenHub"}>
			<div className="beta-alert-container">
				<Alert><Text>The app is currently in beta! Give us <ExternalLink to="https://forms.gle/MmTHWiy4zzsv5s8N9">
					feedback
				</ExternalLink>.</Text></Alert>
			</div>
			<WithState initialState={{
				targets: [],
				locations: [],
				error: "",
				species: "",
				status: "success",
				selectedLocation: {}
			}} render={({ state, setState }) => (
				<>
					<div className="search-title">
						<Text desc>Search for targets at location:</Text>
					</div>
					<div className="search-inputs">
						<SearchWithPause onChange={async (data) => {
							setState({ status: "loading" });
							try {
								const res = await fetch(`${process.env.FUNCTIONS}/${data.species}-search-locations?q=${data.gene}`);
								if (!res.ok) {
									throw res;
								}
								const items = await res.json();
								setState({
									status: "success",
									locations: items,
									species: data.species
								});
							} catch (e) {
								if (e.status === 400) {
									return setState({
										status: "error",
										error: "Invalid input."
									});
								}
								setState({
									status: "error",
									error: "Oop! Something went wrong while searching for locations."
								});
							}
						}}/>
					</div>
					<div className="location-list">
						<LocationList locations={state.locations} onSelect={async (item) => {
							setState({ status: "loading" });
							try {
								const res = await fetch(`${process.env.FUNCTIONS}/${state.species}-targets-${
									item.strand === 1 ? "forward" : "backward"
								}?id=${item.id}`);
								if (!res.ok) {
									throw res;
								}
								const targets = await res.json();
								const slices = targets.map(tar => ({
									species: state.species,
									chr: item.chr,
									range: [tar.index - 2, tar.index + 28]
								}));
								const res2 = await fetch(`${process.env.FUNCTIONS}/genome-slice`, {
									method: "POST",
									body: JSON.stringify(slices)
								});
								if (!res2.ok) {
									throw res2;
								}
								const seqs = await res2.json();

								const targetsWithSeqs = targets.map((tar, i) => ({
									...tar,
									sequence: seqs[i]
								}));

								setState({
									status: "success",
									targets: targetsWithSeqs,
									selectedLocation: item
								});
							} catch (e) {
								setState({
									status: "error",
									error: "Oops! Something went wrong while searching for targets."
								});
							}
						}} />
					</div>
					<div className="status-bar">
						<StatusBar status={state.status} error={state.error}/>
					</div>
					<div className="target-map">
						<CrisprTargetMap targets={state.targets} start={state.selectedLocation.start} end={state.selectedLocation.end}/>
					</div>
					<div className="target-table">
						<Table headers={[{
							display: "Sequence",
							key: "sequence"
						}, {
							display: "Position",
							key: "index"
						}, {
							display: "Score",
							key: "score"
						}]} items={state.targets} weights={[3, 1, 1]} renderRowItem={(header, item) => {
							const tableRowMap = {
								sequence: (seq) => {
									const preffix = seq.substring(0, 2);
									const pam = seq.substring(2, 5);
									const target = seq.substring(5, 25);
									const suffix = seq.substring(25, 30);
									return (
										<a target="_blank" rel="noopener noreferrer"
											href={`/off-targets?species=${state.species}&seq=${pam + target}&strand=${state.selectedLocation.strand}`}
											className="table-sequence"
										>
											<Text desc>{preffix}</Text>
											<Text warning>{pam}</Text>
											<Text>{target}</Text>
											<Text desc>{suffix} </Text>
											<span className="new-tab-icon">{" ⇥"}</span>
										</a>
									);
								},
								index: (idx) => <Text>{format(idx)}</Text>,
								score: (score) => <Text color={lerpColor("#EE6868", "#49E500", score)}>{score.toFixed(2)}</Text>
							};
							return tableRowMap[header](item);
						}} />
					</div>
				</>
			)}/>
			<style jsx>{styles}</style>
		</Page>
	);
};

const styles = css`
.beta-alert-container {
	box-sizing: border-box;
	padding: 50px 60px 30px 60px;
}

.search-title {
	box-sizing: border-box;
	padding: 0 60px 5px 65px;
}

.search-inputs, .target-map, .location-list {
	box-sizing: border-box;
	padding: 0 60px 0 60px;
}

.target-table {
	box-sizing: border-box;
	padding: 20px 60px 20px 60px;
}

.new-tab-icon {
	font-family: "PT Sans", sans-serif;
	font-size: 12px;
	display: none;
}

.table-sequence {
	color: black;
	text-decoration: none;
}

.table-sequence:hover {
	cursor: pointer;
	text-decoration: underline;
}

.table-sequence:hover .new-tab-icon {
	display: inline-block;
	text-decoration: underline;
}

.status-bar {
	padding: 5px 60px 5px 60px;
}
`;

export default Demo;
