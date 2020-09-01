import React from "react";
import classnames from "classnames";
import css from "styled-jsx/css";

const Text = ({ small, big, warning, desc, error, success, info, color = null, outlineError, children }) => (
	<span style={{ color }} className={classnames("text", {
		desc: desc && !color,
		warning: warning && !color,
		error: error && !color,
		success: success && !color,
		info: info && !color,
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
	font-size: 23px;
}

.text-normal {
	font-size: 18px;
}

.text-small {
	font-size: 16px;
}

.desc {
	color: #9ca5ac;
}

.error {
	color: #EE6868;
}

.info {
	color: #538cb2;
}

.outline-error {
	outline: 1px solid #EE6868;
}

.warning {
	color: #FFC700;
}

.success {
	color: #43d100;
}
`;

export default Text;