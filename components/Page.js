import React from "react";
import Head from "next/head";
import mixpaned from "mixpanel-browser";

import WithState from "./WithState";
import Header from "./Header";
import Text from "./Text";
import Footer from "./Footer";
import css from "styled-jsx/css";

mixpaned.init(process.env.MIXPANEL_TOKEN);

function emit(name, data) {
	mixpaned.track(name, data);
}

const Page = ({
	title = "Next-gen synthetic biology platform - GenHub",
	render = () => { },
	onLoad = () => { },
	children,
	hideHeader,
	hideFooter
}) => (<div className="page">
	<WithState
		onStart={() => onLoad({ emit })}
		initialState={{ toast: { type: null } }}
		initialData={{ timeoutId: null }}
		render={({ state, setState, getData, setData }) => {
			const setToast = data => {
				const currTimeout = getData().timeoutId;
				clearTimeout(currTimeout);

				if (data.duration) {
					const newTimeoutId = setTimeout(() => {
						setState({ toast: { type: null } });
						setData({ timeoutId: null });
					}, data.duration);
					setData({ timeoutId: newTimeoutId });
				}

				setState({ toast: data });
			};
			const toastOpts = { [state.toast.type]: state.toast.type !== null };
			return (
				<>
					{
						state.toast.type &&
						<div className="page-toast">
							<Text {...toastOpts}>● </Text><Text>{state.toast.message}</Text>
						</div>
					}
					<Head>
						<title>{title}</title>
						<link href="https://fonts.googleapis.com/css?family=Barlow" rel="stylesheet" />
						<link rel="icon" type="image/png" href="/favicon.png" />

						<meta name="twitter:card" content="summary_large_image" />
						<meta name="twitter:site" content="@gogenhub" />
						<meta name="twitter:creator" content="@gogenhub" />
						<meta
							name="og:description"
							content="Search for targets with highest score and review off-targets."
						/>
						<meta name="og:title" content="Next-gen synthetic biology platform - GenHub" />
						<meta
							name="og:image"
							content={
								process.env.NOW_GITHUB_COMMIT_REF === "staging" ?
									"https://genhubco-git-staging.genhub.now.sh/twitter-card.png" :
									"https://genhubco-git-master.genhub.now.sh/twitter-card.png"
							}
						/>
					</Head>
					{!hideHeader ? <Header /> : null}
					{children || render({ setToast, emit })}
					{!hideFooter ? <Footer /> : null}
				</>
			);
		}} />
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
</div>);

const styles = css`
.page {
	border-radius: 9px;
	background: white;
	width: 850px;
	margin: 20px auto;
	box-shadow: 0px 0px 13px -4px rgba(0,0,0,0.1);
}

.page-landing {
	background: white;
	width: 850px;
	margin: 20px auto;
}

.page-toast {
	z-index: 10;
	bottom: 20px;
	right: 20px;
	width: 300px;
	position: fixed;
	box-sizing: border-box;
	padding: 10px 20px;
	border-radius: 9px;
	background: white;
	box-shadow: 0px 0px 13px -1px rgba(0,0,0,0.1);
}
`;

export default Page;