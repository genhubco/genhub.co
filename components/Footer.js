import React from "react";
import css from "styled-jsx/css";
import ExternalLink from "./ExternalLink";
import Text from "./Text";

const Footer = () => (
	<div className="footer">
		<div className="footer-item">
			<Text><ExternalLink to="mailto:lazoviccorp@gmail.com">contact</ExternalLink></Text>
		</div>
		<div className="footer-item">
			<Text><ExternalLink to="https://medium.com/genhub">blog</ExternalLink></Text>
		</div>
		<Text><ExternalLink to="https://angel.co/gogenhub/jobs">jobs</ExternalLink></Text>
		<style jsx>{styles}</style>
	</div>
);

const styles = css`
.footer {
	border-top: 1px solid #f2f3f4;
	padding: 20px 0;
	text-align: center;
}

.footer-item {
	display: inline-block;
	padding-right: 10px;
}
`;

export default Footer;