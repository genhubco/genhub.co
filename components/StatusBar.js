import React from "react";

import Text from "./Text";

const StatusBar = ({
	status = "success",
	success = "All good.",
	loading = "Loading...",
	error = "Oops! Something went wrong."
}) => {
	const comps = {
		"success": <Text success>{`✓ ${success}`}</Text>,
		"loading": <Text warning>{`● ${loading}`}</Text>,
		"error": <Text error>{`× ${error}`}</Text>,
	};
	return (comps[status]);
};

export default StatusBar;