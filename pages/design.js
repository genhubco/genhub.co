import React from "react";
import css from "styled-jsx/css";
import Link from "next/link";

import Page from "../components/Page";
import List from "../components/List";
import CrisprTargetMap from "../components/CrisprTargetMap";
import Table from "../components/Table";
import Alert from "../components/Alert";
import ExternalLink from "../components/ExternalLink";
import Text from "../components/Text";
import Input from "../components/Input";
import Select from "../components/Select";
import WithState from "../components/WithState";
import { lerpColor, format } from "../utils";
import { searchLocations, getTargets } from "../utils/api-calls";

const availableSpecies = [{
	key: "homo_sapiens",
	display: "homo_sapiens (Humans)"
}];

const Inputs = ({ onChange = () => {} }) => (
	<WithState initialData={{
		timer: 0,
		location: "",
		species: "homo_sapiens"
	}} render={({ getData, setData }) => {
		const handleChange = (key, val) => {
			setData({ [key]: val });
			const { location, species, timer } = getData();

			clearTimeout(timer);
			const newTimer = setTimeout(() => {
				onChange({
					species,
					location
				});
			}, 200);
			setData({ timer: newTimer });
		};
		return (
			<div className="search-container">
				<div className="search-input-container">
					<div className="search-input-wrapper">
						<Select
							items={availableSpecies}
							onChange={species => handleChange({ species })}
							initialState={{ value: getData().species }}
						/>
					</div>
					<div className="search-input-wrapper">
						<Input
							placeholder="EMX1, ENS..., etc."
							onChange={(val) => handleChange("location", val)}
							initialState={{ value: getData().location }}
							prefix="location:"
						/>
					</div>
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
	padding-bottom: 20px;
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
			if (!data.species || !data.location) {
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

const Demo = () => {
	return (
		<Page title={"Design - GenHub"} render={(setToast) => (
			<>
				<div className="beta-alert-container">
					<Alert><Text>The app is currently in beta! Give us <ExternalLink to="https://forms.gle/zSseAoHbeeF6JUXV7">
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
							<Text desc>Search for targets at:</Text>
						</div>
						<div className="search-inputs">
							<SearchWithPause onChange={async (data) => {
								try {
									const res = await searchLocations(data.species, data.location);
									setState({
										locations: res.data,
										species: data.species
									});
								} catch (e) {
									if (e.status === 400) {
										setToast({
											type: "error",
											message: "Invalid input."
										});
										return;
									}
									setToast({
										type: "error",
										message: "Oop! Something went wrong while searching for locations.",
										duration: 6000
									});

								}
							}}/>
						</div>
						<div className="location-list">
							<List locations={state.locations.map(item => ({
								...item,
								range: `${format(item.start)} - ${format(item.end)}`
							}))} onSelect={async (item) => {
								setToast({
									type: "warning",
									message: "Searching for targets..."
								});
								try {
									const newItem = {
										...item,
										zoomStart: item.start,
										zoomEnd: item.end
									};
									const res = await getTargets(state.species, newItem);
									setToast({
										type: "success",
										message: "Targets acquired!",
										duration: 2000
									});
									setState({
										targets: res.data,
										selectedLocation: newItem
									});
								} catch (e) {
									setToast({
										type: "error",
										message: "Oops! Something went wrong while searching for targets."
									});
								}
							}} renderItem={(item, key) => (key !== "start" && key !== "end") ? (
								[<Text desc key={`key-${key}`}>{key}:</Text>," ",<Text key={`value-${key}`}>{item[key]}</Text>]
							) : null} />
						</div>
						{
							!state.targets.length ? null : (
								<div>
									<div className="targets-map">
										<CrisprTargetMap
											targets={state.targets}
											onZoom={async ({ start, end }) => {
												const item = state.selectedLocation;
												item.zoomStart = start;
												item.zoomEnd = end;
												setToast({
													type: "warning",
													message: "Searching for more targets..."
												});
												try {
													const res = await getTargets(state.species, item);
													setToast({
														type: "success",
														message: "Targets acquired!",
														duration: 2000
													});
													setState({
														targets: res.data,
														selectedLocation: item
													});
												} catch (e) {
													if (e.status === 404) {
														setToast({
															type: "error",
															message: "No targets found at this location.",
														});
														return;
													}
													setToast({
														type: "error",
														message: "Oops! Something went wrong while searching for targets.",
													});
												}
											}}
											defaultStart={state.selectedLocation.start}
											defaultEnd={state.selectedLocation.end}
											start={state.selectedLocation.zoomStart}
											end={state.selectedLocation.zoomEnd}
										/>
									</div>
									<div className="targets-table-desc">
										<Text desc>Highest scoring </Text>
										<Text>unique</Text>
										<Text desc> targets:</Text>
									</div>
									<div className="targets-table">
										<Table
											headers={[{
												display: "Sequence",
												key: "seq"
											}, {
												display: "Strand",
												key: "strand"
											}, {
												display: "Position",
												key: "index"
											}, {
												display: "Score",
												key: "score"
											}]}
											items={state.targets.filter(tar =>
												tar.index >= state.selectedLocation.zoomStart &&
												tar.index <= state.selectedLocation.zoomEnd
											)}
											weights={[7, 1, 3, 3]}
											renderRowItem={(header, item) => {
												const tableRowMap = {
													seq: () => {
														const seq = item.seq;
														const preffix = seq.substring(0, 3);
														const target = seq.substring(3, 23);
														const pam = seq.substring(23, 26);
														const suffix = seq.substring(26, 30);
														return (
															<Link href={
																`/target?seq=${target}&strand=${item.strand}&species=${state.species}`
															}>
																<a className="table-link" target="_blank" rel="noopener noreferrer">
																	<Text desc>{preffix}</Text>
																	<Text>{target}</Text>
																	<Text warning>{pam}</Text>
																	<Text desc>{suffix} </Text>
																	<span className="new-tab-icon">&#8599;</span>
																</a>
															</Link>
														);
													},
													index: () => <Text>{format(item.index)}</Text>,
													score: () => <Text color={lerpColor("#EE6868", "#49E500", item.score)}>{item.score.toFixed(2)}</Text>,
													strand: () => <Text>{item.strand === "forward" ? "+" : "-"}</Text>
												};
												return tableRowMap[header]();
											}} />
									</div>
								</div>
							)
						}
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

.search-inputs, .targets-map {
	box-sizing: border-box;
	padding: 0 60px 0 60px;
}

.location-list {
	box-sizing: border-box;
	padding: 0 60px 20px 60px;
}

.targets-table-desc {
	box-sizing: border-box;
	padding: 20px 60px 5px 65px;
}

.targets-table {
	box-sizing: border-box;
	padding: 0 60px 20px 60px;
}

.new-tab-icon {
	opacity: 0;
	font-family: BlinkMacSystemFont;
	font-size: 12px;
}

.table-link {
	text-decoration: none;
	color: inherit;
}

.table-link:hover {
	text-decoration: underline;
}

.table-link:hover .new-tab-icon {
	display: inline;
	opacity: 1;
}

`;

export default Demo;
