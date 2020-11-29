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
	// mixpaned.track(name, data);
}

const Page = ({
	title = "Next-gen synthetic biology platform - GenHub",
	render = () => { },
	onLoad = () => { },
	children,
}) => (<div className="page-wrapper">
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
				<div className="page">
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
					</Head>
					<Header />
					{children || render({ setToast, emit })}
					<Footer />
				</div>
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
.page-wrapper {
	max-width: 850px;
	min-width: 460px;
	margin: 0 auto;
	padding: 20px;
}
.page {
	border-radius: 9px;
	background: white;
	box-shadow: 0px 0px 13px -4px rgba(0,0,0,0.1);
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