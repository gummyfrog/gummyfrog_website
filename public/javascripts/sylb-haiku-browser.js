var Is = [];
var IIs = [];
var IIIs = [];

var IVs = [];
var Vs = [];
var	VIs = [];

var	VIIs = [];
var VIIIs = [];
var IXs = [];

var Xs = [];
var XIs = [];

var unsortables = [];

var sylbArraysVar = [Is, IIs, IIIs, IVs, Vs, VIs, VIIs, VIIIs, IXs, Xs, XIs, unsortables];

// Actual Code

function sylbcount(word) {
	word = word.toLowerCase();
	if(word == 'shed' || word == 'shes' || word == 'bred') { return 1; }
  	if(word.length <= 3) { return 1; }
   	word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    if(word.match(/[aeiouy]{1,2}/g) != null) {
   		return word.match(/[aeiouy]{1,2}/g).length;
    } else {
    	// position of unsortables in slybarraysvar
    	return 12;
    }
}



count = function(word) {
	word = word.replace(/\d+/g,'').replace(/(\r\n|\n|\r)/gm,"").replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
	return sylbcount(word);
}

singleSort = function(thingToSort) {

	var sortarr = thingToSort.toString().replace(/\d+/g,'').replace(/(\r\n|\n|\r)/gm," ").replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").split(" ");

	sortarr.shift();

	for(i=0; i < sortarr.length; i++) {
 	  sylbArraysVar[ (sylbcount(sortarr[i])-1) ].push(sortarr[i]);

 	}

}

massSort = function(array) {

	array = array.join(' ').replace(/\d+/g,'').replace(/(\r\n|\n|\r)/gm," ").replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
	array = array.split(' ');


 	for(i=0; i < array.length; i++) {
 	  sylbArraysVar[ (sylbcount(array[i])-1) ].push(array[i]);
 	}

}

printDBWords = function() {
	console.log("[ SYLB ] :: Here are your cool words, sorted.");

	for(i=0; i<sylbArraysVar.length; i++)
	{
		console.log(sylbArraysVar[i]);
	}



}

printDBCount = function() {
	console.log("[ SYLB ]\n");
	for(i=0; i<sylbArraysVar.length; i++)
	{
		if(i == sylbArraysVar.length-1) {
						console.log(sylbArraysVar[i].length + ' unsortable words');
		} else {

			if(sylbArraysVar[i].length > 0) {
				console.log(sylbArraysVar[i].length + ' [' + (i+1) + '] syllable words');
			} else {
				console.log(sylbArraysVar[i].length + '!! [' + (i+1) + '] syllable words');
			}

		}


	}
	console.log("\n[ SYLB ]");
}

returnDBCount = function() {

	var returnText = "";
	for(i=0; i<sylbArraysVar.length; i++)
	{
		if(i == sylbArraysVar.length-1) {
						returnText += (sylbArraysVar[i].length + ' unsortable words<br />');
		} else {

			if(sylbArraysVar[i].length > 0) {
				returnText += (sylbArraysVar[i].length + ' [' + (i+1) + '] syllable words<br />');
			} else {
				returnText += (sylbArraysVar[i].length + '!! [' + (i+1) + '] syllable words<br />');
			}

		}
	}

	return returnText;
}

clearCorpus = function() {
	for(i=0; i<sylbArraysVar.length; i++)
	{
		sylbArraysVar[i] = [];
	}



}

// Haiku Generation


var returnline = "";
var finalHaiku = "";


function intToArray(checkInt) {

	if( isNaN(checkInt) )
	{
		return;
	}

	var theArray = sylbArraysVar[ (checkInt-1) ];


	returnline += theArray[Math.floor(Math.random()*theArray.length)];

	returnline += ' ';
}

function lineFromValArray(splitarr) {
	intToArray(splitarr[0]);
	intToArray(splitarr[1]);
	intToArray(splitarr[2]);
	intToArray(splitarr[3]);
	intToArray(splitarr[4]);
	intToArray(splitarr[5]);
	intToArray(splitarr[6]);


	//console.log('[' + splitarr + '] ' + returnline);

	finalHaiku += (returnline + "\n");

	returnline = "";

}

