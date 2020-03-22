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
	display: flex;
	justify-content: space-between;
	padding: 10px 20px 0 15px;
	box-sizing: border-box;
}

.header-link {
	padding-top: 5px;
	font-family: "PT Sans", sans-serif;
	text-decoration: none;
	color: inherit;
}

.header-link:hover {
	font-weight: bold;
}

.header-logo {
	height: 30px;
	cursor: pointer;
}
`;