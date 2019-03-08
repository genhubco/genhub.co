import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import "../styles/main.css";

export default () => (
    <div>
        <Head>
            <title>forever23 - Democratizing genetic engineering</title>
            <link rel="icon" type="image/png" href="static/favicon23.png" />
            <link
                href="https://fonts.googleapis.com/css?family=Fjalla+One"
                rel="stylesheet"
            />
        </Head>
        <Header/>
        <div className="content-small">
            <p className="homepage-title">Latest articles:</p>
            <Card
                img="Article3s.svg"
                title="Automating CRISPR: Part 2"
                desc="The biggest problem with CRISPR gene-editing is the accuracy of the edits. There are several ways to improve activity and reduce off-target editing..."
                link="https://medium.com/forever23/automating-crispr-part-2-eee72963bb05"
            />
            <Card
                img="Article2s.svg"
                title="Automating CRISPR: Part 1"
                desc={<p>CRISPR stands for `<b>clustered regularly interspaced short palindromic repeats</b>`. It was first found in bacteria and acts as an immune system in prokaryotic cells...</p>}
                link="https://medium.com/forever23/automating-crispr-part-1-90e0b4af19fe"
            />
            <Card
                img="Article1s.svg"
                title="Introduction"
                desc="Field of genetic engineering is currently under revolutionary breakthroughs that have potential to create/change whole industries..."
                link="https://medium.com/forever23/forever23-introduction-5f887c6d9490"
            />
        </div>
        <Footer/>
    </div>
);
