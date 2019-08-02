import { decode } from "jsonwebtoken";
import { parseCookies } from "nookies";
import classNames from "classnames";
import Link from "next/link";

import Page from "../components/Page";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import Legend from "../components/Legend";
import Animation from "../components/Animation";

const Index = ({ authUser }) => {
    const cardWidth = 375;
    const offset = cardWidth/2;
    const els = [
        <div className="step">
            <p className="text step-title">1. Enter the configuration</p>
            <div className="mini-editor">
                <span className="comment"># Algorithms available: "cnn", "cfd", "all"</span><br/>
                <span className="string">algo</span> = <span className="string">"all"</span><br/>
                <span className="comment"># Name of the gene you are targeting</span><br/>
                <span className="string">gene</span> = <span className="string">"EMX1"</span><br/>
                <span className="comment"># PAM sequence</span><br/>
                <span className="string">pam</span> = <span className="string">"CGG"</span><br/>
                <span className="comment"># Your guide RNA</span><br/>
                <span className="string">grna</span> = <span className="string">"GAGCGTCGATCG"</span><br/>
                <span className="comment">...</span><br/>
            </div>
            <style jsx>{`
                .step-title {
                    text-align: center;
                    margin-bottom: 5px;
                }

                .mini-editor {
                    padding: 20px;
                    font-size: 16px;
                    font-family: "Source Code Pro", monospace;
                    background: #f2f3f4;
                    border-radius: 5px;
                    width: ${cardWidth}px;
                    box-sizing: border-box;
                    height: 300px;
                }

                .comment {
                    color: #a7afb5;
                }

                .string {
                    color: #78C365;
                }
            `}</style>
        </div>,
        <div className="step">
            <p className="text step-title">2. Get the matches and on-target score</p>
            <div className="mini-table-container">
                <table className="mini-table">
                    <tbody>
                        <tr>
                            <th className="mini-table-first-header">Match</th>
                            <th className="mini-table-header">Position</th>
                            <th className="mini-table-header">CNN</th>
                            <th className="mini-table-header">CFD</th>
                        </tr>
                        <tr>
                            <td className="mini-table-first-column"><span><span style={{ color: "rgb(167, 175, 181)" }}>CGG</span><span style={{ color: "rgb(238, 104, 104)" }}>C</span><span style={{ color: "rgb(238, 104, 104)" }}>G</span>GC<span style={{ color: "rgb(238, 104, 104)" }}>A</span><span style={{ color: "rgb(238, 104, 104)" }}>C</span>CG<span style={{ color: "rgb(238, 104, 104)" }}>G</span>CG</span></td><td className="mini-table-column"><span>7059</span></td><td className="mini-table-column"><span style={{ color: "rgb(129, 225, 154)" }}>0.98</span></td><td className="mini-table-column"><span style={{ color: "rgb(201, 144, 120)" }}>0.33</span></td>
                        </tr>
                        <tr>
                            <td className="mini-table-first-column">
                                <span><span style={{ color: "rgb(167, 175, 181)" }}>CGG</span><span style={{ color: "rgb(238, 104, 104)" }}>C</span><span style={{ color: "rgb(238, 104, 104)" }}>C</span><span style={{ color: "rgb(238, 104, 104)" }}>T</span><span style={{ color: "rgb(238, 104, 104)" }}>G</span>GTCG<span style={{ color: "rgb(238, 104, 104)" }}>G</span><span style={{ color: "rgb(238, 104, 104)" }}>G</span><span style={{ color: "rgb(238, 104, 104)" }}>T</span></span></td><td className="mini-table-column"><span>4780</span></td><td className="mini-table-column"><span style={{ color: "rgb(128, 225, 154)" }}>0.98</span></td><td className="mini-table-column"><span style={{ color: "rgb(202, 143, 120)" }}>0.32</span></td>
                        </tr>
                        <tr>
                            <td className="mini-table-first-column"><span><span style={{ color: "rgb(167, 175, 181)" }}>CGG</span><span style={{ color: "rgb(238, 104, 104)" }}>C</span><span style={{ color: "rgb(238, 104, 104)" }}>C</span><span style={{ color: "rgb(238, 104, 104)" }}>C</span>C<span style={{ color: "rgb(238, 104, 104)" }}>T</span>TCG<span style={{ color: "rgb(238, 104, 104)" }}>C</span><span style={{ color: "rgb(238, 104, 104)" }}>A</span><span style={{ color: "rgb(238, 104, 104)" }}>C</span></span></td><td className="mini-table-column"><span>13394</span></td><td className="mini-table-column"><span style={{ color: "rgb(128, 225, 154)" }}>0.98</span></td><td className="mini-table-column"><span style={{ color: "rgb(202, 143, 120)" }}>0.32</span></td>
                        </tr>
                        <tr>
                            <td className="mini-table-first-column"><span><span style={{ color: "rgb(167, 175, 181)" }}>CGG</span><span style={{ color: "rgb(238, 104, 104)" }}>C</span><span style={{ color: "rgb(238, 104, 104)" }}>G</span>GCG<span style={{ color: "rgb(238, 104, 104)" }}>C</span>C<span style={{ color: "rgb(238, 104, 104)" }}>A</span><span style={{ color: "rgb(238, 104, 104)" }}>G</span><span style={{ color: "rgb(238, 104, 104)" }}>G</span><span style={{ color: "rgb(238, 104, 104)" }}>A</span></span></td><td className="mini-table-column"><span>6935</span></td><td className="mini-table-column"><span style={{ color: "rgb(128, 225, 154)" }}>0.98</span></td><td className="mini-table-column"><span style={{ color: "rgb(205, 140, 118)" }}>0.29</span></td>
                        </tr>
                        <tr><td className="mini-table-first-column"><p className="text">...</p></td></tr>
                    </tbody>
                </table>
            </div>
            <style jsx>{`
                .step-title {
                    text-align: center;
                    margin-bottom: 5px;
                }

                .mini-table-container {
                    background: white;
                    width: ${cardWidth}px;
                    height: 300px;
                    border-radius: 5px;
                    box-sizing: border-box;
                    padding: 10px;
                    border: 1px solid #f2f3f4;
                }

                .mini-table {
                    font-family: "PT Sans", sans-serif;
                    width: 330px;
                }

                .mini-table-first-header {
                    font-weight: 200;
                    padding: 4px;
                    color: #a7afb5;
                    text-align: left;
                }

                .mini-table-header {
                    font-weight: 200;
                    padding: 4px;
                    color: #a7afb5;
                    text-align: center;
                }

                .mini-table-first-column {
                    text-align: left;
                    padding: 4px;
                }

                .mini-table-column {
                    text-align: center;
                    padding: 4px;
                }
            `}</style>
        </div>,
        <div className="step">
            <p className="text step-title">3. Get the images from the lab</p>
            <img className="result-image" src="/static/culture.png" />
            <style jsx>{`
                .step-title {
                    text-align: center;
                    margin-bottom: 5px;
                }

                .result-image {
                    width: ${cardWidth}px;
                    box-sizing: border-box;
                    height: 300px;
                    border-radius: 5px;
                    vertical-align: bottom;
                }
            `}</style>
        </div>,
        <div className="step">
            <p className="text step-title">4. Leave some comments</p>
            <div className="textarea-preview">
                <p className="text">Incubation time: 4h.</p>
                <br/>
                <p className="text">Number of cells: 200</p>
                <ProgressBar width={200} progress={0.75} /><span className="text"> - Success rate: 75%</span><br/>
                <Legend color="#EE6868" /><span className="text"> - Activated cells</span><br/>
                <br/>
                <p className="text">Conclusion: Experiment successful</p>
                <p className="text">...</p>
            </div>
            <style jsx>{`
                .step-title {
                    text-align: center;
                    margin-bottom: 5px;
                }

                .textarea-preview {
                    background: white;
                    width: ${cardWidth}px;
                    box-sizing: border-box;
                    height: 300px;
                    border-radius: 5px;
                    border: 1px solid #f2f3f4;
                    padding: 20px;
                }
            `}</style>
        </div>
    ]
    return (
        <Page className="page-full-screen" contentClassName="content-medium-center" header={<Header user={authUser}/>}>
            <div>
                <h2 className="title landing-title">Genetic engineering in 4 steps:</h2>
                <Animation
                    initialState={{ y: 7, scale1: 0.7, scale2: 0.3, scale3: 0.6, scale4: 0.99, x1: -51, x2: 169.4, x3: 426, x4: 205 }}
                    onFrame={async ({ state, map, lerp, flatsqsin, start, sleep }) => {
                        const interval = 4000;
                        const relativeTime = Date.now() - start;
                        const now = relativeTime + interval;
                        const r1 = flatsqsin((now / interval), 11, 0, 0.01);
                        const r2 = flatsqsin((now / interval), 11, Math.PI / 2, 0.01);
                        const x1 = map(r1, 1, -1, -60, 750 - cardWidth + 60);
                        const scale1 = map(r2, -1, 1, 0.3, 1);

                        const r3 = flatsqsin((now / interval), 11, Math.PI / 2, 0.01);
                        const r4 = flatsqsin((now / interval), 11, Math.PI, 0.01);
                        const x2 = map(r3, 1, -1, -60, 750 - cardWidth + 60);
                        const scale2 = map(r4, -1, 1, 0.3, 1);

                        const r5 = flatsqsin((now / interval), 11, Math.PI, 0.01);
                        const r6 = flatsqsin((now / interval), 11, Math.PI + Math.PI / 2, 0.01);
                        const x3 = map(r5, 1, -1, -60, 750 - cardWidth + 60);
                        const scale3 = map(r6, -1, 1, 0.3, 1);

                        const r7 = flatsqsin((now / interval), 11, Math.PI + Math.PI / 2, 0.01);
                        const r8 = flatsqsin((now / interval), 11, 2 * Math.PI, 0.01);
                        const x4 = map(r7, 1, -1, -60, 750 - cardWidth + 60);
                        const scale4 = map(r8, -1, 1, 0.3, 1);

                        return { x1, scale1, x2, scale2, x3, scale3, x4, scale4 };
                    }}
                    render={({ x1, scale1, x2, scale2, x3, scale3, x4, scale4, y }) => {
                        return (
                            <div className="animation-container" style={{ overflow: "hidden", position: "relative" }}>
                                <div style={{
                                    position: "absolute",
                                    zIndex: Math.round(scale1 * 10),
                                    height: 324,
                                    width: 375,
                                    transformOrigin: "center",
                                    transform: `scale(${scale1}) translate3d(${x1 * (1 / scale1)}px, ${y * (1 / scale1)}px, 0px)`}}
                                >{els[3]}</div>
                                <div style={{
                                    position: "absolute",
                                    zIndex: Math.round(scale2 * 10),
                                    height: 324,
                                    width: 375,
                                    transformOrigin: "center",
                                    transform: `scale(${scale2}) translate3d(${x2 * (1 / scale2)}px, ${y * (1 / scale2)}px, 0px)`}}
                                >{els[2]}</div>
                                <div style={{
                                    position: "absolute",
                                    zIndex: Math.round(scale3 * 10),
                                    height: 324,
                                    width: 375,
                                    transformOrigin: "center",
                                    transform: `scale(${scale3}) translate3d(${x3 * (1 / scale3)}px, ${y * (1 / scale3)}px, 0px)`}}
                                >{els[1]}</div>
                                <div style={{
                                    position: "absolute",
                                    zIndex: Math.round(scale4 * 10),
                                    height: 324,
                                    width: 375,
                                    transformOrigin: "center",
                                    transform: `scale(${scale4}) translate3d(${x4 * (1 / scale4)}px, ${y * (1 / scale4)}px, 0px)`}}
                                >{els[0]}</div>
                            </div>
                        );
                    }}
                />
                <p className="desc landing-info">
                    Check out the
                    <Link href="/demo"><span><a className="internal-link"> demo </a></span></Link>
                    and
                    <Link href="/login"><span><a className="internal-link"> register </a></span></Link>
                    today.
                </p>
                <style jsx>{`
                    .animation-container {
                        height: 340px;
                        width: 750px;
                    }

                    .landing-title {
                        text-align: center;
                        margin-bottom: 50px;
                    }

                    .landing-info {
                        text-align: center;
                        margin-top: 100px;
                    }
                `}</style>
            </div>
        </Page>
    );
};

Index.getInitialProps = async (ctx) => {
    const cookies = parseCookies(ctx);
    const token = cookies[process.env.TOKEN_COOKIE_NAME];
    const authUser = decode(token);

    if (authUser && ctx.res) {
        ctx.res.writeHead(302, { Location: `/profile?id=${authUser.id}&tab=projects` });
        ctx.res.end();
    }

    return { authUser };
};

export default Index;
