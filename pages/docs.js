import { get } from "axios";
import { decode } from "jsonwebtoken";
import { parseCookies } from "nookies";

import Error from "next/error";
import Page from "../components/Page";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Docs = ({ content, authUser, status }) => {
    if (status) {
        return (<Error statusCode={status} />);
    }
    return (
        <Page content="big" header={<Header user={authUser}/>}>
            <Sidebar params={{ section: "project", item: "doc" }} options={[{
                name: "api",
                display: "API"
            }, {
                name: "auth",
                display: "auth",
                section: "api"
            }, {
                name: "avatar",
                display: "avatar",
                section: "api"
            }, {
                name: "score",
                display: "score",
                section: "api"
            }, {
                name: "projects",
                display: "projects",
                section: "api"
            }, {
                name: "data",
                display: "DATA"
            }, {
                name: "datasets",
                display: "datasets",
                section: "data"
            }, {
                name: "models",
                display: "models",
                section: "data"
            }]}>
                <div className="doc-wrapper" dangerouslySetInnerHTML={{ __html: content }} />
            </Sidebar>
            <style jsx global>{`
                .doc-wrapper {
                    font-family: "PT Sans", sans-serif;
                }

                .doc-wrapper hr {
                    border: 1px solid #f2f3f4;
                }

                .doc-wrapper a {
                    text-decoration: none;
                    color: #007fff;
                }

                .doc-wrapper blockquote {
                    color: #91a3b0;
                    border-left: 5px solid #f2f3f4;
                    padding-left: 10px;
                    margin-left: 0;
                }

                .doc-wrapper ul, ol {
                    padding-left: 30px;
                }

                .doc-wrapper li {
                    font-size: 14px;
                }

                .doc-wrapper p {
                    font-size: 14px;
                    margin-top: 10px;
                    margin-bottom: 10px;
                }

                .doc-wrapper code {
                    font-family: "Source Code Pro", monospace;
                    background-color: #f2f3f4;
                    font-size: 14px;
                    border-radius: 5px;
                    padding: 0 2px;
                }

                .doc-wrapper pre {
                    overflow: scroll;
                    font-size: 14px;
                    padding: 10px;
                    background-color: #f2f3f4;
                    border-radius: 5px;
                }

                .doc-wrapper pre code {
                    background-color: transparent;
                    border-radius: 0;
                    padding: 0;
                }

                .doc-wrapper table {
                    border: 1px solid #e7e9eb;
                    padding: 10px;
                    border-radius: 5px;
                }

                .doc-wrapper td, th {
                    padding: 10px;
                }

                .doc-wrapper td {
                    border-top: 1px solid #f2f3f4;
                }

                .doc-wrapper img {
                    max-width: 100%;
                }
            `}</style>
        </Page>
    );
};

Docs.getInitialProps = async (ctx) => {
    const cookies = parseCookies(ctx);
    const token = cookies[process.env.TOKEN_COOKIE_NAME];
    const authUser = decode(token);

    try {
        const { query } = ctx;
        const { project, doc } = query;
        const projects = {
            "api": process.env.API_DOCS_URL,
            "data": process.env.DATA_DOCS_URL
        };
        const contentRes = await get(`${projects[project]}${doc}.html`);
        const regex = /<body>(.*?)<\/body>/s;
        const content = contentRes.data.match(regex);
        return { content: content[1], authUser };
    } catch (e) {
        console.log(e);
        const status = e.response ? e.response.status : 500;
        return { status };
    }
};

export default Docs;
