var urls = ['1argwz','12ltxf','w229v','11eypv','71uv7','u9rgj','tm6oz','t0r37','mgzfn','rtvvn','r8g9v','1egcv7','q1l2b','17b5lv','6zppf','6ea3n','1hddqb','ywxz7','1g6iir','wj7k3','vxryb','6c4xv','1bcwir']

for(i=0;i<urls.length;i++) {
  chart(i);
}

function chart(i) {
  var jsonData = $.ajax({
    url: 'https://api.myjson.com/bins/' + urls[i],
    dataType: 'json',
  }).done(function (data) {

    new Chart(document.getElementById("emojiCanvas-"+i), data)

  });
}
