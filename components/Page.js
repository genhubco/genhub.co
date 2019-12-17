import React from "react";
import classnames from "classnames";
import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";
import css from "styled-jsx/css";

const Page = ({
	type = "normal",
	title = "Democratizing genetic engineering - GenHub",
	children,
}) => (
	<div className="page">
		<Head>
			<title>{title}</title>
			<link href="https://fonts.googleapis.com/css?family=Barlow" rel="stylesheet"/>
			<link rel="icon" type="image/png" href="/favicon.png" />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@gogenhub" />
			<meta name="twitter:creator" content="@gogenhub" />
			<meta
				name="og:description"
				content="Search for targets with highest score and review off-targets."
			/>
			<meta name="og:title" content="Democratizing genetic engineering - GenHub" />
			<meta
				name="og:image"
				content={
					process.env.NOW_GITHUB_COMMIT_REF === "staging" ?
						"https://genhubco-git-staging.genhub.now.sh/twitter-card.png" :
						"https://genhubco-git-master.genhub.now.sh/twitter-card.png"
				}
			/>
		</Head>
		<Header/>
		<div className={classnames({
			"content": type === "normal",
			"content-center": type === "center",
		})}>
			{children}
		</div>
		<Footer/>
		<style jsx global>{`
			html {
				margin: 0;
				background: #f2f3f4;
			}

			#__next {
				margin: 0;
				background: #f2f3f4;
			}

			body {
				margin: 0;
			}

			*:focus {
				outline: 1px solid #007fff;
			}
		`}</style>
		<style jsx>{styles}</style>
	</div>
);

const styles = css`
	.page {
		border-radius: 9px;
		background: white;
		width: 850px;
		margin: 20px auto;
		box-shadow: 0px 0px 13px -4px rgba(0,0,0,0.1);
	}
`;

export default Page;