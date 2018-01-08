function listFiles() {
  var input = document.getElementById('filesToUpload');
  var list = document.getElementById('fileList');
  var error = document.getElementById('resizeErrorText');


  while (list.hasChildNodes())
  {
    list.removeChild(list.firstChild);
  }


  if(!input.files) {
    error.innerHTML = "Upload a file first!";
  }



  for (var i=0; i<input.files.length;i++) {
    if (input.files[i].type != 'image/png' && input.files[i].type != 'image/jpeg') {
      console.log(input.files[i].type);
      error.innerHTML = "PNGs and JPEGs only, please.<br/>" + input.files[i].name + " is " + input.files[i].type;
      return;
    }
  }


  // clear of errors!


  //empty list for now...

  //for every file...
  for (var x = 0; x < input.files.length; x++)
  {
    readURL(input.files[x], x)
  	//add to list

  	var li = document.createElement('li');
    li.id = input.files[x].name;
  	li.innerHTML = 'File ' + (x + 1) + ':  ' + input.files[x].name;
  	list.append(li);
  }


}


function readURL(input, index) {
  console.log('Processing:')
  console.log(input.name);
  console.log('\n');
  var reader = new FileReader();

  reader.onload = function (e) {
    Jimp.read(e.target.result).then(function (len) {
    len
        .background(0xFFFFFFFF)
        .contain(1080, 1080)       // set greyscale
        .getBase64(Jimp.MIME_JPEG, function (err, src) {
              var parent = document.getElementById(input.name);
              var encase = document.createElement("a");
              encase.href = src;
              encase.download = 'resized-' + index + '-' + input.name
              encase.target = "_blank";

              parent.innerHTML = ("")
              parent.appendChild(encase);

              var img = document.createElement("img");
              img.style.padding = "10px 20px";
              img.style.width = "200px";
              img.style.height = "200px";
              img.setAttribute("src", src);
              img.setAttribute("href", src);
              encase.appendChild(img);
         });
       }).catch(function (err) {
         console.error(err);
       });
  };

  reader.readAsDataURL(input);
}
