import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import css from "styled-jsx/css";

export default withRouter(() => (
	<div className="header">
		<Link href="/">
			<img className="header-logo" src="/applogo.svg" />
		</Link>
		<style jsx>{styles}</style>
	</div>
));

const styles = css`
.header {
	padding: 10px 10px 0 10px;
	box-sizing: border-box;
}

.header-logo {
	height: 30px;
	cursor: pointer;
}
`;