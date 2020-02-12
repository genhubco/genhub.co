const format = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const lerpColor = (colorFrom, colorTo, amount) => {
	const ah = parseInt(colorFrom.replace(/#/g, ""), 16),
		ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
		bh = parseInt(colorTo.replace(/#/g, ""), 16),
		br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
		rr = ar + amount * (br - ar),
		rg = ag + amount * (bg - ag),
		rb = ab + amount * (bb - ab);

	return "#" + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
};

const groupElements = (seq1, seq2) => {
	const arr = [];
	let range = [];
	const changes = seq1.split("").map((letter, i) => letter === seq2[i]);
	changes.forEach((current, i) => {
		const isChange = current != changes[i - 1];
		if (!isChange) {
			return;
		}

		range.push(i);
		if (range.length === 2) {
			arr.push({
				val: changes[i - 1],
				range
			});
			range = [i];
		}
	});

	if (range.length) {
		range.push(seq1.length);
		arr.push({
			val: changes[changes.length - 1],
			range
		});
	}
	return arr;
};

const map = (num, inMin, inMax, outMin, outMax) => {
	return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};

export {
	map,
	format,
	groupElements,
	lerpColor
};