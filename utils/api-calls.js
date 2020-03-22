import { fromBase64, getClosestCenters, calculateScore, dnaFromBase4, chrCharMap } from "./index";
import fetch from "isomorphic-unfetch";

async function getOffTargetsChunks(loadedClusters, limit, species, seq, strand, cb) {
	const closestCenters = getClosestCenters(seq, strand);
	let countCompleted = 0;
	let countSend = 0;

	const reqPromises = [];
	for (let i = 0; i < closestCenters.length; i++) {
		const center = closestCenters[i];

		if (loadedClusters[center]) {
			continue;
		}
		if (countSend >= limit) {
			break;
		}
		countSend += 1;
		const reqPromise = getOffTargets(center, species, seq, strand)
			.then(data => {
				loadedClusters[center] = true;
				cb(data, null);

				countCompleted += 1;
			}).catch(err => cb(null, err));
		reqPromises.push(reqPromise);
	}

	await Promise.all(reqPromises);
	return [countCompleted, countSend, loadedClusters];
}

async function getOffTargets(center, species, seq, strand) {
	const resOffTargets = await fetch(`${process.env.FUNCTIONS}/off-targets-${species}-${center}-${strand}?seq=${seq}`);
	if (!resOffTargets.ok) {
		throw { status: resOffTargets.status };
	}
	const data = await resOffTargets.json();
	if (!data.length) {
		return {
			ok: true,
			data: []
		};
	}

	const displaySlices = [];
	data.forEach(offs => {
		const splittedData = offs.locations.split(",");
		const seq = dnaFromBase4(fromBase64(offs.seq).toString(4)).padStart(20, "A");
		splittedData.forEach(item => {
			const chr = chrCharMap[item[0]];
			const index = fromBase64(item.slice(1));
			displaySlices.push({
				seq,
				chr,
				index
			});
		});
	});

	let newData = displaySlices.map(item => ({
		score: calculateScore(seq, item.seq),
		...item
	}));
	return {
		ok: true,
		data: newData
	};
}

async function getTargets(species, location) {
	const resForwardPromise = fetch(`${process.env.FUNCTIONS}/targets-${species}-${location.chr}-forward?start=${location.zoomStart}&end=${location.zoomEnd}`);
	const resBackwardPromise = fetch(`${process.env.FUNCTIONS}/targets-${species}-${location.chr}-backward?start=${location.zoomStart}&end=${location.zoomEnd}`);
	const [resForward, resBackward] = await Promise.all([resForwardPromise, resBackwardPromise]);

	if (!resForward.ok) {
		throw { status: resForward.status };
	}

	if (!resBackward.ok) {
		throw { status: resBackward.status };
	}

	const targetsForwardPromise = resForward.json();
	const targetsBackwardPromise = resBackward.json();
	const [targetsForward, targetsBackward] = await Promise.all([targetsForwardPromise, targetsBackwardPromise]);
	const targetsForwardWithStrand = targetsForward.map(item => ({
		...item,
		strand: "forward"
	}));
	const targetsBackwardWithStrand = targetsBackward.map(item => ({
		...item,
		strand: "backward"
	}));
	const targets = targetsForwardWithStrand.concat(targetsBackwardWithStrand).sort((a, b) => b.score - a.score).slice(0, 20);
	const slices = targets.map(tar => {
		const start = tar.strand === "forward" ? tar.index - 22 : tar.index - 2;
		const end = tar.strand === "forward" ? tar.index + 6 : tar.index + 26;
		const ensStrand = tar.strand === "forward" ? "1" : "-1";
		return `${location.chr}:${start}..${end}:${ensStrand}`;
	});
	const res2 = await fetch(`https://rest.ensembl.org/sequence/region/${species}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ regions: slices })
	});

	if (!res2.ok) {
		throw { status: res2.status };
	}
	const objs = await res2.json();
	const seqs = objs.map(obj => obj.seq);

	const targetsWithSeqs = targets.map((tar, i) => ({
		...tar,
		score: tar.score / 100,
		seq: seqs[i]
	}));

	return {
		ok: true,
		data: targetsWithSeqs
	};

}

async function searchLocations(species, q) {
	const res = await fetch(`${process.env.FUNCTIONS}/locations-${species}?q=${q}`);
	if (!res.ok) {
		throw { status: res.status };
	}

	const data = await res.json();
	return {
		ok: true,
		data
	};
}

export { getTargets, getOffTargets, searchLocations, getOffTargetsChunks };