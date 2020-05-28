import React from "react";
import css from "styled-jsx/css";

import Page from "../components/Page";
import Text from "../components/Text";
import Title from "../components/Title";
import ExternalLink from "../components/ExternalLink";
import InternalLink from "../components/InternalLink";
import Header from "../components/Header";

const Index = () => (
	<Page hideHeader onLoad={({ emit }) => emit("page", {
		path: "/"
	})} render={({ emit }) => (
		<>
			<div className="top-section">
				<Header />
				<div className="slogan-container">
					<Title big>Next-gen synthetic biology platform</Title>
				</div>
				<div className="sub-slogan-container">
					<Text big>Turning biology into information technology</Text>
				</div>
				<div className="contact-us">
					<Text>contact us at <ExternalLink to="mailto:team@genhub.co">team@genhub.co</ExternalLink></Text>
				</div>
			</div>
			<div className="products">
				<Title medium>Products</Title>
			</div>
			<div className="product-title">
				<Text big>Emergence programming language. </Text>
				<Text big><InternalLink to="/write" onClick={() => emit("internal-link", {
					from: "/",
					to: "/write"
				})}>See demo -></InternalLink></Text>
			</div>
			<div className="process-body">
				<div className="process-step">
					<img className="process-step-img" src="first-part.svg" />
					<div className="process-text">
						<div><Text>Write a program.</Text></div>
						<Text desc>Emergence is modern and minimalistic language for writing biological circuts.</Text>
					</div>
				</div>
				<div className="process-line-left" />
				<div className="process-step">
					<img className="process-step-img" src="second-part.svg" />
					<div className="process-text">
						<div><Text>Compile it to genetic circut.</Text></div>
						<Text desc>Evaluate the gates assigned by the compiler.</Text>
					</div>
				</div>
			</div>
			<div className="product-title">
				<Text big>CRISPR design tool. </Text>
				<Text big><InternalLink to="/design" onClick={() => emit("internal-link", {
					from: "/",
					to: "/design"
				})}>See demo -></InternalLink></Text>
			</div>
			<div className="process-body">
				<div className="process-step">
					<div className="process-text">
						<div><Text>Search for locations.</Text></div>
						<Text desc>Find what you are looking for from 60k available locations.</Text>
					</div>
					<img className="process-step-img" src="third-part.svg" />
				</div>
				<div className="process-line-right" />
				<div className="process-step">
					<div className="process-text">
						<div><Text>Get a visual.</Text></div>
						<Text desc>Inspect targets on a target map, and evaluate their scores.</Text>
					</div>
					<img className="process-step-img" src="fourth-part.svg" />
				</div>
			</div>
			<style jsx>{styles}</style>
		</>
	)} />
);

const styles = css`
.top-section {
	background-size: 20.2px 20px;
	background-image: radial-gradient(circle, rgb(210, 210, 210) 1px, rgba(0, 0, 0, 0) 1px);
}

.slogan-container {
	text-align: center;
	padding: 80px 0 20px 0;
}

.sub-slogan-container {
	text-align: center;
	padding: 80px 0 20px 0;
}

.contact-us {
	padding-bottom: 100px;
	text-align: center;
}

.try-demo {
	padding: 10px 80px 30px 80px;
	text-align: center;
}

.products {
	border-top: 1px solid #f2f3f4;
	text-align: center;
	padding: 30px 0 80px 0;
}

.product-title {
	text-align: center;
	padding-bottom: 30px;
}

.process-text {
	width: 100%;
	padding-top: 10px;
	padding-left: 40px;
	padding-right: 40px;
}

.process-step {
	display: flex;
	padding: 0 80px;
}

.process-body {
	box-sizing: border-box;
	padding-bottom: 80px;
}

.process-step-img {
	display: block;
}

.process-line-left {
	height: 20px;
	width: 205px;
	border-right: 2px solid #f2f3f4;
}

.process-line-right {
	height: 20px;
	width: 645px;
	border-right: 2px solid #f2f3f4;
}
`;

export default Index;