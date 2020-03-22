import React from "react";
import css from "styled-jsx/css";
import Page from "../components/Page";
import Text from "../components/Text";
import Title from "../components/Title";
import ExternalLink from "../components/ExternalLink";
import InternalLink from "../components/InternalLink";

const Animation = () => (
	<div className="animation-container">
		<div className="animation-item1">
			<div className="animation-item-text">
				<Text big>Engineer biological organisms by <strong>editing</strong> with CRISPR</Text>
			</div>
			<img src="first-part.svg" />
		</div>
		<div className="animation-item2">
			<div className="animation-item-text">
				<Text big>or <strong>writing</strong> a genetic circut</Text>
			</div>
			<img src="second-part.svg" />
		</div>
		<style jsx>{animationStyles}</style>
	</div>
);

const animationStyles = css`
.animation-container {
	margin: auto;
	width: 709px;
	position: relative;
	height: 312px;
}

.animation-item-text {
	padding: 20px 0;
	text-align: center;
}

.animation-item1 {
	height: 312px;
	width: 709px;
	position: absolute;
	top: 0;
	left: 0;
	animation-name: anim;
	animation-duration: 12s;
	animation-iteration-count: infinite;
}

.animation-item2 {
	height: 312px;
	width: 709px;
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
	animation-name: anim;
	animation-duration: 12s;
	animation-iteration-count: infinite;
	animation-delay: 6s;
}

@keyframes anim {
  0% {
	 transform: perspective(1000px) translateY(-10px);
	 opacity: 0;
 }
 3%, 48% {
   transform: perspective(1000px) translateY(0px);
	 opacity: 1;
 }
 51%, 100% {
   transform: perspective(1000px) translateZ(-40px);
	 opacity: 0;
 }
}
`;

const Index = () => (
	<Page>
		<div className="slogan-container">
			<Title>A synthetic biology platform</Title>
		</div>
		<div className="sub-slogan-container">
			<InternalLink to="/design">{"Try out CRISPR guide design tool (beta) ->"}</InternalLink>
		</div>
		<Animation/>
		<div className="early-access">
			<Text>Sign up for <ExternalLink to="https://forms.gle/XqsjJ3FYXH4ch2eW9">updates</ExternalLink>.</Text>
		</div>
		<style jsx>{styles}</style>
	</Page>
);

const styles = css`
.slogan-container {
	text-align: center;
	padding: 60px 0 20px 0;
}

.sub-slogan-container {
	text-align: center;
	padding: 0 0 40px 0;
}

.early-access {
	text-align: center;
	padding: 80px 0;
}
`;

export default Index;