var videos = ["images/gallery.mp4", "images/gridpop.mp4", "images/temperature.mp4"];
var currentIndex = 0;
var display = document.getElementById('display');

document.getElementById("galleryButton").addEventListener("click", function(){
  currentIndex++;
  if(currentIndex >= videos.length) {
    currentIndex = 0;
  }

  display.src = videos[currentIndex];

});
