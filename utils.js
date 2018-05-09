
function dot(a, b)
{
	var ret = 0;
	for (var i = 0; i < a.length; i++) {
		ret += a[i]*b[i];
	}
	return ret;
}

function dotNorm(a, b)
{
	var ret = 0;
	for (var i = 0; i < a.length; i++) {

		ret += a[i]*b[i]/(vlen(a)*vlen(b));
	}
	return ret;
}

function vlen(a)
{
	var ret = 0;
	for (var i = 0; i < a.length; i++){
		ret += a[i]*a[i];
	}
	return Math.sqrt(ret);
}

function subtract(a, b)
{
	var c = [];
	for (var i = 0; i < a.length; i++)
	{
		c.push(a[i] - b[i]);
	}
	return c;
}

function dotAllNorm(vecs, a, n)
{
	var wordlist = Object.keys(vecs);
	var ret = [];
	for (var i = 0; i < wordlist.length; i++) {
		ret.push([wordlist[i], dotNorm(a, vecs[wordlist[i]])]);
	}
	ret.sort(function(a, b) { return b[1] - a[1]});
	return ret.splice(0, n);
}

function getWithAxes(vecs, words, a, b)
{
	wordsKeys = Object.keys(words);
	var plotData = [];
	for (var i = 0; i < wordsKeys.length; i++)
	{
		plotData.push({
			word: wordsKeys[i],
			a_axis: dotNorm(getvector(wordsKeys[i]), a),
			b_axis: dotNorm(getvector(wordsKeys[i]), b),
			group: words[wordsKeys[i]]
		});
	}
	return plotData;
}


function getvector(word) {
	var data   ;
	var url = "../../polls/vector_one_word?vector_one_word=" + word;
	// d3.json(url, function(ds) {
	// 	data = ds;
	// });

    $.ajax({
        type: "GET",
        url: url,
        async: false,
        success : function(ds) {
            data =  JSON.parse(ds);
            // console.log(ds);
            // console.log(typeof data);
        }
    });


	return data

}



function getWithAxesJson(vecs, jsonData)
{
	var vector_x_axis_0  = getvector(jsonData.xAxis[0]);
	var vector_x_axis_1  = getvector(jsonData.xAxis[1]);
	var vector_y_axis_0  = getvector(jsonData.yAxis[0]);
	var vector_y_axis_1  = getvector(jsonData.yAxis[1]);
	var a_axis = subtract(vector_x_axis_0, vector_x_axis_1);
	var b_axis = subtract(vector_y_axis_0,vector_y_axis_1);

	return getWithAxes(vecs, jsonData.flat, a_axis, b_axis);
}

function getWithAxesJson1(vecs, jsonData)
{
	var a_axis = subtract(vecs[jsonData.xAxis[0]], vecs[jsonData.xAxis[1]]);
	var b_axis = subtract(vecs[jsonData.yAxis[0]], vecs[jsonData.yAxis[1]]);

	return getWithAxes(vecs, jsonData.flat, a_axis, b_axis);
}

function getVec(word)
{
	if (word in vecs) return word;
	else {
		alert("Word " + word + " not in data.")
		return [-1000];
	}
}
