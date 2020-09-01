import React from "react";
import css from "styled-jsx/css";

const Container = ({ children }) => (
	<div className="container">
		{children}
		<style jsx>{styles}</style>
	</div >
);

const styles = css`
.container {
	border-bottom: 1px solid #e7e9eb;
	box-sizing: border-box;
}
`;

export default Container;