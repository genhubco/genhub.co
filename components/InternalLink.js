import React from "react";
import css from "styled-jsx/css";
import Link from "next/link";

const InternalLink = ({ children, to = "", onClick = () => { } }) => (
	<div className="internal-link-container">
		<Link href={to}>
			<a className="internal-link" onClick={onClick}>
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
	opacity: 0.6;
	font-size: inherit;
	text-decoration: none;
	font-family: inherit;
	border: none;
	background: none;
	cursor: pointer;
	padding: 0;
	text-decoration: underline;
}

.internal-link:hover {
	opacity: 1;
}
`;

export default InternalLink;