import React from "react";
import css from "styled-jsx/css";
import Editor, { keyMap, lifeCycleMap, renderEmergence, renderErrors } from "granit";
import hash from "object-hash";
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';

import Page from "../components/Page";
import WithState from "../components/WithState";
import Alert from "../components/Alert";
import Text from "../components/Text";
import Button from "../components/Button";
import { hslToHex, map } from "../utils";

import { Cds, Promoter, Rbs, Ribozyme, Terminator } from "../components/Parts";

const defaultValue = `fn not a -> b {
	b = ~a;
}

fn nor(a, b) -> c {
	c = a ~| b;
}

gene main (TetR, LacI, AraC) -> RFP {
	let tl = nor(TetR, LacI);
	let notl = not(LacI);
	let nla = nor(notl, AraC);
	RFP = nor(tl, nla);
}`;

const Write = () => (
	<Page title={"Write - GenHub"} onLoad={({ emit }) => emit("page", {
		path: "/write"
	})}>
		<div className="beta-alert-container">
			<Alert warning><Text>The app is made for demonstration purposes! Do not use it in production.</Text></Alert>
		</div>
		<div className="editor-container">
			<WithState initialState={{
				contentHash: "",
				savedHash: "",
				loading: false,
			}} initialData={{
				errors: [],
				warnings: [],
				gates: {},
				output: {},
				parts: {},
			}} render={({ setState, setData, getData, state }) => {
				const compile = async (text) => {
					setState({ loading: true });
					try {
						const res = await fetch("https://emergence-on8vsuyr2.now.sh/api/compile.rs", {
							method: "POST",
							headers: {
								"Content-Type": "text/plain"
							},
							body: text
						});

						if (res.status === 500) {
							const errors = [{
								message: "Oops, something went wrong while compiling the code.",
								pos: [0, 0]
							}];
							setData({ errors });
						} else if (res.status === 400) {
							const error = await res.json();
							const errors = [error];
							setData({ errors });
						} else {
							const data = await res.json();
							setData({ ...data, errors: [] });
						}
					} catch (e) {
						const errors = [{
							message: "Oops, something went wrong while compiling the code.",
							pos: [0, 0]
						}];
						setData({ errors });
					}
					setState({ loading: false });
				}

				const { errors, warnings, gates, parts, output } = getData();
				const gatesEntries = Object.entries(gates);
				const promoterColors = {};
				gatesEntries.forEach((item, i) => {
					const color = hslToHex(map(i, 0, gatesEntries.length, 0, 359), 100, 70);
					promoterColors[item[1].promoter] = color;
				});
				return (
					<>
						<div className="editor-header">
							<Text desc>main.em</Text>
							{state.savedHash !== state.contentHash ? <Text info>●</Text> : null}
						</div>
						<div className="editor-body">
							<Editor
								width={730}
								height={400}
								initialValue={defaultValue}
								keyMap={keyMap}
								lifeCycleMap={lifeCycleMap}
								renderHighlight={renderEmergence}
								renderErrors={(text) => renderErrors(text, errors, warnings)}
								onChange={text => setState({ contentHash: hash(text) })}
								onSave={(text) => {
									setState({ savedHash: hash(text) });
									compile(text);
								}}
							/>
						</div>
						<div className="editor-footer">
							<Text
								error={errors.length && !state.loading}
								success={!errors.length && !state.loading}
								info={state.loading}
							>{(() => {
								if (errors.length && !state.loading) {
									return `● ${errors[0].kind}: ${errors[0].message}`
								}

								if (!errors.length && !state.loading) {
									return "● Compiled successfully!"
								}

								if (state.loading) {
									return "● Compiling...";
								}
							})()}</Text>
							<Text desc>press (⌘ + s) or (ctrl + s) to save</Text>
						</div>
						{gatesEntries.length ? <>
							<div className="genetic-circut-desc">
								<Text desc>Assigned gates:</Text>
							</div>
							<div className="genetic-circut-gates">
								{[...gatesEntries.map((item, i) => {
									const color = promoterColors[item[1].promoter];
									const ps = item[1].parts.map(it => parts[it]);
									const partMap = {
										Cds: <Cds key="cds" color={color} name={item[0].split("_")[1]} />,
										Rbs: <Rbs key="rbs" color={color} />,
										Ribozyme: <Ribozyme key="ribo" />,
										Terminator: <Terminator key="term" />,
									};

									const otherParts = ps.map(it => partMap[it.kind]);
									const inputs = item[1].inputs.map(input => <Promoter key={`${item[1].name}-${input}`} color={promoterColors[input]} name={input} />);
									const allParts = [...inputs, ...otherParts];
									return (<div key={item[0]} className="genetic-circut-gate">{allParts}</div>);
								}), <div key="out" className="genetic-circut-gate">{(() => {
									if (!output.inputs) {
										return;
									}
									const inputs = output.inputs.map(input => <Promoter key={`out-${input}`} name={input} color={promoterColors[input]} />);
									const allParts = [...inputs, <Ribozyme key="ribo" />, <Rbs key="rbs" />, <Cds key="cds" name={output.name} />, <Terminator key="term" />];
									return allParts;
								})()}</div>]}
							</div>
							<Button onClick={() => {
								let dna = gatesEntries.map(item => {
									const inputsSeq = item[1].inputs.map(pro => parts[pro].seq).join("");
									const partsSeq = item[1].parts.map(part => parts[part].seq).join("");
									return inputsSeq + partsSeq;
								}).join("");
								dna += output.inputs.map(pro => parts[pro].seq).join("") + output.seq;
								const dataURI = "data:text/plain;base64," + encodeBase64(dna);
								saveAs(dataURI, "main-dna.txt");
							}} secondary medium className="genetic-circut-dna-download">
								Download DNA
							</Button>
						</> : null}
					</>
				)
			}} />

		</div>
		<style jsx>{styles}</style>
	</Page>
);

const styles = css`
.beta-alert-container {
	box-sizing: border-box;
	padding: 50px 60px 30px 60px;
}

.editor-container {
	box-sizing: border-box;
	padding: 0 60px 30px 60px;
}

.editor-header {
	display: flex;
	justify-content: space-between;
	padding: 10px 12px;
	border-radius: 5px 5px 0 0;
	background: #f2f3f4;
}

.editor-footer {
	display: flex;
	justify-content: space-between;
	border-radius: 0 0 5px 5px;
	background: #f2f3f4;
	padding: 10px 12px;
}

.genetic-circut-gates {
	flex-wrap: wrap;
	display: flex;
}

.genetic-circut-gate {
	display: flex;
}

.genetic-circut-desc {
	box-sizing: border-box;
	padding: 30px 0 10px 0;
}
`;

export default Write;