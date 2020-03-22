const centers = {
	"forward": ["CGTCATCACCACCTCGAGGA", "GAGCACTTCGGGATAACGTA", "CATCCGTATACCACTACATA", "GTAGTGGCTAGCTGGGGCCC", "TTTATGCGTCTGGTCCTGCG", "ATATTGAGCCTCATATTGGC", "CCGAGCTTTCCTGCGTTCAG", "AGTAACGTGTTTAAATGAGA", "TTAGTTATTCGTGGAACGTA", "CCACAATGTGCTCCGGGTTC", "TGTATTCCTTACACAGGGTC", "CTGATAGTGTCAGGGGGGAG", "TCCTCCTAATAATGCGGGCC", "CTTAGTTCTCGCTACGTTCT", "AGCTGCTCTTATCAAAGCGG", "GGCAGCAGACAAGAGAATTT", "GTGAGACGGTATGTGAGAAC", "CAGCAGCTACTCTATGTCGA", "CCGTAGGCTTGGAGGAAAAG", "AGTTCAACTACTCAGAGCGC", "TTTCGTTCCTATTAACAATT", "CGCTGAGGGATACAAAAGCT", "AGAGCCATCCTAAGAGGGTG", "GCCCGGCATGCTGTGGAAAG", "AGAAGCTGCTCGTGGAGGGA", "AGGCAATTGTCGAAAAAACA", "TAATCACCTAATGCACGGGT", "GATGACAAGAACCCTCCAGC", "GGATTAAAATTCCCGCGGTA", "CTGGGCCGATGCTACTAGCC", "ATAAAAAAAGAGTCACGATC", "GCTATTATTCAAGACCACAC", "TATTTCAGTTTTAAGTTGTA", "CCCCTGTCTCGAGTTGCACG", "TTTAGGTGTAATTACTAACA", "AAATTAGTAAGAGGTCTCCC", "CTCCCGTCATTCCACTACCG", "TTAACATACCGCTTTGAGGG", "ATTTAAATACAGTGGTGCTA", "TTGCTTTGTGCGGAAGGTGT", "GTCCCCGAAAAAGATAGTGG", "CCAGTGTATGCCGACTGGGT", "AATTGTTAATGTCTTGGTAA", "TCCCCCGCTTCCAGCTGCAC", "CAGGCGTCTGGAAACAGACC", "TACAGAGTTCTATGGCAAGC", "CTGGGAAGTTTTATGAGACG", "GCCGATCTGAAGTAGCGGGT", "TTAGCCTGGCGCCATAGGAC", "AATTTCGGAGCGCGCTCCGT", "GCCTCAGCCTGCGCGGTCTG", "GAGCCTACAGGGTTGGGACC", "GAACATATCACCGTGCGGGT", "GCGAAGCAATACATCATTCC", "AGGTAAGACCCCGGTCATAT", "GCGGGGGGGTGTGGCCCTAA", "TTCTGATTCAAGGCCGCGGG", "ACATGTGTCGCAAGCACTTA", "CAAGGGACAGATAATAAGGT", "TTTTATCTATAGACTGGCTG", "AGCTTGTTGTGTTAGCTACT", "GAGAACCCGGTTCTAAACGT", "TCTCGATAATAAGGCCCTAG", "TCTCTGGTGATAAGGAGGGA", "AAATAGGGGAGGGGATTGAT", "GCGAGCGCATTCACTGGGGT", "GGGTCGGCTTAAAATTGAGT", "TCCAACATGATCTACATGGG", "CGAAAGCCTGTCAAACTGCG", "ATGTATCAGTTCATCTCGAC"],
	"backward": ["GTTCTACCTTCCTGGCGGGG", "CTTTCAAATAAGCCAAGAGG", "ATTTTAGAATGGAAAATCAG", "CATCATTAGGCTTTTGACGT", "CATGTTTACCGCTAACCATT", "CGCGTCCCTACCTGTTATTG", "GTGCCATCCACTGTTAAAGA", "CGTAATGCGACGAGGGTAAT", "ACATGCTCCAACTGGATTGA", "TTACTGGATCAGTTACGGTC", "AACAATTTTGTCAGCTACGG", "TTAACGTATCTCTCATGGGC", "AGGTGAAACTATATGTGGAG", "TTTAAGGATAATTTACATGC", "AAAACCTTTGGGAGATCAGC", "TACTTATAGCGTTCCCTTTC", "TCGTGGTTGGCTGCTGTGGA", "ACCAACAAAGTTTGGGGGGG", "GGTGTTTATTCTCAAGGAAC", "GGCCCGCATAACTGGCGATC", "AACATTCATTCTGGAGGTGA", "TGTTAATGGGCACCCGCATG", "ATGTAGCCTGAGCACTTGCC", "CTCTTACGAGAAACTTTTCA", "AAAGGACGCTGACAACAGGC", "TGGTAGGTCGAGGGTGCGGT", "TAGGTAGCAACGACGTGTGG", "TGCTAAATTATCCAAAGCAA", "CGAGCGCTCACTATCGAGGC", "CAAAATAAAGCGAACCCATC", "GGACTATTAAGCACTCGACC", "TCCCCCTGTATTGGAAACAA", "TGAAGGTAGGCCCCTAAGAT", "TGCCCGATCTGATACACCTG", "AGAAGCCGGGGCCTAAGTTC", "AGGGACCGACGTAAGGAGCG", "GTATGGCAAGATCATTGAGA", "AGGTGGATAAATGGACCGTC", "TCAGTCTCCTTCGAATTCAT", "AGACTAACCTCAGTGTGCTA", "AGGAAGAACTTGATCATGGA", "CTGATCGTGCCCCAGGTGTC", "GGAGGCAATATTGCCTTAGA", "ATCAGTATACGAGACCTTAC", "AAAAGCCCAAAATCACGGGT", "CGATGAGGTTGCAATCTCCG", "GCTTCTAAATCTGGTATAAG", "GCACTACCGAACTTGACGTT", "CCGGGTTCTAGACAGGTCGA", "TGAAGCTACCCGATCTCTGG", "GTAAGCCGGCATAGATAGGG", "AGATCACAGGCAAATCATAG", "CTGGGCCGACGGATGAGCGA", "GAGGTGGGTTGGTATTATAA", "TTAGAAGGATTTTGTGATGG", "AAGTGTTTCTAACTTTGGAT", "AAGAAACATGATCAGAAGCT", "TGACAGTGATACACTCAGGA", "TTCATCGTGCGTAGAGGATA", "GTGTCTTGGTGCTCTACGAA", "TCCTGGAGAAAGTAATCTAC", "TGGAAGTATAGATAAAATCT", "GGGTTTGGATAGTGATAACT", "ACATTCATTAGACGGAACCA", "ACAAACTCACCGTTTACATC", "CCTTCAACTCCTAAAGCCCT", "CAAAAGCTATCTGGGCTTCA", "GTTGAAGAGAAAGGAGGGCA", "TGTTAAGGTGTGGCTTGCAA", "GTGGTCCCTTGTTCTGCCGC"]
};

