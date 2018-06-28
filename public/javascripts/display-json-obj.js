var urls = ['j834i'];

function chart(url) {
  var jsonData = $.ajax({
    url: 'https://api.myjson.com/bins/' + url,
    dataType: 'json',
  }).done(function (data) {

    console.log(data);
  });
}


console.log('Hello :)');



chart('j834i');
