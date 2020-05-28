import React from "react";
import classnames from "classnames";
import css from "styled-jsx/css";

const Alert = ({
	info,
	success,
	warning,
	error,
	children
}) => (
		<div className={classnames("alert", {
			"info": info,
			"success": success,
			"warning": warning,
			"error": error,
		})}>
			{children}
			<style jsx>{styles}</style>
		</div>
	);

const styles = css`
.alert {
	box-sizing: border-box;
	border-radius: 9px;
	padding: 5px 10px;
}

.info {
	border: 2px solid #78c8ee;
	background-color: #89cff0;
}

.success {
	border: 2px solid #b9cda9;
	background-color: #c3d4b5;
}

.warning {
	border: 2px solid #f0e49e;
	background-color: #f3e9af;
}

.error {
	border: 2px solid #f3ada8;
	background-color: #f5bdb9;
	color: white;
}
`;

export default Alert;