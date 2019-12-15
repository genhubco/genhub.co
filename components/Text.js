import React from "react";
import classnames from "classnames";
import css from "styled-jsx/css";

const Text = ({ warning, desc, error, success, color = null, outlineError, children }) => (
	<span style={{ color }} className={classnames("text", {
		desc: desc && !color,
		warning: warning && !color,
		error: error && !color,
		success: success && !color,
		"outline-error": outlineError
	})}>
		{children}
		<style jsx>{styles}</style>
	</span>
);

const styles = css`
.text {
	letter-spacing: 0.5px;
	font-family: "PT Sans", sans-serif;
	font-size: 14px;
	margin: 0;
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