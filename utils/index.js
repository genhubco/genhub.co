function format(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function lerpColor(colorFrom, colorTo, amount) {
	const ah = parseInt(colorFrom.replace(/#/g, ""), 16);
	const ar = ah >> 16;
	const ag = ah >> 8 & 0xff;
	const ab = ah & 0xff;
	const bh = parseInt(colorTo.replace(/#/g, ""), 16);
	const br = bh >> 16;
	const bg = bh >> 8 & 0xff;
	const bb = bh & 0xff;
	const rr = ar + amount * (br - ar);
	const rg = ag + amount * (bg - ag);
	const rb = ab + amount * (bb - ab);

	return "#" + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

function map(num, inMin, inMax, outMin, outMax) {
	return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function expScale(x) {
	return 1 - Math.exp(-1 * x);
}

function sigScale(x) {
	let k = 11;
	let x0 = 0.5;
	return 1 / (1 + Math.exp(-k * (x - x0)));
}

function svgPath(scaleMin, scaleMax, arr, color) {
	const points = arr.map((item, i) => [i, map(expScale(item), 0, 1, scaleMax, scaleMin)]);
	const d = points.reduce((acc, point, i) => {
		const val = i === 0 ? `M ${point[0]},${point[1]}` : `L ${point[0]},${point[1]}`;
		return acc + val;
	}, "");
	return <path d={d} fill="none" strokeWidth="2" stroke={color} pointerEvents="none" />;
}

export {
	map,
	format,
	lerpColor,
	svgPath
};