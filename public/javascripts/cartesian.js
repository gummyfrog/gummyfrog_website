var values = {
	full: { vals: [1600, 1450, 1300], name: "Full Page"},
	five: { vals: [800, 700, 600], name: "Five Columns"},
	four: { vals: [800, 700, 600], name: "Four Columns"},
	three: { vals: [700, 600, 500], name: "Three Columns"},
	twohw: { vals: [450, 375, 275], name: "Two ½ Columns, Wide"},
	twohs: { vals: [650, 575, 475], name: "Two ½ Columns, Square"},
	two: { vals: [500, 450, 400], name: "Two Columns" },
}

function f(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function cartesian(array) {
	var results = [[]];

	for (var i = 0; i < array.length; i++) {

		var currentSubArray = array[i];
		var temp = [];

		for (var j = 0; j < results.length; j++) {
			for (var k = 0; k < currentSubArray.length; k++) {
				temp.push(results[j].concat(currentSubArray[k]));
			}
		}
		results = temp;
	}
	return results;
}

function break_even(available, goal, valuations) {
	var permutable = [];
	for(var i=0;i<available.length;i++) {
		permutable.push(valuations[available[i]].vals);
	}

	var x = cartesian(permutable)
	x = x.map(a => {
		var sum = a.reduce((total, num)=>total + num);
		return {combo: a, sum: sum}
	})
	.filter(a => a.sum >= goal) // upper bound would be here
	.sort((a, b) => b.sum-a.sum);

	if(x.length != 0) {
		var message = `Displaying ${f(x.length)} results, the highest profit being $${f(x[0].sum)} and the lowest being $${f(x[x.length-1].sum)}.`
		SnackBar({message: message, status:"success"})
		resultsInfo.innerHTML = message;
	}

	return(x);
}


// dom stuff

let inputFields = document.querySelectorAll(".input-field");
let resultsInfo = document.getElementById("resultsInfo")
let formElement = document.getElementById('form');

inputFields.forEach(el => {
	if(el.id != "lower") {
		el.addEventListener('input', getNoOfResults)
	}
})

document.getElementById("calculate").addEventListener("click", calculate)


function calculate() {
	var form = getFormNumbers()
	console.log(form);
	var data = break_even(form.available, form.lower, values);
	display(document.getElementById('jsonDisplay'), data, form.available, values)
}

function getNoOfResults() {
	var form = getFormNumbers();
	var results = Math.pow(values.full.vals.length, form.total);
	var status = "info"
	var ests = Math.round(Math.pow((1.2+(form.total) - (0.05*form.total))/4 , form.total*0.7))

	if(results > 59049) {
		status = "error"
	}
	SnackBar({message:`${f(results)} possible combinations exist. Time to display: ~${f(ests/100)}s`, status: status})
}



function getFormNumbers() {
	var form = document.getElementById('form');
	var available = [];
	var lower = form[form.length-2].value
	var total = 0;

	for(var q=0;q<form.length-2;q++) {
		if(form[q].value > 5 || form[q].value == "") {
			continue
		}

		total += parseInt(form[q].value);

		for(var b=0;b<parseInt(form[q].value);b++) {
			available.push(form[q].id);
		}
	}
	console.log(total);
	return({available: available, lower: lower, total: total});
}