const chrCharMap = {
	"1": "1",
	"2": "2",
	"3": "3",
	"4": "4",
	"5": "5",
	"6": "6",
	"7": "7",
	"8": "8",
	"9": "9",
	"a": "10",
	"b": "11",
	"c": "12",
	"d": "13",
	"e": "14",
	"f": "15",
	"g": "16",
	"h": "17",
	"i": "18",
	"j": "19",
	"k": "20",
	"l": "21",
	"m": "22",
	"X": "X",
	"Y": "Y",
	"M": "MT"
};

import mmScores from "../public/mismatch_scores.json";

const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+_";
function fromBase64(encodedRev) {
	const encoded = encodedRev.split("").reverse().join("");
	let ret = 0;
	let c;
	for (let i = 0; i < encoded.length; i += 1) {
		c = encoded.charAt(i);
		ret *= ALPHABET.length;
		ret += ALPHABET.indexOf(c);
	}
	return parseInt(ret);
}

function dnaFromBase4(seq) {
	const map = {
		"0": "A",
		"1": "T",
		"2": "G",
		"3": "C"
	};

	return seq.split("").map(item => map[item]).join("");
}

function hammingDist(seq1, seq2) {
	let count = 0;
	seq1.split("").forEach((letter, i) => {
		if (letter != seq2[i]) {
			count += 1;
		}
	});
	return count;
}

function reverseComp(seq) {
	const map = {
		"A": "T",
		"T": "A",
		"G": "C",
		"C": "G",
		"U": "A"
	};

	return seq.split("").map(letter => map[letter]).reverse().join("");
}

function calculateScore(target, offTarget) {
	let score = 1.0;

	target.split("").forEach((letter, i) => {
		if (offTarget[i] == letter) {
			return;
		}

		let offTargetRnaLetter = offTarget[i] === "T" ? "U" : offTarget[i];
		let targetRnaLetter = letter === "T" ? "U" : letter;
		let key = `r${targetRnaLetter}:d${reverseComp(offTargetRnaLetter)},${i + 1}`;
		score *= mmScores[key];
	});

	return score;
}

function getClosestCenters(seq, strand) {
	let arr = centers[strand].slice();
	arr.sort((a, b) => hammingDist(seq, a) - hammingDist(seq, b));
	return arr;
}

function format(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function lerpColor(colorFrom, colorTo, amount) {
	const ah = parseInt(colorFrom.replace(/#/g, ""), 16),
		ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
		bh = parseInt(colorTo.replace(/#/g, ""), 16),
		br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
		rr = ar + amount * (br - ar),
		rg = ag + amount * (bg - ag),
		rb = ab + amount * (bb - ab);

	return "#" + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

function getOffRanges(seq1, seq2) {
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
}

function map(num, inMin, inMax, outMin, outMax) {
	return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export {
	map,
	centers,
	format,
	getOffRanges,
	lerpColor,
	getClosestCenters,
	fromBase64,
	calculateScore,
	reverseComp,
	dnaFromBase4,
	chrCharMap
};