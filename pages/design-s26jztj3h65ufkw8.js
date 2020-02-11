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
import { lerpColor, format } from "../utils";
import { searchLocations, getTargets } from "../utils/api-calls";

const Demo = () => {
	return (
		<Page title={"Design - GenHub"} render={(setToast) => (
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
								const res = await searchLocations(data.species, data.gene);
								if (!res.ok && res.status === 400) {
									return setToast({
										type: "error",
										message: "Invalid input."
									});
								}
								if (!res.ok) {
									return setToast({
										type: "error",
										message: "Oop! Something went wrong while searching for locations."
									});
								}
								setState({
									locations: res.data,
									species: data.species
								});
							}}/>
						</div>
						<div className="location-list">
							<LocationList locations={state.locations} onSelect={async (item) => {
								setToast({
									type: "warning",
									message: "Searching for targets!",
									duration: 14000
								});
								const res = await getTargets(state.species, item);
								setToast({
									type: "success",
									message: "Targets acquired!",
									duration: 2000
								});
								if (!res.ok) {
									return setToast({
										type: "error",
										message: "Oops! Something went wrong while searching for targets."
									});
								}

								setState({
									targets: res.data,
									selectedLocation: item
								});
							}} />
						</div>
						<div className="target-map">
							<CrisprTargetMap
								targets={state.targets.map(tar => ({
									...tar,
									sequence: tar.sequence.slice(3, 26)
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
							}]} items={state.targets} weights={[7, 1, 3, 3]} renderRowItem={(header, item) => {
								const tableRowMap = {
									sequence: () => {
										const seq = item.sequence;
										const preffix = seq.substring(0, 3);
										const target = item.strand === 1 ? seq.substring(3, 23) : seq.substring(6, 26);
										const pam = item.strand === 1 ? seq.substring(23, 26) : seq.substring(3, 6);
										const suffix = seq.substring(26, 30);
										return (
											<>
												<Text desc>{preffix}</Text>
												{item.strand === 1 ?
													<span><Text>{target}</Text>
														<Text warning>{pam}</Text></span> :
													<span><Text warning>{pam}</Text>
														<Text>{target}</Text></span>
												}
												<Text desc>{suffix} </Text>
											</>
										);
									},
									index: () => <Text>{format(item.index)}</Text>,
									score: () => <Text color={lerpColor("#EE6868", "#49E500", item.score)}>{item.score.toFixed(2)}</Text>,
									strand: () => <Text>{item.strand}</Text>
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
