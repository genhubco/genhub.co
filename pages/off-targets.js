import React from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import css from "styled-jsx/css";

import Page from "../components/Page";
import Text from "../components/Text";
import Table from "../components/Table";
import Alert from "../components/Alert";
import ExternalLink from "../components/ExternalLink";

const format = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const groupElements = (seq1, seq2) => {
	const arr = [];
	let range = [];
	const changes = seq1.split("").map((letter, i) => letter === seq2[i]);
	changes.forEach((current, i) => {
		const isChange = current != changes[i - 1];
		if (!isChange) {
			return;
		}

		range.push(i);
		if (range.length === 2) {
			arr.push({
				val: changes[i - 1],
				range
			});
			range = [i];
		}
	});

	if (range.length) {
		range.push(seq1.length);
		arr.push({
			val: changes[changes.length - 1],
			range
		});
	}
	return arr;
};

const OffTargets = ({ status = 0, data = {}, species = "", seq = "", strand = "" }) => {
	if (status) {
		return <Error statusCode={status} />;
	}
	return (
		<Page title={"Off-targets - GenHub"}>
			<div className="beta-alert-container">
				<Alert><Text>The app is currently in beta! Give us <ExternalLink to="https://forms.gle/MmTHWiy4zzsv5s8N9">
					feedback
				</ExternalLink>.</Text></Alert>
			</div>
			<div className="off-targets-header">
				<Text desc>Off-targets for: </Text>
				<Text warning>{seq.substring(0, 3)}</Text>
				<Text>{seq.substring(3)}</Text>
				<Text desc> - Species: </Text><Text>{species} </Text>
				<Text desc> - Strand: </Text><Text>{strand}</Text>
			</div>
			<div className="off-targets-count">
				<Text desc>Count: </Text><Text>{data.count.join(" - ")}</Text>
			</div>
			<div className="off-targets-table">
				<Table headers={[{
					key: "sequence",
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
				}]} weights={[3, 1, 1, 1]} items={data.offTargets} renderRowItem={(header, item) => {
					const tableRowMap = {
						sequence: (offTargetSeq) => {
							const preffix = offTargetSeq.substring(0, 2);

							const pam = offTargetSeq.substring(2, 5);
							const targetPam = seq.substring(0, 3);
							const pamGroups = groupElements(pam, targetPam);

							const offTarget = offTargetSeq.substring(5, 25);
							const target = seq.substring(3, 23);
							const targetGroups = groupElements(offTarget, target);

							const suffix = offTargetSeq.substring(25, 30);
							return (
								<div className="table-sequence">
									<Text desc>{preffix}</Text>
									{pamGroups.map(({ val, range }, i) =>
										val ?
											<Text key={`key-${i}`} warning>{pam.substring(range[0], range[1])}</Text> :
											<Text key={`key-${i}`} warning outlineError>{pam.substring(range[0], range[1])}</Text>
									)}
									{targetGroups.map(({ val, range }, i) =>
										val ?
											<Text key={`key-${i}`}>{offTarget.substring(range[0], range[1])}</Text> :
											<Text key={`key-${i}`} outlineError>{offTarget.substring(range[0], range[1])}</Text>
									)}
									<Text desc>{suffix}</Text>
								</div>
							);
						},
						index: (idx) => <Text>{format(idx)}</Text>,
						chr: (c) => <Text>{c}</Text>,
						score: (score) => <Text>{score.toFixed(2)}</Text>
					};
					return tableRowMap[header](item);
				}}/>
			</div>
			<style jsx>{styles}</style>
		</Page>
	);
};

OffTargets.getInitialProps = async ({ query }) => {
	const { species, seq, strand } = query;
	const res = await fetch(`${process.env.FUNCTIONS}/${species}-off-targets-${strand === "1" ? "forward" : "backward"}?seq=${seq}`);
	if (!res.ok) {
		return { status: res.status };
	}
	const data = await res.json();

	const slices = data.offTargets.map(item => ({
		chr: item.chr,
		species,
		range: [item.index - 2, item.index + 28]
	}));

	const res2 = await fetch(`${process.env.FUNCTIONS}/genome-slice`, {
		method: "POST",
		body: JSON.stringify(slices)
	});

	if (!res2.ok) {
		return { status: res2.status };
	}
	const seqs = await res2.json();

	data.offTargets = data.offTargets.map((item, i) => ({
		sequence: seqs[i],
		...item
	}));

	return {
		data,
		species,
		seq,
		strand
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

.off-targets-table {
	box-sizing: border-box;
	padding: 0 60px 20px 60px;
}
`;

export default OffTargets;