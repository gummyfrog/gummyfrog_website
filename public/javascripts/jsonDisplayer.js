

var chartFormat = function(data, name) {
  var length = Object.keys(data).length;

  var obj =
  {
    type:"doughnut",
    data: {
      labels:Object.keys(data).sort(function(a,b){return data[b]-data[a]}),
      datasets:[
        {
          label:"Data",
          data:Object.values(data).sort(function(a,b){return b-a}),
          backgroundColor:palette('tol-dv', length).map(color=>'#' + color).reverse()
        }
      ]
    },

    options:
    {
      maintainAspectRatio: false,
      title:
      {
        display:false,
        text:name,
        fontSize:30
      },
      legend:
      {
        display: false
      },
      tooltips:
      {
        bodyFontSize:20,
        positionMode:"nearest"
      }
    }
  }


  // console.log('making new chart with')
  // console.log(Object.keys(data).sort(function(a,b){return data[b]-data[a]}))
  return obj;

}

function display(name, value) {

  if(!isNaN(name)) {
    if(typeof(value) != 'undefined') {
      return('Item ' + name +':  <string>' + value + '</string>');
    }
    return('Item ' + name + ':');

  }


  switch(name) {

    case 'words':
        return('Words');
    case 'emojis':
        return('Emojis');
    case 'hashtags':
        return('Hashtags')
    case 'types':
        return('Types');
    case 'data':
      return('Data');

    case '_query':
      return ('<query-item>Query:  <query-value>"'+value+'"</query-value></query-item>');
    case '_filename':
      return ('Unique ID: <string>' + value +'</string>')
    case 'collectedTweets':
      return ('Tweets Collected: <number>' + value + '</number>')
    case 'currentDepth':
      return ('');
    case 'children':
      return('Associated Hashtags:');
    case 'hashtagObjs':
      return('Associated Hashtag Data:');

    case 'low_frequency':
      return('Low Frequency: <bool>' + value + '</bool>')

    default:
      return  (key + ' | ' + value);
  }


}

var chartsToRender = [];
var dataSets = [];

function crawl(object, depth, originalKey) {
  if(depth > 20) {
    return "";
  }

  var returnHTML = '<div class="chartContainer">';


  if(['emojis', 'words', 'hashtags', 'types'].includes(originalKey)) {
    var id =(originalKey + '-' + Math.random() + '-' + depth);
    var data = {};
    for(key in object) {
      data[key] = object[key];
    }
    returnHTML += '<canvas id="'+ id + '" width="50" height="15 0"></canvas>'
    dataSets.push(data);
    chartsToRender.push(id);
    return returnHTML + '</div><bracket>}</bracket>';

  } else {
    returnHTML ='<button class="accordion depth'+depth+'">+</button> <br> <ol class="panel">'

    for(key in object) {
      if(typeof(object[key]) == 'object') {
        returnHTML += '<li id="object">' + display(key) + ' <bracket>{</bracket> </li>' + crawl(object[key], depth+1, key);
      } else {
        returnHTML += ('<li> ' + display(key, object[key]) + '</li>')
      }
    }

    return (returnHTML + '</ol> <bracket>}</bracket>');
  }
}



var jsonDisplay = function(container, data) {
  var returnHTML = '';

  for(key in data) {

    if(typeof(data[key]) == 'object') {
      returnHTML += '<li id="object">' + display(key) + ' <bracket>{</bracket> </li>' + crawl(data[key], 0, key);
    } else {
      returnHTML += ('<li>' + display(key, data[key]) + '</li>')
    }

  }


  console.log(chartsToRender);
  container.innerHTML += returnHTML;
}




var jsonData = $.ajax({
  url: "https://rawgit.com/gummyfrog/frogJson/master/fopso.json",
  dataType: "json",
}).done(function (data) {
    var container = document.getElementById("jstree");
    jsonDisplay(container, data);
    // new Chart(document.getElementById("words-chart"), chartFormat(data.data.words, 'Word data for ' + data._query));
    // new Chart(document.getElementById("emojis-chart"), chartFormat(data.data.emojis, 'Emoji data for '  + data._query));
    // new Chart(document.getElementById("hashtags-chart"), chartFormat(data.data.hashtags, 'Hashtag data for ' + data._query));
    // new Chart(document.getElementById("type-chart"), chartFormat(data.data.types, 'Type data for ' + data._query));

    for(b=0;b<chartsToRender.length;b++) {
      new Chart(document.getElementById(chartsToRender[b]), chartFormat(dataSets[b], ''));
    }



    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            var child = this;
            var g = 0;
            while( (child = child.previousSibling) != null )
              g++;
            /* Toggle between hiding and showing the active panel */
            var panel = this.parentNode.childNodes[g + 4];
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }

});
