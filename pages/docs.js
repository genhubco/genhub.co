import { get } from "axios";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

import Page from "../components/Page";
import Sidebar from "../components/Sidebar";

const Docs = ({content, st}) => (
    <Page contentSize="big">
        <Sidebar param="doc" options={[{
            name: "api",
            display: "api"
        }, {
            name: "data",
            display: "data"
        }]}>
            <ReactMarkdown className="markdown">
                {content}
            </ReactMarkdown>
        </Sidebar>
        <style jsx global>{`
            .markdown {
                font-family: "PT Sans", sans-serif;
            }

            .markdown hr {
                border: 1px solid #f2f3f4;
            }

            .markdown a {
                text-decoration: none;
                color: #007fff;
            }

            .markdown blockquote {
                color: #91a3b0;
                border-left: 5px solid #f2f3f4;
                padding-left: 10px;
                margin-left: 0;
            }

            .markdown ul, ol {
                padding-left: 30px;
            }

            .markdown p {
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .markdown code {
                font-family: "Source Code Pro", monospace;
                background-color: #f2f3f4;
                border-radius: 5px;
                padding: 4px;
            }

            .markdown pre {
                padding: 10px;
                background-color: #f2f3f4;
                border-radius: 5px;
            }

            .markdown pre code {
                background-color: transparent;
                border-radius: 0;
                padding: 0;
            }

            .markdown table {
                border: 1px solid #e7e9eb;
                padding: 10px;
                border-radius: 5px;
            }

            .markdown td, th {
                padding: 10px;
            }

            .markdown td {
                border-top: 1px solid #f2f3f4;
            }

            .markdown img {
                max-width: 100%;
            }
        `}</style>
    </Page>
);

Docs.getInitialProps = async ({query, res}) => {
    try {
        const contentRes = await get(`https://raw.githubusercontent.com/genhubco/${query.doc}/master/docs/index.md`);
        return { content: contentRes.data };
    } catch (e) {
        return { content: "## Document Not Found" };
    }
};

export default Docs;
