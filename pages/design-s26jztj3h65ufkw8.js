import React from "react";
import css from "styled-jsx/css";

import Page from "../components/Page";
import LocationList from "../components/LocationList";
import LocationSearch from "../components/LocationSearch";
import CrisprTargetMap from "../components/CrisprTargetMap";
import Table from "../components/Table";
import Alert from "../components/Alert";
import ExternalLink from "../components/ExternalLink";
import Text from "../components/Text";
import WithState from "../components/WithState";

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
		<Page title={"Design - GenHub"} render={(setError) => (
			<>
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
							<LocationSearch onChange={async (data) => {
								const res = await fetch(`${process.env.FUNCTIONS}/${data.species}-search-locations?q=${data.gene}`);
								if (!res.ok) {
									if (res.status === 400) {
										return setError("Invalid input.");
									}
									setError("Oop! Something went wrong while searching for locations.");
								}
								const items = await res.json();
								setState({
									locations: items,
									species: data.species
								});
							}}/>
						</div>
						<div className="location-list">
							<LocationList locations={state.locations} onSelect={async (item) => {
								const res = await fetch(`${process.env.FUNCTIONS}/${state.species}-targets?id=${item.id}`);
								if (!res.ok) {
									return setError("Oops! Something went wrong while searching for targets.");
								}
								const targets = await res.json();
								const slices = targets.map(tar => `${item.chr}:${tar.index - 2}..${tar.index + 27}:${item.strand}`);
								const res2 = await fetch(`https://rest.ensembl.org/sequence/region/${state.species}`, {
									method: "POST",
									headers: {
										"Content-Type": "application/json"
									},
									body: JSON.stringify({ regions: slices })
								});

								if (!res2.ok) {
									return setError("Oops! Something went wrong while searching for targets.");
								}
								const objs = await res2.json();
								const seqs = objs.map(obj => obj.seq);

								const targetsWithSeqs = targets.map((tar, i) => ({
									...tar,
									sequence: seqs[i]
								}));

								setState({
									targets: targetsWithSeqs,
									selectedLocation: item
								});
							}} />
						</div>
						<div className="target-map">
							<CrisprTargetMap
								targets={state.targets.map(tar => ({
									...tar,
									sequence: tar.sequence.substring(3, 26) 
								}))}
								start={state.selectedLocation.start}
								end={state.selectedLocation.end}
							/>
						</div>
						<div className="target-table">
							<Table headers={[{
								display: "Sequence",
								key: "sequence"
							}, {
								display: "Strand",
								key: "strand"
							}, {
								display: "Position",
								key: "index"
							}, {
								display: "Score",
								key: "score"
							}, {
								display: "Off-targets",
								key: "offTargets"
							}]} items={state.targets} weights={[7, 1, 2, 2, 3]} renderRowItem={(header, item) => {
								const tableRowMap = {
									sequence: () => {
										const seq = item.sequence;
										const preffix = seq.substring(0, 3);
										const pam = seq.substring(3, 6);
										const target = seq.substring(6, 26);
										const suffix = seq.substring(26, 30);
										return (
											<>
												<Text desc>{preffix}</Text>
												<Text warning>{pam}</Text>
												<Text>{target}</Text>
												<Text desc>{suffix} </Text>
											</>
										);
									},
									index: () => <Text>{format(item.index)}</Text>,
									score: () => <Text color={lerpColor("#EE6868", "#49E500", item.score)}>{item.score.toFixed(2)}</Text>,
									strand: () => <Text>{"1"}</Text>,
									offTargets: () => {
										const seq = item.sequence;
										const pam = seq.substring(3, 6);
										const target = seq.substring(6, 26);
										return (
											<a target="_blank" rel="noopener noreferrer"
												href={`/off-targets?species=${state.species}&seq=${pam + target}&strand=${state.selectedLocation.strand}`}
												className="table-off-targets"
											>
												<Text>{"0 - 1 - 2 - 3 - 4 "}</Text>
												<span className="new-tab-icon">{" ⇥"}</span>
											</a>
										);
									},
								};
								return tableRowMap[header]();
							}} />
						</div>
					</>
				)}/>
				<style jsx>{styles}</style>
			</>
		)}/>
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

.search-inputs, .target-map {
	box-sizing: border-box;
	padding: 0 60px 0 60px;
}

.location-list {
	box-sizing: border-box;
	padding: 0 60px 20px 60px;
}

.target-table {
	box-sizing: border-box;
	padding: 20px 60px 20px 60px;
}

.new-tab-icon {
	font-family: "PT Sans", sans-serif;
	font-size: 12px;
	display: inline-block;
}

.table-off-targets {
	color: black;
	text-decoration: none;
}

.table-off-targets:hover {
	cursor: pointer;
	text-decoration: underline;
}
`;

export default Demo;
