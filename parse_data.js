// function nay lay ra cac word lam axis
function getParsedExample( exampleData) {
	if (exampleData.words.length > 0) {
		exampleData["flat"] = {};
		for (var j = 0; j < exampleData.words.length; j++) {
			for (var u = 0; u < exampleData.words[j].length; u++) {
				var words = exampleData.words[j][u];
				var vector = getvector(words);
				if (vector =="error") {
					alert("No vector values for word " + exampleData.words[j][u] + "." );
				}
				else {
					exampleData.flat[exampleData.words[j][u]] = j;
				};
			}
		}
		exampleData.groupsNumber = exampleData.words.length;
	}
	// đoạn này cần phải sửa lại.
	else {
		exampleData["flat"] = {};

	}
	return exampleData;
}


function getParsedExample1(vecs, exampleData) {
	if (exampleData.words.length > 0) {
		exampleData["flat"] = {};
		for (var j = 0; j < exampleData.words.length; j++) {
			for (var u = 0; u < exampleData.words[j].length; u++) {
				if (!(exampleData.words[j][u] in vecs)) {
					alert("No vector values for word " + exampleData.words[j][u] + "." );
				}
				else {
					exampleData.flat[exampleData.words[j][u]] = j;
				}
			}
		}
		exampleData.groupsNumber = exampleData.words.length;
	}
	else {
		exampleData["flat"] = {};
		var similarList = dotAllNorm(vecs,
			vecs[exampleData.findClosest.word],
			exampleData.findClosest.n);
		// console.log("similar to " + exampleData.findClosest.word + ":" + similarList);
		var it = 0;
		for (word in similarList) {
			exampleData.flat[similarList[it][0]] = it;
			it++;
		}
		exampleData.groupsNumber = it;
	}
	return exampleData;
}