function getIntDividedIntoMultiple(dividend, divisor, multiple) {
    var values = [];
    while (dividend> 0 && divisor > 0)
    {
        var a = Math.round(dividend/ divisor / multiple) * multiple;
        dividend -= a;
        divisor--;
        values.push(a);
    }

    return values;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


haiku = function() {

	finalHaiku = "";

	lineFromValArray(getIntDividedIntoMultiple(5, getRandomInt(1, 5), 1))
	lineFromValArray(getIntDividedIntoMultiple(7, getRandomInt(1, 7), 1))
	lineFromValArray(getIntDividedIntoMultiple(5, getRandomInt(1, 5), 1))

	if(finalHaiku.includes('undefined')) {
		console.log("[ SYLB ] :: You don't have enough sorted words to generate a complete haiku.\n[ SYLB ] :: Try adding words with more syllables.\n")

	}

	return finalHaiku;
}










// true haiku generation



// cheating!

var fiveLineOnes = [ [1, 1, 1, 1, 1] ]
var fiveLineTwos = [ [1, 2, 2], [2, 2, 1], [1, 1, 2, 1] ]
var fiveLineThrees = [ [2, 3], [1, 1, 3], [3, 2] ]
var fiveLineFours = [ [1, 4], [4, 1], [3, 1, 1] ]
var fiveLineFives = [ [5] ]

var sevenLineOnes = [ [1, 1, 1, 1, 1, 1, 1] ]
var sevenLineTwos = [ [1, 1, 1, 2, 2], [2, 2, 2, 1] ]
var sevenLineThrees = [ [2, 3, 2], [3, 3, 1], [3, 2, 1, 1] ]
var sevenLineFours = [ [4, 3], [4, 2, 1], [4, 1, 1, 1] ]
var sevenLineFives = [ [5, 2], [5, 1, 1] ]
var sevenLineSixes = [ [6, 1] ]
var sevenLineSevens = [ [7] ]


var fiveLineVariants = [fiveLineOnes, fiveLineTwos, fiveLineThrees, fiveLineFours, fiveLineFives]
var sevenLineVariants = [sevenLineOnes, sevenLineTwos, sevenLineThrees, sevenLineFours, sevenLineFives, sevenLineSixes, sevenLineSevens]


// no more cheating



var tempLine = "";
var finalHaiku = "";
var nonEmptyArrays = [];



function getNonEmptyArrays() {

	// .length-1 so it doesn't include unsortables array

	nonEmptyArrays = [];

	for(i = 0; i<sylbArraysVar.length-1; i++) {

		if(sylbArraysVar[i].length != 0) {

			nonEmptyArrays.push(sylbArraysVar[i])

		}

	}

}


function wordInSylbArrayFromInt(integer) {
	return sylbArraysVar[integer-1][Math.floor(Math.random()*sylbArraysVar[integer-1].length)];
}



function generateLineFromList(arrayOfSyllables) {

	for(i=0; i<arrayOfSyllables.length; i++) {
		tempLine += wordInSylbArrayFromInt(arrayOfSyllables[i])
		tempLine += " ";
	}

	finalHaiku += (tempLine + '\n');
	tempLine = "";
}

function generateLine(count, maxAvailable) {

	var listVariant = [1];

	if(count == 5) {
		var listToGenerateFrom = fiveLineVariants[Math.floor(Math.random()*maxAvailable)]
		listVariant = listToGenerateFrom[Math.floor(Math.random()*listToGenerateFrom.length)]
	}

	if(count == 7) {
		var listToGenerateFrom = sevenLineVariants[Math.floor(Math.random()*maxAvailable)]
		listVariant = listToGenerateFrom[Math.floor(Math.random()*listToGenerateFrom.length)]
	}


	generateLineFromList(listVariant);


}


trueHaiku = function() {

	finalHaiku = "";
	tempLine = "";

	getNonEmptyArrays();
	var maxAvailableSyllable = nonEmptyArrays.length


	generateLine(5, maxAvailableSyllable)
	generateLine(7, maxAvailableSyllable)
	generateLine(5, maxAvailableSyllable)

	return finalHaiku;
}
