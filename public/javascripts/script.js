var urls = ['k6vez','6z1sb','jh5hn','ksb0r','hvhvf','of9iz','j2d2z','k98aj','ewbuj','9jfej']

function random() {
  return urls[Math.floor(Math.random() * urls.length)];
}




var jsonData = $.ajax({
  url: 'https://api.myjson.com/bins/' + random(),
  dataType: 'json',
}).done(function (data) {

  new Chart(document.getElementById("emoji-chart1"), data)

});

var jsonData = $.ajax({
  url: 'https://api.myjson.com/bins/' + random(),
  dataType: 'json',
}).done(function (data) {

  new Chart(document.getElementById("emoji-chart2"), data)

});
