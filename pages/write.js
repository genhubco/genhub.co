import React from "react";
import css from "styled-jsx/css";
import Editor, {
  keyMap,
  lifeCycleMap,
  renderEmergence,
  renderErrors,
} from "granit";
import { saveAs, encodeBase64 } from "@progress/kendo-file-saver";
import mixpaned from "mixpanel-browser";

import FullScreenPage from "../components/FullScreenPage";
import InternalLink from "../components/InternalLink";
import WithState from "../components/WithState";
import Text from "../components/Text";
import Simulation from "../components/Simulation";

import { Cds, Promoter, Rbs, Ribozyme, Terminator } from "../components/Parts";
import { compile } from "../utils";

mixpaned.init(process.env.MIXPANEL_TOKEN);
function emit(name, data) {
  // mixpaned.track(name, data);
}

const defaultValue = `
func main(a, in1, in2) {
	let nega = not(a);
	let out1 = nor(a, in1);
	let out2 = nor(nega, in2);
	let o = nor(out1, out2);
	out o;
}

test main(TetR, LacI, AraC) {
	@300
	TetR = true;
	LacI = false;
	AraC = true;
	@600
	TetR = false;
	LacI = false;
	AraC = true;
}
`;

const Results = ({ gc, simulation, steady_states }) => {
  const promoterColors = {};
  const promoterGenes = {};
  gc.genes.forEach((item) => {
    promoterGenes[item.promoter] = item.name.split("_")[1];
    promoterColors[item.promoter] = item.color;
  });
  gc.inputs.forEach((item) => {
    promoterGenes[item.promoter] = item.name;
  });
  return (
    <div className="results">
      <div className="results-body">
        <div className="genetic-circuit-header">
          <Text desc>Assigned gates</Text>
        </div>
        <div className="genetic-circuit-gates">
          <Text desc small>
            Gates:
          </Text>
          <div>
            {gc.genes.map((item) => {
              const inputs = item.inputs.map((input) => (
                <Promoter
                  key={`${item.name}-${input}`}
                  color={promoterColors[input]}
                  name={input}
                />
              ));
              const ribo = <Ribozyme key="ribo" />;
              const rbs = <Rbs key="rbs" color={item.color} />;
              const cds = (
                <Cds
                  key="cds"
                  color={item.color}
                  name={item.name.split("_")[1]}
                />
              );
              const term = <Terminator key="term" />;
              const allParts = [...inputs, ribo, rbs, cds, term];
              return (
                <div key={item.name} className="genetic-circuit-gate">
                  {allParts}
                </div>
              );
            })}
          </div>
        </div>
        <div className="genetic-circuit-header">
          <Text desc>Output RPUs</Text>
        </div>
        <div className="genetic-circuit-prediction">
          <Text desc small>
            Circuit score:{" "}
          </Text>
          <Text small>{gc.score.toFixed(2)}</Text>
          <div>
            <Text desc small>
              Inputs:{" "}
            </Text>
            <Text small>{gc.inputs.map((item) => item.name).join(", ")}</Text>
          </div>
          <div>
            <Text desc small>
              Outputs:{" "}
            </Text>
            <Text small>{gc.output.split("_")[1]}</Text>
          </div>
        </div>
        <WithState
          initialState={{
            selected: 200,
          }}
          render={({ state, setState }) => {
            const inputs = gc.inputs.map((inp, i) => [
              <div key={`${inp.promoter}-${i}`} className="simulation-info">
                <Text small>
                  {inp.name} ={" "}
                  {simulation[inp.promoter][state.selected].toFixed(2)}
                </Text>
                <Text small>Time = {state.selected}</Text>
              </div>,
              <Simulation
                limits={steady_states[inp.promoter]}
                key={`${inp.promoter}-${i}-sim`}
                values={simulation[inp.promoter]}
                selected={state.selected}
                setSelected={(sel) => setState({ selected: sel })}
              />,
              <div
                key={`${inp.promoter}-${i}-texts`}
                className="simulation-time"
              >
                <Text small desc>
                  0 min
                </Text>
                <Text small desc>
                  500 min
                </Text>
                <Text small desc>
                  1000 min
                </Text>
              </div>,
            ]);
            const genes = gc.genes.map((gene, i) => [
              <div key={`${gene.promoter}-${i}`} className="simulation-info">
                <Text small>
                  {gene.name.split("_")[1]} ={" "}
                  {simulation[gene.promoter][state.selected].toFixed(2)}
                </Text>
                <Text small>Time = {state.selected}</Text>
              </div>,
              <Simulation
                limits={steady_states[gene.promoter]}
                key={`${gene.promoter}-${i}-sim`}
                color={gene.color}
                values={simulation[gene.promoter]}
                selected={state.selected}
                setSelected={(sel) => setState({ selected: sel })}
              />,
              <div
                key={`${gene.promoter}-${i}-texts`}
                className="simulation-time"
              >
                <Text small desc>
                  0 min
                </Text>
                <Text small desc>
                  500 min
                </Text>
                <Text small desc>
                  1000 min
                </Text>
              </div>,
            ]);
            return [...inputs, ...genes].flat();
          }}
        />
      </div>
      <div className="results-footer">
        <button
          onClick={() => {
            const dataURI = "data:text/plain;base64," + encodeBase64(gc.dna);
            saveAs(dataURI, "gates-dna.txt");
          }}
          className="genetic-circuit-dna-download"
        >
          DNA &#10515;
        </button>
        <button
          onClick={() => {
            const dataURI =
              "data:text/plain;base64," + encodeBase64(gc.plasmid);
            saveAs(dataURI, "gates-plasmid.gb");
          }}
          className="genetic-circuit-dna-download"
        >
          Plasmid &#10515;
        </button>
      </div>
      <style jsx>{resultsStyles}</style>
    </div>
  );
};

