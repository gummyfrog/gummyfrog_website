function type(value) {
  return(`<val class="${typeof(value)}"> ${value} </val>`)
}

function display(name, value) {
  if(!isNaN(name)) {
	 if(typeof(value) != 'undefined') {
		return(`${type(value)}`);
	 }
	 return(`${type(value)}`);
  }

  if(value == undefined) {
	 return  (key + ':')
  }

  switch(name) {
	 case 'words':
		  return('Words');

	 default:
		return  (`${key}: ${type(value)}`);
  }
}


function crawl(object, depth, originalKey) {
  if(depth > 20) {
	 return "";
  }
	returnHTML = (`<li class="object"> ${display(originalKey)} </li> <button class="accordion depth${depth}">show</button> <br> <ol class="panel">`)
	for(key in object) {
	  if(typeof(object[key]) == 'object') {
		 returnHTML += (`${crawl(object[key], depth+1, key)}`);
	  } else {
		 returnHTML += (`<li class="depth${depth}"> ${display(key, object[key])}</li>`);
	  }
	}
	return (`${returnHTML} </ol>`);
}


function jsonDisplay(container, data) {
  var returnHTML = '';

  for(key in data) {
	 if(typeof(data[key]) == 'object') {
	  returnHTML += (`${crawl(data[key], 0, key)}`);
	 } else {
		returnHTML += (`<li> ${display(key, data[key])} </li>`)
	 }
  }

  container.innerHTML = returnHTML;

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
	 var child = acc[i];
	 var p = 0;
	 while( (child = child.previousSibling) != null )
		p++;

	 var panel = acc[i].parentNode.childNodes[p + 4];
	 if(panel.innerHTML == '') {
		acc[i].innerHTML = 'empty';
		acc[i].classList.add('empty');
	 }

	 acc[i].addEventListener("click", function() {
		  this.classList.toggle("active");

		  var child = this;
		  var g = 0;
		  while( (child = child.previousSibling) != null )
			 g++;
		  var panel = this.parentNode.childNodes[g + 4];
		  panel.classList.toggle("transition");

		  if(panel.innerHTML == '') {
			 this.classList.toggle("active");
		  }

	 });
  }
}


$.ajax({
	url: "/smashjson/"
}).done((data) => {
	var container = document.getElementById("buttonContainer");
	for(var x=0;x<data.length;x++) {	
		container.innerHTML += `
		<button class="smashgo" id="/smashjson/${data[x]}"> Display ${data[x]} <url>`
	}

	var buttons = [...document.getElementsByClassName("smashgo")]
	buttons.forEach((button) => {
		console.log(button);
		button.onclick = () => (display_smash(button.id))
	})

})

var element = document.getElementsByClassName("smashtree")[0];

function display_smash(url) {
	var jsonData = $.ajax({
		url: url,
		dataType: "json",
	})
	.done((data) => {
		jsonDisplay(element, data)
	})
	.fail((err) => {
		console.log(err);
	})
}


