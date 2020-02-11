import React from "react";
import css from "styled-jsx/css";
import classnames from "classnames";
import { format } from "../utils";

import WithState from "./WithState";
import Text from "./Text";

const LocationList = ({ locations = [], onSelect = () => {} }) => (
	<div className="list">
		<WithState initialState={{ selected: {} }} render={({ state, setState }) => {
			if (!locations.length) {
				return (<div className="list-empty"><Text desc>No items found.</Text></div>);
			}
			return locations.map(item => (
				<div key={`key-${item.id}`} className={classnames("list-item", {
					"list-item-selected": item.id === state.selected.id
				})} onClick={() => {
					setState({ selected: item });
					onSelect(item);
				}}>
					{["id", "gene", "chr", "strand"].map((key, i) => (
						<div key={`${key}-${i}`} className="list-item-chunk">
							<Text desc>{key}:</Text>{" "}<Text>{item[key]}</Text>
						</div>
					))}
					<div className="list-item-chunk">
						<Text desc>location:</Text>{" "}
						<Text>{format(item.start)} - {format(item.end)}</Text>
					</div>
				</div>
			));
		}}/>
		<style jsx>{listStyles}</style>
	</div>
);

const listStyles = css`
.list {
	border: 1px solid #EBEBEB;
	border-radius: 9px;
	padding: 10px 0;
	box-sizing: border-box;
	height: 217px;
}

.list-item {
	padding: 10px 20px;
	box-sizing: border-box;
}

.list-empty {
	padding-top: 85px;
	box-sizing: border-box;
	text-align: center;
}

.list-item-chunk {
	display: inline-block;
	box-sizing: border-box;
	padding-right: 10px;
}

.list-item-selected {
	background-color: #f2f3f4;
}

.list-item:hover {
	background-color: #f2f3f4;
	cursor: pointer;
}
`;

export default LocationList;