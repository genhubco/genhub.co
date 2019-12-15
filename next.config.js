module.exports = {
	target: "serverless",
	env: {
		FUNCTIONS: `${process.env.NODE_ENV === "development" ? "http://localhost:34567/.netlify/functions" : "https://5df2b9b748575200096aeed0--api-genhub.netlify.com/.netlify/functions"}`,
	},
};
