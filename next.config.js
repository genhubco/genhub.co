module.exports = {
	target: "serverless",
	env: {
		FUNCTIONS: `${process.env.NODE_ENV === "development" ? "http://localhost:34567/.netlify/functions" : "https://5e4330d4798dfd000a9f0e56--api-genhub.netlify.com/.netlify/functions"}`,
	},
};
