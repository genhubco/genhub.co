module.exports = {
	target: "serverless",
	env: {
		FUNCTIONS: `${process.env.NODE_ENV === "development" ? "http://localhost:34567/.netlify/functions" : "https://5e41a6efdf576d000ac1a60e--api-genhub.netlify.com/.netlify/functions"}`,
	},
};
