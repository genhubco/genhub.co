import React from "react";
import css from "styled-jsx/css";

import Container from "./Container";
import InternalLink from "./InternalLink";
import ExternalLink from "./ExternalLink";
import Text from "./Text";

const Header = () => (
	<Container small>
		<div className="header">
			<InternalLink to="/">
				<img className="header-logo" src="/applogo.svg" />
			</InternalLink>
			<div>
				<ExternalLink to="https://www.notion.so/Emergence-Official-Docs-0722d17ae7c54e5b85ff94cecb337622">
					<Text big info>
						docs
					</Text>
				</ExternalLink>
				<ExternalLink to="https://app.genhub.co/">
					<Text big info>
						demo ›
					</Text>
				</ExternalLink>
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
