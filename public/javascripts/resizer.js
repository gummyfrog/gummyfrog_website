var zip = new JSZip();
var imageFolder = zip.folder("images");

var currentFileCount = 0;
var zipFileCount = 0;

function reset() {
  currentFileCount = 0;
  zipFileCount = 0;
  zip = new JSZip();
  imageFolder = zip.folder("images");
  var elem = document.getElementById('zipbutton');
  if(elem) {
    elem.parentNode.removeChild(elem);
  }

}

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

  console.log(input.files);

  for (var i=0; i<input.files.length;i++) {
    if (input.files[i].type != 'image/png' && input.files[i].type != 'image/jpeg') {
      error.innerHTML = input.files[i].name + " is a '" + input.files[i].type + "' file.<br>Please only upload PNGs and JPEGs!";
      return;
    }
  }

  // clear of errors!
  //for every file...

  console.log("Starting...");
  for (var x = 0; x < input.files.length; x++)
  {
    zipFileCount = x;
    readURL(input.files[x], x)
  	//add to list

    var placeholderImg = document.createElement('img');
    var name = document.createElement('p');
    name.innerHTML = 'File ' + (x + 1) + ':  ' + input.files[x].name;
  	var li = document.createElement('li');
    placeholderImg.setAttribute('src', 'http://placehold.it/150x150');

    li.append(placeholderImg);
    li.append(name);

    li.id = input.files[x].name;
    placeholderImg.id = input.files[x].name + '-img';
    name.id = input.files[x].name + '-name';
  	list.append(li);
    console.log(x+1 + ' / ' + input.files.length);
  }
  console.log('Done.')


}

function processedImageInZip() {
  currentFileCount++;
  if(currentFileCount == zipFileCount+1) {
    console.log("Creating zip button...");
    var parent = document.getElementById("zipButtonGoesHere");

    var downloadZipButton = document.createElement("button");
    downloadZipButton.innerHTML = "Download Zip"
    downloadZipButton.setAttribute("id", "zipbutton")
    parent.appendChild(downloadZipButton);

    downloadZipButton.addEventListener ("click", function() {
      downloadZip();
    });

  }
}

function downloadZip() {
  zip.generateAsync({type:"blob"})
  .then(function(content) {
      console.log(zip.files);
      saveAs(content, "resized-images.zip");
  });
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


              //parent.innerHTML = ("")
              parent.appendChild(encase);

              var img = document.getElementById(input.name+'-img');
              //img.style.padding = "10px 20px";
              img.style.width = "150px";
              img.style.height = "150px";
              img.setAttribute("src", src);
              img.setAttribute("href", src);

              toDataURL(src, function(DataUrl) {
                console.log(DataUrl);
                imageFolder.file(input.name, DataUrl.split(',')[1], {base64: true});
              });
              console.log('Saving file');
              processedImageInZip();

              encase.appendChild(img);
         });
       }).catch(function (err) {
         console.error(err);
       });
  };

  reader.readAsDataURL(input);
}


// not my code, i love you!
function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}
