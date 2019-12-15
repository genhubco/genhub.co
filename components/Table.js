import React from "react";
import css from "styled-jsx/css";

import Text from "./Text";

const Table = ({ headers = [], items = [], weights = [], renderRowItem = () => {} }) => {
	if (!items.length) {
		return null;
	}
	return (
		<div className="table">
			<div className="table-header">
				{headers.map((item, i) => (
					<div key={`header-${i}`} className="table-header-item" style={{ flex: weights[i] }}>
						<Text desc>{item.display}</Text>
					</div>
				))}
			</div>
			{items.map((row, i) => (
				<div className="table-row" key={`row-${i}`}>
					{headers.map((header, j) => (
						<div key={`row-item-${i}-${j}`} className="table-row-item" style={{ flex: weights[j] }}>
							{renderRowItem(header.key, row[header.key])}
						</div>
					))}
				</div>
			))}
			<style jsx>{styles}</style>
		</div>
	);
};

const styles = css`
.table {
	border: 1px solid #EBEBEB;
	border-radius: 9px;
	padding: 10px 0;
	box-sizing: border-box;
}

.table-header, .table-row {
	display: flex;
}

.table-row-item, .table-header-item {
	padding: 10px 20px;
}
`;

export default Table;