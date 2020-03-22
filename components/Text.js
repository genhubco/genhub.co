import React from "react";
import classnames from "classnames";
import css from "styled-jsx/css";

const Text = ({ small, big, warning, desc, error, success, color = null, outlineError, children }) => (
	<span style={{ color }} className={classnames("text", {
		desc: desc && !color,
		warning: warning && !color,
		error: error && !color,
		success: success && !color,
		"outline-error": outlineError,
		"text-normal": !small && !big,
		"text-small": small,
		"text-big": big
	})}>
		{children}
		<style jsx>{styles}</style>
	</span>
);

const styles = css`
.text {
	letter-spacing: 0.5px;
	font-family: "PT Sans", sans-serif;
	margin: 0;
}

.text-big {
	font-size: 20px;
}

.text-normal {
	font-size: 14px;
}

.text-small {
	font-size: 10px;
}

.desc {
	color: #a7afb5;
}

.error {
	color: #EE6868;
}

.outline-error {
	outline: 1px solid #EE6868;
}

.warning {
	color: #FFC700;
}

.success {
	color: #49E500;
}
`;

export default Text;