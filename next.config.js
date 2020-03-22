module.exports = {
	target: "serverless",
	env: {
		FUNCTIONS: `${
			process.env.NODE_ENV === "development" ?
				"http://localhost:34567/.netlify/functions" :
				"https://5e77c1ee4fee5d529b561188--api-genhub.netlify.com/.netlify/functions"
		}`,
	},
};
