import React from "react";
import {
	useTransition,
	animated,
} from "react-spring";
import css from "styled-jsx/css";
import Page from "../components/Page";
import Text from "../components/Text";
import Title from "../components/Title";
import WithState from "../components/WithState";
import ExternalLink from "../components/ExternalLink";

const Animation = () => (
	<div className="animation-container">
		<WithState initialState={{
			toggle: true,
		}} render={({
			state, setState,
		}) => {
			const transitions = useTransition(state.toggle, null, {
				from: {
					transform: "translate3d(0,-40px,0) rotateX(-40deg)",
					position: "absolute",
					opacity: 0,
				},
				enter: {
					transform: "translate3d(0,0px,0)  rotateX(0deg)",
					opacity: 1,
				},
				leave: {
					transform: "translate3d(0,40px,0)  rotateX(40deg)",
					opacity: 0,
				},
			});
			setTimeout(() => setState({
				toggle: !state.toggle,
			}), 4000);

			return transitions.map(({
				item, key, props,
			}) => {
				return item ?
					<animated.div key={key} style={props}>
						<img className="animation-item" src="first-part.svg" />
					</animated.div> :
					<animated.div key={key} style={props}>
						<img className="animation-item" src="second-part.svg" />
					</animated.div>;
			});
		}}/>
		<style jsx>{animationStyles}</style>
	</div>
);

const animationStyles = css`
.animation-container {
	padding: 60px;
	height: 298px;
}

.animation-item {
	height: 298px;
	width: 730px;
}
`;

const Index = () => (
	<Page>
		<div className="slogan-container">
			<Title>Genetic engineering in 4 steps:</Title>
		</div>
		<Animation/>
		<div className="early-access">
			<Text>Sign up for <ExternalLink to="https://forms.gle/XqsjJ3FYXH4ch2eW9">early access</ExternalLink>.</Text>
		</div>
		<style jsx>{styles}</style>
	</Page>
);

const styles = css`
.slogan-container {
	text-align: center;
	padding: 60px 0;
}

.early-access {
	text-align: center;
	padding: 40px 0 80px 0;
}
`;

export default Index;
