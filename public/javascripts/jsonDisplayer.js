

var chartFormat = function(data, name) {
  var length = Object.keys(data).length;

  var obj =
  {
    type:"pie",
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
      cutoutPercentage: 30,
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


var timeFormat = function(data, name) {
  var newData = Object.keys(data).map(i => data[i]);

  var timeChartData = {
  			labels: newData.map(obj=> moment.unix(obj.x).format('MMM/DDD hh:mm:ss')),
  			datasets: [{
  				label: 'Collected Tweets',
          fill: 'start',
          borderColor: '#192466',
  				borderWidth: 1,
  				data: newData
  			}]

  		};


  var obj =
  {
    type:"line",
    data: timeChartData,

    options: {
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0,
        }
      },
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

  console.log(newData.map(obj=> obj.x));
  return obj;

}



var barFormat = function(data, name) {
  var newData = Object.keys(data).map(i => data[i]);

  var barChartData = {
  			labels: Object.keys(data),
  			datasets: [{
  				label: '',
          borderColor: '#192466',
  				borderWidth: 1,
  				data: newData,
          backgroundColor:palette('tol-dv', newData.length).map(color=>'#' + color).reverse()
  			}]

  		};


  var obj =
  {
    type:"horizontalBar",
    data: barChartData,

    options: {
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

  console.log(newData.map(obj=> obj.x));
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
    case 'temp_times':
      return('Time Chart');
    case 'times':
      return('Time Chart');
    case 'popular':
      return('Popular Tweets')
    case 'config':
      return('Search Configuration')

    case 'childQueries':
      return('Requests to Spawn: <number>' + value + '</number>');
    case 'tooLow':
      return('Low Frequency Definition: <number>' + value + '</number>');
    case 'depth':
      return('Search Depth Goal: <number>' + value + '</number>');

    case 'searchInfo':
      return('Misc. Info')
    case 'query':
      return ('<query-item>Query:  <query-value>"'+value+'"</query-value></query-item>');
    case 'filename':
      return ('Unique ID: <string>' + value +'</string>')
    case 'collectedTweets':
      return ('Tweets Collected: <number>' + value + '</number>')
    case 'currentDepth':
      return ('');
    case 'children':
      return('Associated Hashtags:');
    case 'hashtagObjs':
      return('Associated Hashtag Data:');
    case 'count':
      return('Tweet Goal: <number>' + value + '</number>')
    case 'requestTime':
      return('Requested: <date>' + moment(value).format('MMM Do : hh:mm:ss') + '</date>');
    case 'startTime':
      return('Search Start: <date>' + moment(value).format('MMM Do : hh:mm:ss') + '</date>');
    case 'endTime':
      return('Search End: <date>' + moment(value).format('MMM Do : hh:mm:ss') + '</date>');

    case 'window_count':
      return('Windows Elapsed: <number>' + value + '</number>')
    case 'window_average':
      return('Average Tweets per Window: <number>' + value + '</number>')

    case 'low_frequency':
      return('Low Frequency: <bool>' + value + '</bool>')

    default:
      return  (key + ' | ' + value);
  }


}

var chartsToRender = [];
var dataSets = [];

var timesToRender = [];
var timeDataSets = [];

var barsToRender = [];
var barDataSets = [];



function crawl(object, depth, originalKey) {
  if(depth > 20) {
    return "";
  }

  var returnHTML = '<div class="chartContainer">';


  if(['emojis', 'words', 'hashtags', 'types'].includes(originalKey)) {
    // var id =(originalKey + '-' + Math.random() + '-' + depth);
    // var data = {};
    // for(key in object) {
    //   data[key] = object[key];
    // }
    // returnHTML += '<canvas id="'+ id + '" width="200px" height="100px"></canvas>'
    //
    // dataSets.push(data);
    // chartsToRender.push(id);
    // return returnHTML + '</div><bracket>}</bracket>';
    // just pie chart code

    var id =(originalKey + '-' + Math.random() + '-' + depth);
    var data = {};
    for(key in object) {
      data[key] = object[key];
    }

    returnHTML += '<canvas id="'+ id + '" width="200px" height="100px"></canvas>'

    dataSets.push(data);
    chartsToRender.push(id);
    returnHTML += '</div>';

    returnHTML += '<div class="barContainer">';

    var id =(originalKey + '-' + Math.random() + '-' + depth);
    returnHTML += '<canvas id="'+ id + '" width="500px" height="250px"></canvas>'

    barDataSets.push(object);
    barsToRender.push(id);
    return returnHTML + '</div><bracket>}</bracket>';

  } else if(originalKey == 'times') {

    returnHTML = '<div class="timeContainer">';
    var id =(originalKey + '-' + Math.random() + '-' + depth);
    returnHTML += '<canvas id="'+ id + '" width="500px" height="250px"></canvas>'
    console.log('carth')
    console.log(object)
    timeDataSets.push(object);
    timesToRender.push(id);
    return returnHTML + '</div><bracket>}</bracket>';

  }
   else if(originalKey == 'popular') {

    returnHTML = '<div class ="tweet", tweetID="'+ object +'"></div>'

    return returnHTML + '</div><bracket>}</bracket>';

  } else{

    returnHTML ='<button data-balloon="Click to show data." data-balloon-pos="right" class="accordion depth'+depth+'"></button> <br> <ol class="panel">'

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
  container.innerHTML = returnHTML;
}


  var jsonData = $.ajax({
    url: "https://rawgit.com/gummyfrog/frogJson/master/flopp.json",
    dataType: "json",
  }).done(function (data) {
      moment().format();
      var container = document.getElementById("jstree");
      jsonDisplay(container, data);

      for(c=0;c<chartsToRender.length;c++) {
        new Chart(document.getElementById(chartsToRender[c]), chartFormat(dataSets[c], ''));
      }

      for(b=0;b<timesToRender.length;b++) {
        // timeFormat(timeDataSets[b], '')
        new Chart(document.getElementById(timesToRender[b]), timeFormat(timeDataSets[b], ''));
      }

      for(l=0;l<barsToRender.length;l++) {
        // timeFormat(timeDataSets[b], '')
        new Chart(document.getElementById(barsToRender[l]), barFormat(barDataSets[l], ''));
      }


      window.onload = (function(){

        var tweet = document.getElementById("tweet");
        var id = tweet.getAttribute("tweetID");

        twttr.widgets.createTweet(
          id, tweet,
          {
            conversation : 'none',    // or all
            cards        : 'hidden',  // or visible
            linkColor    : '#cc0000', // default is blue
            theme        : 'light'    // or dark
          })
        .then (function (el) {
          el.contentDocument.querySelector(".footer").style.display = "none";
        });

      });

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
