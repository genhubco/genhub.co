import Head from "../components/Head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import "../styles/main.css";

export default () => (
    <div>
        <Head/>
        <Header/>
        <div className="content-small">
            <p className="homepage-title">Latest articles:</p>
            <Card
                img="Article3s.svg"
                title="Automating CRISPR: Part 2"
                desc="The biggest problem with CRISPR gene-editing is the accuracy of the edits. There are several ways to improve activity and reduce off-target editing..."
                link="https://medium.com/genhub/automating-crispr-part-2-ad838cc9260b"
            />
            <Card
                img="Article2s.svg"
                title="Automating CRISPR: Part 1"
                desc={<p>CRISPR stands for `<b>clustered regularly interspaced short palindromic repeats</b>`. It was first found in bacteria and acts as an immune system in prokaryotic cells...</p>}
                link="https://medium.com/genhub/automating-crispr-part-1-d5a03dfd9cf9"
            />
            <Card
                img="Article1s.svg"
                title="Introduction"
                desc="Field of genetic engineering is currently under revolutionary breakthroughs that have potential to create/change whole industries..."
                link="https://medium.com/genhub/genhub-introduction-b6c2c2fd71f4"
            />
        </div>
        <Footer/>
    </div>
);
