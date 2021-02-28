import React from "react";
import css from "styled-jsx/css";

const ExternalLink = ({ children, to = "" }) => (
	<div className="external-link-container">
		<a target="_blank" rel="noopener noreferrer" href={to} className="external-link">
			{children}
		</a>
		<style jsx>{styles}</style>
	</div>
);

const styles = css`
	.external-link-container {
		display: inline-block;
	}

	.external-link {
		display: block;
		border: none;
		background: none;
		cursor: pointer;
		box-sizing: border-box;
		padding: 4px 10px;
		border-radius: 10px;
		text-decoration: none;
	}

	.external-link:hover {
		opacity: 0.7;
		background: #f0f8ff;
	}
`;

export default ExternalLink;
