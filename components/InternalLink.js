import React from "react";
import css from "styled-jsx/css";
import Link from "next/link";

const InternalLink = ({ children, to = "" }) => (
	<div className="internal-link-container">
		<Link href={to}>
			<a className="internal-link">
				{children}
			</a>
		</Link>
		<style jsx>{styles}</style>
	</div>
);

const styles = css`
.internal-link-container {
	display: inline-block;
}

.internal-link {
	color: inherit;
	font-size: 14px;
	text-decoration: none;
	font-family: "PT Sans", sans-serif;
	border: none;
	background: none;
	cursor: pointer;
	padding: 0;
}

.internal-link:hover {
	font-weight: bold;
	text-decoration: underline;
}
`;

export default InternalLink;