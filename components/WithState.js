import React, { useState, useEffect, useRef } from "react";

const WithState = ({ initialState = {}, initialData = {}, onStart = () => {}, render = () => {} }) => {
	const [state, setState] = useState(initialState);
	const data = useRef(initialData);

	const setData = (newData) => {
		data.current = {
			...data.current,
			...newData
		};
	};

	const getData = () => data.current;

	const mounted = useRef(true);
	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	});

	const safeSetState = (newState) => {
		if (!mounted.current) {
			return;
		}
		setState(prevState => ({
			...prevState,
			...newState
		}));
	};

	useEffect(() => {
		onStart({
			state,
			setState: safeSetState,
			setData,
			getData
		});
	}, []);

	return (
		<div className="shared-state">
			{render({
				state,
				setState: safeSetState,
				setData,
				getData
			})}
		</div>
	);
};

export default WithState;