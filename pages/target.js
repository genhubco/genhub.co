import React from "react";
import Error from "next/error";
import css from "styled-jsx/css";

import Page from "../components/Page";
import WithState from "../components/WithState";
import Text from "../components/Text";
import Table from "../components/Table";
import Alert from "../components/Alert";
import ExternalLink from "../components/ExternalLink";
import { getOffRanges, format, getClosestCenters } from "../utils";
import { getOffTargets } from "../utils/api-calls";

const availableSpecies = {
	"homo_sapiens": "homo_sapiens (Human)"
};

const strands = {
	"forward": "+ strand",
	"backward": "- strand"
};

const OffTargets = ({ status = 0, species = "", seq = "", strand = null }) => {
	if (status) {
		return <Error statusCode={status} />;
	}
	return (
		<Page title={"Target details - GenHub"} render={(setToast) => (
			<WithState initialState={{
				offs: [],
				loading: false
			}}
			initialData={{
				offs: [],
				limit: 20
			}}
			onStart={async ({ setState, getData, setData }) => {
				setToast({
					type: "warning",
					message: "Searching for off-targets..."
				});
				const { limit } = getData();
				const closestCenters = getClosestCenters(seq, strand);
				let completed = 0;
				let send = 0;

				const reqPromises = [];
				for (let i = 0; i < limit; i++) {
					const center = closestCenters[i];
					send += 1;
					const reqPromise = getOffTargets(center, species, seq, strand).then(res => {
						const newData = getData().offs.concat(res.data);
						newData.sort((a, b) => b.score - a.score);
						let slicedData = newData.slice(0, 20);
						setState({ offs: slicedData });
						setData({ offs: newData });

						completed += 1;
						setToast({
							type: "warning",
							message: `Searching for off-targets…${((completed / send) * 100).toFixed(0)}%`
						});
					}).catch(err => {
						console.log(err);
					});
					reqPromises.push(reqPromise);
				}

				await Promise.all(reqPromises);
				if (completed < send) {
					setToast({
						type: "warning",
						message: "Some data didn't load properly. Please, try again.",
					});
				} else if (completed >= send) {
					setToast({
						type: "success",
						message: "Off targets loaded!",
						duration: 2000
					});
				} else if (completed === 0) {
					setToast({
						type: "error",
						message: "Oop! Something went wrong while searching for off-targets.",
					});
				}
			}} render={({ state }) => (
				<>
					<div className="beta-alert-container">
						<Alert><Text>The app is currently in beta! Give us <ExternalLink to="https://forms.gle/MmTHWiy4zzsv5s8N9">
						feedback
						</ExternalLink>.</Text></Alert>
					</div>
					<div className="off-targets-header">
						<div><Text desc>Off-targets for: </Text><Text>{seq}</Text></div>
						<div><Text desc> Species: </Text><Text>{availableSpecies[species]}</Text></div>
						<div><Text desc> Strand: </Text><Text>{strands[strand]}</Text></div>
					</div>
					{
						state.offs &&
						<div className="off-targets-results">
							<div className="off-targets-table-desc">
								<Text desc>All occurrences of the target sequence with up to </Text>
								<Text>3</Text>
								<Text desc> mismatches:</Text>
							</div>
							<div className="off-targets-table">
								<Table headers={[{
									key: "seq",
									display: "Sequence"
								}, {
									key: "index",
									display: "Position"
								}, {
									key: "chr",
									display: "Chromosome"
								}, {
									key: "score",
									display: "Score"
								}]} weights={[2, 1, 1, 1]} items={state.offs} renderRowItem={(header, item) => {
									const tableRowMap = {
										seq: () => {
											const offTarget = item.seq;
											const targetGroups = getOffRanges(offTarget, seq);

											const pam = "NGG";
											return (
												<div className="table-sequence">
													{targetGroups.map(({ val, range }, i) =>
														val ?
															<Text key={`key-${i}`}>{offTarget.substring(range[0], range[1])}</Text> :
															<Text key={`key-${i}`} outlineError>{offTarget.substring(range[0], range[1])}</Text>
													)}
													<Text warning>{pam}</Text>
												</div>
											);
										},
										index: () => <Text>{format(item.index)}</Text>,
										chr: () => <Text>{item.chr}</Text>,
										score: () => <Text>{item.score.toFixed(2)}</Text>
									};
									return tableRowMap[header]();
								}}/>
							</div>
						</div>
					}
					<style jsx>{styles}</style>
				</>
			)} />
		)}/>
	);
};

OffTargets.getInitialProps = ({ query }) => {
	const { seq, strand, species } = query;
	return {
		seq,
		strand,
		species
	};
};

const styles = css`
.beta-alert-container {
	box-sizing: border-box;
	padding: 50px 60px 30px 60px;
}

.off-targets-header {
	box-sizing: border-box;
	padding: 0 65px 10px 65px;
}

.off-targets-count {
	box-sizing: border-box;
	padding: 0 65px 10px 65px;
}

.off-targets-table-desc {
	box-sizing: border-box;
	padding: 0 60px 5px 65px;
}

.off-targets-table {
	box-sizing: border-box;
	padding: 0 60px 20px 60px;
}
`;

export default OffTargets;