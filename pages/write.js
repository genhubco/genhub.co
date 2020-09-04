import React from "react";
import css from "styled-jsx/css";
import Editor, { keyMap, lifeCycleMap, renderEmergence, renderErrors } from "granit";
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import mixpaned from "mixpanel-browser";

import FullScreenPage from "../components/FullScreenPage";
import InternalLink from "../components/InternalLink";
import WithState from "../components/WithState";
import Text from "../components/Text";
import { map, lerpColor } from "../utils";

import { Cds, Promoter, Rbs, Ribozyme, Terminator } from "../components/Parts";

mixpaned.init(process.env.MIXPANEL_TOKEN);
function emit(name, data) {
	mixpaned.track(name, data);
}

const defaultValue = `fn not a -> b {
	b = ~a;
}

fn nor(a, b) -> c {
	c = a ~| b;
}

gene main (TetR, LacI, AraC) -> RFP {
	let ntl = nor(TetR, LacI);
	let nl = not(LacI);
	let nla = nor(nl, AraC);
	RFP = nor(nla, ntl);
}`;

const Write = () => (
	<FullScreenPage title={"Write - GenHub"}>
		<WithState
			onStart={() => emit("page", { path: "/write" })}
			initialState={{
				loading: false,
			}} initialData={{
				code: "",
				errors: [],
				warnings: [],
				gc: { genes: [], inputs: [] },
				simulation: [],
				gates_dna: "",
				out_dna: "",
				score: 0,
				gates_plasmid: "",
				out_plasmid: ""
			}} render={({ setState, setData, getData, state }) => {
				const compile = async (text) => {
					setState({ loading: true });
					try {
						const res = await fetch("https://emergence-9z5lh68ok.vercel.app/api/compile.rs", {
							method: "POST",
							headers: {
								"Content-Type": "text/plain"
							},
							body: text
						});

						if (res.status === 500) {
							const errors = [{
								message: "Oops, something went wrong!",
								pos: [0, 0],
								kind: "ServerError"
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
							message: "Oops, something went wrong!",
							pos: [0, 0],
							kind: "ServerError"
						}];
						setData({ errors });
					}
					setState({ loading: false });
				}

				const { warnings, score, gc, simulation, gates_dna, out_dna, gates_plasmid, out_plasmid, errors } = getData();
				let simMax = Math.max(...simulation.map(item => item[2]));
				const promoterColors = {};
				gc.genes.forEach((item, i) => {
					promoterColors[item.promoter] = item.color;
				});
				return (
					<div className="workspace">
						<div className="header">
							<InternalLink to="/">
								<img className="header-logo" src="/mini-applogo.svg" />
							</InternalLink>
						</div>
						<div className="body">
							<div className="editor">
								<div className="editor-header">
									<Text small desc>main.em</Text>
								</div>
								<div className="editor-body">
									<Editor
										background="#f2f3f4"
										initialValue={defaultValue}
										keyMap={keyMap}
										lifeCycleMap={lifeCycleMap}
										renderHighlight={renderEmergence}
										renderErrors={(text) => renderErrors(text, errors, warnings)}
										onChange={text => {
											setData({ code: text });
										}}
										onSave={(text) => {
											setData({ code: text });
											compile(text);
										}}
									/>
								</div>
								<div className="editor-footer">
									<button className="run" onClick={() => compile(getData().code)}>
										<Text info>{"› Run"}</Text>
									</button>
									<div className="status">
										<Text
											small
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
									</div>
								</div>
							</div>
							<div className="results">
								<div className="results-body">
									<div className="genetic-circuit-header">
										<Text desc>Assigned gates</Text>
									</div>
									<div className="genetic-circuit-gates">
										<Text desc small>Gates:</Text>
										<div>
											{gc.genes.map(item => {
												const inputs = item.inputs.map(input => <Promoter key={`${item.name}-${input}`} color={promoterColors[input]} name={input} />);
												const ribo = <Ribozyme key="ribo" />;
												const rbs = <Rbs key="rbs" color={item.color} />;
												const cds = <Cds key="cds" color={item.color} name={item.name.split("_")[1]} />;
												const term = <Terminator key="term" />;
												const allParts = [...inputs, ribo, rbs, cds, term];
												return (<div key={item.name} className="genetic-circuit-gate">{allParts}</div>);
											})}
										</div>
										<Text desc small>Output:</Text>
										<div key="out">{(() => {
											if (!gc.output) {
												return;
											}
											const inputs = gc.output.inputs.map(input => <Promoter key={`out-${input}`} name={input} color={promoterColors[input]} />);
											const allParts = [...inputs, <Ribozyme key="ribo" />, <Rbs key="rbs" />, <Cds key="cds" name={gc.output.name} />, <Terminator key="term" />];
											return allParts;
										})()}</div>
									</div>
									<div className="genetic-circuit-header">
										<Text desc>Output RPUs</Text>
									</div>
									<div className="genetic-circuit-prediction">
										<Text desc small>Minimum gate score: </Text><Text small>{score.toFixed(2)}</Text>
										<div className="genetic-circuit-prediction-inputs">
											<Text desc small>Inputs: </Text><Text small>{gc.inputs.join(", ")}</Text>
										</div>
										<div className="genetic-circuit-prediction-table">
											{simulation.map(item => (
												<div key={item[0]} className="genetic-circuit-rpu">
													<div className="rpu-label">
														<Text small>{item[0]}</Text>
													</div>
													<div>
														<div className="bar" style={{
															borderRadius: "0 5px 5px 0",
															height: "30px",
															width: `${map(item[2], 0, simMax, 0, 360)}px`,
															background: lerpColor("#00000", "#ebebeb", map(item[2], 0, simMax, 1, 0))
														}} />
														<Text desc small>{item[2].toFixed(2)}</Text>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
								<div className="results-footer">
									<button onClick={() => {
										const dataURI = "data:text/plain;base64," + encodeBase64(gates_dna);
										saveAs(dataURI, "gates-dna.txt");
									}} className="genetic-circuit-dna-download">Gates DNA &#10515;</button>
									<button onClick={() => {
										const dataURI = "data:text/plain;base64," + encodeBase64(out_dna);
										saveAs(dataURI, "out-dna.txt");
									}} className="genetic-circuit-dna-download">Output DNA &#10515;</button>
									<button onClick={() => {
										const dataURI = "data:text/plain;base64," + encodeBase64(gates_plasmid);
										saveAs(dataURI, "gates-plasmid.gb");
									}} className="genetic-circuit-dna-download">Gates Plasmid &#10515;</button>
									<button onClick={() => {
										const dataURI = "data:text/plain;base64," + encodeBase64(out_plasmid);
										saveAs(dataURI, "out-plasmid.gb");
									}} className="genetic-circuit-dna-download">Output Plasmid &#10515;</button>
								</div>
							</div>
						</div>
					</div>
				)
			}} />
		<style jsx>{styles}</style>
	</FullScreenPage>
);

const styles = css`
.workspace {
	height: 100vh;
}

.header {
	display: flex;
	padding: 5px;
	border-bottom: 1px solid #e7e9eb;
	box-sizing: border-box;
}

.header-logo {
	height: 20px;
	display: block;
}

.body {
	height: calc(100vh - 51px);
	display: flex;
	flex-wrap: wrap;
	padding: 10px 0 0 10px;
	box-sizing: border-box;
}

.editor {
	flex: 1;
	height: 100%;
	min-width: 480px;
	padding-right: 10px;
	padding-bottom: 10px;
	box-sizing: border-box;
}

.editor-header {
	padding: 10px 20px;
	background: #f2f3f4;
	border-radius: 10px 10px 0 0;
}

.editor-body {
	height: calc(100% - 82px);
}

.editor-footer {
	border-radius: 0 0 10px 10px;
	border: 1px solid #e7e9eb;
	box-sizing: border-box;
}

.run {
	background: transparent;
	border: none;
	padding: 0 20px;
	width: 85px;
	box-sizing: border-box;
	height: 100%;
	height: 40px;
	border-radius: 0 0 0 10px;
	border-right: 1px solid #e7e9eb;
}

.run:hover {
	cursor: pointer;
	background: #f0f8ff;
}

.status {
	padding: 10px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	display: inline-block;
	vertical-align: top;
}

.results {
	min-width: 480px;
	flex: 1;
	box-sizing: border-box;
	height: 100%;
	padding: 0 10px 10px 0;
}

.results-body {
	overflow: scroll;
	border-top: 1px solid #e7e9eb;
	border-left: 1px solid #e7e9eb;
	border-right: 1px solid #e7e9eb;
	border-radius: 10px 10px 0 0;
	box-sizing: border-box;
	height: calc(100% - 42px);
}

.results-footer {
	border-radius: 0 0 10px 10px;
	border: 1px solid #e7e9eb;
	box-sizing: border-box;
}

.genetic-circuit-gate {
	display: inline-block;
}

.genetic-circuit-header {
	padding: 30px 20px 10px 20px;
	border-bottom: 1px solid #e7e9eb;
}

.genetic-circuit-gates {
	padding: 20px 20px 0 20px;
}

.genetic-circuit-prediction {
	padding: 20px;
}

.genetic-circuit-prediction-table {
	border: 1px solid #e7e9eb;
	border-radius: 10px;
}

.genetic-circuit-prediction-inputs {
	padding-bottom: 10px;
}

.genetic-circuit-rpu {
	padding: 10px 0;
}

.bar {
	display: inline-block;
	vertical-align: middle;
	margin-right: 10px;
}

.rpu-label {
	padding: 0 0 5px 10px;
}

.genetic-circuit-dna-download {
	height: 40px;
	min-width: 80px;
	font-size: 14px;
	padding: 0 10px;
	background-color: transparent;
	vertical-align: bottom;
	font-family: "PT Sans", sans-serif;
	box-sizing: border-box;
	cursor: pointer;
	border: none;
	display: inline-block;
	border-radius: 10px;
}

.genetic-circuit-dna-download:hover {
	text-decoration: underline;
}
`;

export default Write;