const resultsStyles = css`
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

  .simulation-info {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .simulation-time {
    display: flex;
    justify-content: space-between;
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

const EditorComponent = ({ onData = () => {} }) => {
  return (
    <WithState
      initialState={{
        loading: false,
        error: {},
      }}
      initialData={{
        code: defaultValue,
      }}
      render={({ state, setState, getData, setData }) => {
        let { error } = state;
        let errors = [];
        if (error.kind) {
          errors.push(error);
        }
        return (
          <div className="editor">
            <div className="editor-header">
              <Text small desc>
                main.em
              </Text>
            </div>
            <div className="editor-body">
              <Editor
                background="#f2f3f4"
                initialValue={defaultValue}
                keyMap={keyMap}
                lifeCycleMap={lifeCycleMap}
                renderHighlight={renderEmergence}
                renderErrors={(text) => renderErrors(text, errors, [])}
                onChange={(text) => {
                  setData({ code: text });
                }}
                onSave={async (text) => {
                  setState({ loading: true });
                  setData({ code: text });
                  let data = await compile(text);
                  if (data.error) {
                    setState({ error: data, loading: false });
                  } else {
                    setState({ error: {}, loading: false });
                    onData(data);
                  }
                }}
              />
            </div>
            <div className="editor-footer">
              <button
                className="run"
                onClick={async () => {
                  setState({ loading: true });
                  let data = await compile(getData().code);
                  if (data.error) {
                    setState({ error: data, loading: false });
                  } else {
                    setState({ error: {}, loading: false });
                    onData(data);
                  }
                }}
              >
                <Text info>{"› Run"}</Text>
              </button>
              <div className="status">
                <Text
                  small
                  error={error.kind && !state.loading}
                  success={!error.kind && !state.loading}
                  info={state.loading}
                >
                  {(() => {
                    if (error.kind && !state.loading) {
                      return `● ${error.message}`;
                    }

                    if (!error.kind && !state.loading) {
                      return "● Compiled successfully!";
                    }

                    if (state.loading) {
                      return "● Compiling...";
                    }
                  })()}
                </Text>
              </div>
            </div>
            <style jsx>{editorStyles}</style>
          </div>
        );
      }}
    />
  );
};

const editorStyles = css`
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
`;

const Write = () => (
  <FullScreenPage title={"Write - GenHub"}>
    <WithState
      onStart={() => emit("page", { path: "/write" })}
      initialState={{
        gc: { genes: [], inputs: [], score: 0.0, output: "" },
        simulation: [],
        gates_dna: "",
        out_dna: "",
        score: 0,
        gates_plasmid: "",
        out_plasmid: "",
      }}
      render={({ setState, state }) => {
        const { gc, simulation, steady_states } = state;
        return (
          <div className="workspace">
            <div className="header">
              <InternalLink to="/">
                <img className="header-logo" src="/mini-applogo.svg" />
              </InternalLink>
            </div>
            <div className="body">
              <EditorComponent onData={(data) => setState(data)} />
              <Results
                gc={gc}
                simulation={simulation}
                steady_states={steady_states}
              />
            </div>
          </div>
        );
      }}
    />
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
    height: calc(100vh - 39px);
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0 0 10px;
    box-sizing: border-box;
  }
`;

export default Write;
