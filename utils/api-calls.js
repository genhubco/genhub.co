function comp(seq) {
	const comp = {
		"A": "T",
		"T": "A",
		"C": "G",
		"G": "C"
	};
	return seq.split("").map(letter => comp[letter]).join("");
}

async function getTargets(species, location) {
	try {
		const resForward = await fetch(`${process.env.FUNCTIONS}/targets-${species}-${location.chr}-forward?start=${location.start}&end=${location.end}`);
		const resBackward = await fetch(`${process.env.FUNCTIONS}/targets-${species}-${location.chr}-backward?start=${location.start}&end=${location.end}`);

		if (!resForward.ok) {
			return { status: resForward.status };
		}

		if (!resBackward.ok) {
			return { status: resBackward.status };
		}

		const targetsForward = await resForward.json();
		const targetsBackward = await resBackward.json();
		const targetsForwardWithStrand = targetsForward.map(item => ({
			...item,
			strand: 1
		}));
		const targetsBackwardWithStrand = targetsBackward.map(item => ({
			...item,
			strand: -1
		}));
		const targets = targetsForwardWithStrand.concat(targetsBackwardWithStrand).sort((a, b) => b.score - a.score).slice(0, 20);
		const slices = targets.map(tar => {
			const start = tar.strand === 1 ? tar.index - 22 : tar.index - 2;
			const end = tar.strand === 1 ? tar.index + 6 : tar.index + 26;
			return `${location.chr}:${start}..${end}:1`;
		});
		const res2 = await fetch(`https://rest.ensembl.org/sequence/region/${species}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ regions: slices })
		});

		if (!res2.ok) {
			return { status: res2.status };
		}
		const objs = await res2.json();
		const seqs = objs.map(obj => obj.seq);

		const targetsWithSeqs = targets.map((tar, i) => ({
			...tar,
			score: tar.score / 100,
			sequence: tar.strand === 1 ? seqs[i] : comp(seqs[i])
		}));

		return {
			ok: true,
			data: targetsWithSeqs
		};
	} catch (e) {
		return {
			status: 500
		};
	}

}

async function searchLocations(species, gene) {
	try {
		const res = await fetch(`${process.env.FUNCTIONS}/locations-${species}?q=${gene}`);
		if (!res.ok) {
			return { status: res.status };
		}

		const data = await res.json();
		return {
			ok: true,
			data
		};
	} catch (e) {
		return {
			status: 500
		};
	}

}

export { getTargets, searchLocations };