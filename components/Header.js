import React from "react";
import css from "styled-jsx/css";

import Container from "./Container";
import InternalLink from "./InternalLink";
import Text from "./Text";

const Header = () => (
	<Container small>
		<div className="header">
			<InternalLink to="/">
				<img className="header-logo" src="/applogo.svg" />
			</InternalLink>
			<div>
				<InternalLink to="/write"><Text big>demo ›</Text></InternalLink>
			</div>
		</div>
		<style jsx>{styles}</style>
	</Container>
);

const styles = css`
.header {
	padding: 10px;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
}

.header-logo {
	height: 30px;
	display: block;
}
`;

export default Header;