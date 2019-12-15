import React from "react";
import css from "styled-jsx/css";

const Title = ({ children }) => (
	<h1 className="title">
		{children}
		<style jsx>{styles}</style>
	</h1>
);

const styles = css`
.title {
	font-weight: normal;
	font-family: "Barlow", sans-serif;
	margin: 0;
}
`;

export default Title;