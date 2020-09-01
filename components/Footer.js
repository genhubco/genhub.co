import React from "react";
import css from "styled-jsx/css";

import ExternalLink from "../components/ExternalLink";
import Text from "../components/Text";

const Footer = () => (
	<div className="footer">
		<ExternalLink to="mailto:team@genhub.co"><Text info>contact</Text></ExternalLink>
		<ExternalLink to="https://twitter.com/gogenhub"><Text info>twitter</Text></ExternalLink>
		<ExternalLink to="https://angel.co/gogenhub/jobs"><Text info>jobs</Text></ExternalLink>
		<style jsx>{styles}</style>
	</div>
);

const styles = css`
.footer {
	text-align: center;
	padding: 15px;
	box-sizing: border-box;
}
`;

export default Footer;