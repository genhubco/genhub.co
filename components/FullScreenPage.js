import React from "react";
import Head from "next/head";
import css from "styled-jsx/css";

const FullScreenPage = ({
	title = "Next-gen synthetic biology platform - GenHub",
	children,
}) => (
		<div className="page-wrapper">
			<div className="page">
				<Head>
					<title>{title}</title>
					<link href="https://fonts.googleapis.com/css?family=Barlow" rel="stylesheet" />
					<link rel="icon" type="image/png" href="/favicon.png" />
				</Head>
				{children}
			</div>
			<style jsx global>{`
				html {
					height: 100vh;
				}
				#__next {
					height: 100vh;
				}
				body {
					margin: 0;
					height: 100vh;
				}
				*:focus {
					outline: 1px solid #007fff;
				}
			`}</style>
			<style jsx>{styles}</style>
		</div>
	);

const styles = css`
.page-wrapper {
	height: 100vh;
}

.page {
	height: 100vh;
	background: white;
}
`;

export default FullScreenPage;