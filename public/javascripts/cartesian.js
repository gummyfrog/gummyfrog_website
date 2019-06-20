var values = {
	full: { vals: [1600, 1450, 1300], name: "Full Page"},
	five: { vals: [800, 700, 600], name: "Five Columns"},
	four: { vals: [800, 700, 600], name: "Four Columns"},
	three: { vals: [700, 600, 500], name: "Three Columns"},
	twohw: { vals: [450, 375, 275], name: "Two ½ Columns, Wide"},
	twohs: { vals: [650, 575, 475], name: "Two ½ Columns, Square"},
	two: { vals: [500, 450, 400], name: "Two Columns" },
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

function break_even(available, profit, goal, valuations) {
	var permutable = [];
	for(var i=0;i<available.length;i++) {
		permutable.push(valuations[available[i]].vals);
	}

	var x = cartesian(permutable)
	x = x.map(a => {
		var sum = a.reduce((total, num)=>total + num);
		return {combo: a, sum: sum}
	})
	.filter(a => a.sum >= goal-profit) // upper bound would be here
	.sort((a, b) => b.sum-a.sum);
	
	console.log(available);
	console.log(x);

	if(x.length != 0) {
		snack(`${x.length} results, the highest profit being $${x[0].sum} and the lowest being $${x[x.length-1].sum}.`)
	}

	return(x);
}

document.getElementById("calculate").addEventListener("click", function(){
	var form = document.getElementById('form');
	var available = [];
	var lower = form[form.length-2].value

	console.log(lower);

	for(var q=0;q<form.length-2;q++) {
		if(form[q].value > 5) {
			break;
		}

		for(var b=0;b<parseInt(form[q].value);b++) {
			available.push(form[q].id);
		}
	}
	var data = break_even(available, 0, lower, values);

	display(document.getElementById('jsonDisplay'), data, available, values)
});


function snack(message) {
  var x = document.getElementById("snackbar");
  x.innerHTML = message;
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
} 

