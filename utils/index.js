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

export {
	map,
	format,
	lerpColor
};