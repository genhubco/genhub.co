import { decode } from "jsonwebtoken";
import { parseCookies } from "nookies";

import Page from "../components/Page";
import Header from "../components/Header";

const articles = [{
    img: "Article3s.svg",
    title: "Automating CRISPR: Part 2",
    desc: "The biggest problem with CRISPR gene-editing is the accuracy of the edits. There are several ways to improve activity and reduce off-target editing...",
    link: "https://medium.com/genhub/automating-crispr-part-2-ad838cc9260b"
}, {
    img: "Article2s.svg",
    title: "Automating CRISPR: Part 1",
    desc: <span>CRISPR stands for `<b>clustered regularly interspaced short palindromic repeats</b>`. It was first found in bacteria and acts as an immune system in prokaryotic cells...</span>,
    link: "https://medium.com/genhub/automating-crispr-part-1-d5a03dfd9cf9"
}, {
    img: "Article1s.svg",
    title: "Introduction",
    desc: "Field of genetic engineering is currently under revolutionary breakthroughs that have potential to create/change whole industries...",
    link: "https://medium.com/genhub/genhub-introduction-b6c2c2fd71f4"
}];

const Index = ({ authUser }) => (
    <Page content="small" header={<Header user={authUser}/>}>
        <p className="text">Latest articles:</p>
        {articles.map((item, i) => (
            <div key={`article-${i}`} className="article">
                <img className="article-image" src={`/static/${item.img}`} />
                <div className="article-body">
                    <h3 className="title article-title">{item.title}</h3>
                    <p className="text">{item.desc}</p>
                    <div className="article-link"><a className="link" target="_blank" href={item.link}>see full article -></a></div>
                </div>
            </div>
        ))}
        <style jsx global>{`
            .article {
                padding: 20px 0;
                margin: 10px 0;
                width: 500px;
                border-radius: 5px;
                border: 1px solid #f2f3f4;
            }

            .article-body {
                padding: 30px 30px 0 30px;
            }

            .article-link {
                text-align: right;
            }

            .article-image {
                width: 100%;
            }

            .article-title {
                margin-bottom: 10px;
            }
        `}</style>
    </Page>
);

Index.getInitialProps = async (ctx) => {
    const cookies = parseCookies(ctx);
    const token = cookies[process.env.TOKEN_COOKIE_NAME];
    const authUser = decode(token);

    return { authUser };
};

export default Index;
