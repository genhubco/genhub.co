import Head from "next/head";
import Header from "../components/Header";
import Card from "../components/Card";
import "../styles/main.css";

export default () => (
    <div>
        <Head>
            <title>forever23</title>
            <link rel="icon" type="image/png" href="static/favicon23.png" />
            <link
                href="https://fonts.googleapis.com/css?family=Fjalla+One"
                rel="stylesheet"
            />
        </Head>
        <Header/>
        <Card
            img="articleBGsmall.png"
            title="Introduction"
            desc="Field of genetic engineering is currently under revolutionary breakthroughs that have potential to create/change whole industries..."
            link="https://medium.com/forever23/forever23-introduction-5f887c6d9490"
        />
    </div>
);
