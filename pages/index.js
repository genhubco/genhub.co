import React from "react";
import css from "styled-jsx/css";

import Page from "../components/Page";
import Container from "../components/Container";
import ExternalLink from "../components/ExternalLink";
import Text from "../components/Text";
import Title from "../components/Title";

const Index = () => (
	<Page>
		<>
			<Container>
				<div className="top-section">
					<div className="slogan-container">
						<Title big>Next-gen synthetic biology platform</Title>
					</div>
					<div className="sub-slogan-container">
						<Text big>We are making computer-aided biology tools</Text>
					</div>
					<div className="contact">
						<Text>contact us at</Text>
						<ExternalLink to="mailto:team@genhub.co">
							<Text info>team@genhub.co</Text>
						</ExternalLink>
					</div>
				</div>
			</Container>
			<Container>
				<div className="product">
					<div className="product-title">
						<Text big>Emergence programming language</Text>
					</div>
					<div className="product-body">
						<div className="process">
							<img className="process-step-img" src="first-part.svg" />
							<div className="process-text">
								<div>
									<Text>1. Write a program.</Text>
								</div>
								<Text desc small>
									Emergence is a modern and minimalistic language for writing
									biological circuits.
								</Text>
							</div>
						</div>
						<div className="process">
							<img className="process-step-img" src="second-part.svg" />
							<div className="process-text">
								<div>
									<Text>2. Compile it to a genetic circuit.</Text>
								</div>
								<Text desc small>
									Evaluate the gates assigned by the compiler.
								</Text>
							</div>
						</div>
						<div className="process">
							<img className="process-step-img" src="third-part.svg" />
							<div className="process-text">
								<div>
									<Text>3. Predict the results.</Text>
								</div>
								<Text desc small>
									See what to expect before doing the experiment.
								</Text>
							</div>
						</div>
					</div>
					<div className="product-footer">
						<Text desc>Check out the</Text>
						<ExternalLink to="https://app.genhub.co/">
							<Text info>demo</Text>
						</ExternalLink>
						<div>
							<Text desc>and</Text>
							<ExternalLink to="https://www.notion.so/Emergence-Official-Docs-0722d17ae7c54e5b85ff94cecb337622">
								<Text info>syntax breakdown</Text>
							</ExternalLink>
						</div>
					</div>
				</div>
			</Container>
			<style jsx>{styles}</style>
		</>
	</Page>
);

const styles = css`
	.top-section {
		height: 100%;
		box-sizing: border-box;
		background-size: 20.2px 20px;
		padding: 0 20px;
		text-align: center;
		background-image: radial-gradient(circle, rgb(210, 210, 210) 1px, rgba(0, 0, 0, 0) 1px);
	}

	.slogan-container {
		padding: 100px 0 40px 0;
	}

	.sub-slogan-container {
		padding-bottom: 20px;
	}

	.contact {
		padding-bottom: 80px;
	}

	.product {
		padding: 0 20px;
	}

	.product-title {
		text-align: center;
		padding: 40px 0;
	}

	.product-footer {
		text-align: center;
		padding: 40px 0;
	}

	.process {
		font-size: 0;
		text-align: center;
		padding-bottom: 20px;
	}

	.process-step-img {
		width: 326px;
		display: inline-block;
	}

	.process-body {
		padding-bottom: 20px;
	}

	.process-text {
		width: 350px;
		box-sizing: border-box;
		padding: 20px;
		display: inline-block;
		vertical-align: top;
		text-align: left;
	}
`;

export default Index;
