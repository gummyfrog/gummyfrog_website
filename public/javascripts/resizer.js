function listFiles() {
  var input = document.getElementById('filesToUpload');
  var list = document.getElementById('fileList');

  //empty list for now...
  while (list.hasChildNodes())
  {
  	list.removeChild(list.firstChild);
  }

  //for every file...
  for (var x = 0; x < input.files.length; x++)
  {
    readURL(input.files[x], x)
  	//add to list
  	var li = document.createElement('li');
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
              var encase = document.createElement("a");

              encase.href = src;
              encase.download = 'resized-' + index + '-' + input.name
              encase.target = "_blank";

              resized.appendChild(encase);

              var img = document.createElement("img");
              img.style.width = "100px";
              img.style.height = "100px";
              console.log(src);
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
