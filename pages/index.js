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
                <div className="animation-container" style={{ overflow: "hidden", position: "relative" }}>
                    <Animation initialValue={{
                        position: "absolute",
                        zIndex: 7,
                        height: 324,
                        width: 375,
                        transform: `scale(0.7) translate3d(${-51 * (1 / 0.7).toFixed(2)}px, ${7 * (1 / 0.7).toFixed(2)}px, 0px)`,
                        transformOrigin: "center"
                    }} onFrame={async ({ map, flatsqsin, start }) => {
                        const interval = 4000;
                        const relativeTime = Date.now() - start;
                        const now = relativeTime + interval;
                        const r1 = flatsqsin((now / interval), 11, 0, 0.01);
                        const r2 = flatsqsin((now / interval), 11, Math.PI / 2, 0.01);
                        const x = map(r1, 1, -1, -60, 750 - cardWidth + 60);
                        const scale = map(r2, -1, 1, 0.3, 1);
                        const y = 7;

                        return {
                            position: "absolute",
                            zIndex: Math.round(scale * 10),
                            height: 324,
                            width: 375,
                            transformOrigin: "center",
                            transform: `scale(${scale.toFixed(3)}) translate3d(${(x * (1 / scale)).toFixed(1)}px, ${(y * (1 / scale)).toFixed(0)}px, 0px)`
                        };
                    }}
                    >{els[3]}</Animation>
                    <Animation initialValue={{
                        position: "absolute",
                        zIndex: 3,
                        height: 324,
                        width: 375,
                        transform: `scale(0.3) translate3d(${169.4 * (1 / 0.3).toFixed(2)}px, ${7 * (1 / 0.3).toFixed(2)}px, 0px)`,
                        transformOrigin: "center"
                    }} onFrame={async ({ map, flatsqsin, start }) => {
                        const interval = 4000;
                        const relativeTime = Date.now() - start;
                        const now = relativeTime + interval;
                        const r1 = flatsqsin((now / interval), 11, Math.PI / 2, 0.01);
                        const r2 = flatsqsin((now / interval), 11, Math.PI, 0.01);
                        const x = map(r1, 1, -1, -60, 750 - cardWidth + 60);
                        const scale = map(r2, -1, 1, 0.3, 1);
                        const y = 7;

                        return {
                            position: "absolute",
                            zIndex: Math.round(scale * 10),
                            height: 324,
                            width: 375,
                            transformOrigin: "center",
                            transform: `scale(${scale.toFixed(3)}) translate3d(${(x * (1 / scale)).toFixed(1)}px, ${(y * (1 / scale)).toFixed(0)}px, 0px)`
                        };
                    }}
                    >{els[2]}</Animation>
                    <Animation initialValue={{
                        position: "absolute",
                        zIndex: 6,
                        height: 324,
                        width: 375,
                        transform: `scale(0.6) translate3d(${426 * (1 / 0.6).toFixed(2)}px, ${7 * (1 / 0.6).toFixed(2)}px, 0px)`,
                        transformOrigin: "center"
                    }} onFrame={async ({ map, flatsqsin, start }) => {
                        const interval = 4000;
                        const relativeTime = Date.now() - start;
                        const now = relativeTime + interval;
                        const r1 = flatsqsin((now / interval), 11, Math.PI, 0.01);
                        const r2 = flatsqsin((now / interval), 11, Math.PI + Math.PI / 2, 0.01);
                        const x = map(r1, 1, -1, -60, 750 - cardWidth + 60);
                        const scale = map(r2, -1, 1, 0.3, 1);
                        const y = 7;

                        return {
                            position: "absolute",
                            zIndex: Math.round(scale * 10),
                            height: 324,
                            width: 375,
                            transformOrigin: "center",
                            transform: `scale(${scale.toFixed(3)}) translate3d(${(x * (1 / scale)).toFixed(1)}px, ${(y * (1 / scale)).toFixed(0)}px, 0px)`
                        };
                    }}
                    >{els[1]}</Animation>
                    <Animation initialValue={{
                        position: "absolute",
                        zIndex: 10,
                        height: 324,
                        width: 375,
                        transform: `scale(0.99) translate3d(${205 * (1 / 0.99).toFixed(2)}px, ${7 * (1 / 0.99).toFixed(2)}px, 0px)`,
                        transformOrigin: "center"
                    }}  onFrame={async ({ map, flatsqsin, start }) => {
                        const interval = 4000;
                        const relativeTime = Date.now() - start;
                        const now = relativeTime + interval;
                        const r1 = flatsqsin((now / interval), 11, Math.PI + Math.PI / 2, 0.01);
                        const r2 = flatsqsin((now / interval), 11, 2 * Math.PI, 0.01);
                        const x = map(r1, 1, -1, -60, 750 - cardWidth + 60);
                        const scale = map(r2, -1, 1, 0.3, 1);
                        const y = 7;

                        return {
                            position: "absolute",
                            zIndex: Math.round(scale * 10),
                            height: 324,
                            width: 375,
                            transformOrigin: "center",
                            transform: `scale(${scale.toFixed(3)}) translate3d(${(x * (1 / scale)).toFixed(1)}px, ${(y * (1 / scale)).toFixed(0)}px, 0px)`
                        };
                    }}
                    >{els[0]}</Animation>
                </div>
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
        ctx.res.writeHead(302, { Location: `/profile-projects?id=${authUser.id}` });
        ctx.res.end();
    }

    return { authUser };
};

export default Index;
