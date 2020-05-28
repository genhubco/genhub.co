import React from "react";
import css from "styled-jsx/css";

const Title = ({ children, big, medium, small }) => {
	if (big) {
		return (
			<h1 className="big-title">
				{children}
				<style jsx>{styles}</style>
			</h1>
		);
	}

	if (medium) {
		return (
			<h2 className="medium-title">
				{children}
				<style jsx>{styles}</style>
			</h2>
		);
	}

	if (small) {
		<h3 className="small-title">
			{children}
			<style jsx>{styles}</style>
		</h3>
	}
}

const styles = css`
.big-title {
	font-size: 44px;
	font-weight: normal;
	font-family: "Barlow", sans-serif;
	margin: 0;
}

.medium-title {
	font-size: 34px;
	font-weight: normal;
	font-family: "Barlow", sans-serif;
	margin: 0;
}

.small-title {
	font-size: 24px;
	font-weight: normal;
	font-family: "Barlow", sans-serif;
	margin: 0;
}
`;

export default Title;