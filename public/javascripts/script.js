var urls = ['1argwz','12ltxf','w229v','11eypv','71uv7','u9rgj','tm6oz','t0r37','mgzfn','rtvvn','r8g9v','1egcv7','q1l2b','17b5lv','6zppf','6ea3n','1hddqb','ywxz7','1g6iir','wj7k3','vxryb','6c4xv','1bcwir']

function random() {
  return urls[Math.floor(Math.random() * urls.length)];
}




var jsonData = $.ajax({
  url: 'https://api.myjson.com/bins/' + random(),
  dataType: 'json',
}).done(function (data) {

  data.options.legend = {display: false};
  new Chart(document.getElementById("emoji-chart1"), data)

});

var jsonData = $.ajax({
  url: 'https://api.myjson.com/bins/' + random(),
  dataType: 'json',
}).done(function (data) {
  data.options.legend = {display: false};
  new Chart(document.getElementById("emoji-chart2"), data)

});
