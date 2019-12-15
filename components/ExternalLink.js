import React from "react";
import css from "styled-jsx/css";

const ExternalLink = ({ children, to = "" }) => (
	<>
		<a target="_blank" rel="noopener noreferrer" href={to} className="link">
			{children}
		</a>
		<style jsx>{styles}</style>
	</>
);

const styles = css`
.link {
	font-size: 14px;
	color: #007fff;
	text-decoration: none;
	font-family: "PT Sans", sans-serif;
	border: none;
	background: none;
	cursor: pointer;
	padding: 0;
}

.link:hover {
	font-weight: bold;
}
`;

export default ExternalLink;