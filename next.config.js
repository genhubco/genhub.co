module.exports = {
	env: {
		MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN,
	},
	async redirects() {
		return [
			{
				source: "/write",
				destination: "https://app.genhub.co/",
				permanent: true,
			},
		];
	},
};
