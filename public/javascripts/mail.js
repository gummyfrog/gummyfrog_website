function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function download() {
  console.log('download')
  var link = document.createElement('a');
  link.download = 'filename.png';
  link.href = document.getElementById('myCanvas').toDataURL()
  link.click();
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

ctx.font = "30px Helvetica Neue";
ctx.fillText(decodeURI(getQueryVariable('addr')), 150, 250);  

ctx.font = "20px Helvetica Neue"
ctx.fillText("Return Address :-)", 50, 50);  


var button = document.getElementById('btn-download');

button.addEventListener('click', function (e) {
    var dataURL = c.toDataURL('image/png');
    button.href = dataURL;
});