var dataToPie = function(data, name) {
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
  return obj;

}
var dataToCartesian = function(data, name) {
  var newData = Object.keys(data).map(i => data[i]);
  var timeChartData = {
  			labels: newData.map(obj=> moment.unix(obj.x).format('MMM/DDD hh:mm:ss')),
  			datasets: [{
  				label: 'Collected Tweets',
          fill: 'start',
          borderColor: '#0072c2',
          pointBackgroundColor:'#94D6FF',
          pointRadius: 3,
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
  return obj;
}

var dataToBar = function(data, name) {
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

  return obj;
}

var pieIDs = [], pieDatas = [], cartesianIDs = [], cartesianDatas = [], barIDs = [], barDatas = [];


function type(value) {
  return(' <val class="'+typeof(value)+'">' + value + '</val>')
}

function ID(key, depth) {
  return (key + Math.random() + depth);
}
function display(name, value) {

  if(!isNaN(name)) {
    if(typeof(value) != 'undefined') {
      return('Item '+name+':' + type(value));
    }
    return('Item '+ name+':');
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
      return('data charts:');
    case 'temp_times':
      return('Time Chart');
    case 'times':
      return('Time Chart');
    case 'popular':
      return('Popular Tweets')
    case 'config':
      return('configuration info:')

    case 'childQueries':
      return('Requests to Spawn:' + type(value) );
    case 'tooLow':
      return('Low Frequency Definition:' + type(value));
    case 'depth':
      return('Search Depth Goal:' + type(value));

    case 'positiveTweets':
      return('Positive Tweets:' + type(value));
    case 'neutralTweets':
      return('Neutral Tweets:' + type(value));
    case 'negativeTweets':
      return('Negative Tweets:' + type(value));


    case 'searchInfo':
      return('Time Info')
    case 'query':
      return ('Searched for Tweets containing:' + type(value));
    case 'filename':
      return ('Search Filename:' + type(value))
    case 'collectedTweets':
      return ('Tweets Collected:' + type(value) + '<br><br>')
    case 'currentDepth':
      return ('');
    case 'children':
      return('Associated Hashtags:');
    case 'hashtagObjs':
      return('Associated Hashtag Data:');
    case 'count':
      return('Tweets to collect:' + type(value))
    case 'requestTime':
      return('Requested: <val.date>' + moment(value).format('MMM Do : hh:mm:ss') + '</val>');
    case 'startTime':
      return('Search Start: <val.date>' + moment(value).format('MMM Do : hh:mm:ss') + '</val>');
    case 'endTime':
      return('Search End: <val.date>' + moment(value).format('MMM Do : hh:mm:ss') + '</val>');

    case 'window_count':
      return('Windows Elapsed:' + type(value))
    case 'window_average':
      return('Average Tweets per Window:' + type(value))

    case 'low_frequency':
      return('search was too slow:' + type(value))

    default:
      return  (key + ' : ' + value);
  }


}


function crawl(object, depth, originalKey) {
  if(depth > 20) {
    return "";
  }

  var returnHTML = '<div class="chartContainer">';

  if(['emojis', 'words', 'hashtags'].includes(originalKey)) {
    var id = ID(originalKey, depth);
    // converting data...
    var data = {};
    for(key in object) {
      data[key] = object[key];
    }

    returnHTML += '<canvas id="'+ id + '" width="200px" height="100px"></canvas> </div><div class="barContainer">'
    pieDatas.push(data);
    pieIDs.push(id);

    id = ID(originalKey, depth);
    returnHTML += '<canvas id="'+ id + '" width="500px" height="250px"></canvas></div><bracket class="depth'+(depth)+'">}</bracket>'
    barDatas.push(object);
    barIDs.push(id);

    return returnHTML;

  } else if(originalKey == 'types') {
    var id = ID(originalKey, depth);
    // converting data
    var data = {};
    for(key in object) {
      data[key] = object[key];
    }

    returnHTML += '<canvas id="'+ id + '" width="200px" height="100px"></canvas></div><bracket class="depth'+(depth)+'">}</bracket>';
    pieDatas.push(data);
    pieIDs.push(id);

    return returnHTML;

  } else if(originalKey == 'times') {
    returnHTML = '<div class="timeContainer">';

    var id = ID(originalKey, depth);
    returnHTML += '<canvas id="'+ id + '" width="500px" height="250px"></canvas></div><bracket class="depth'+(depth)+'">}</bracket>'
    // console.log(object)
    cartesianDatas.push(object);
    cartesianIDs.push(id);

    return returnHTML;

  }
   else if(originalKey == 'popular') {

    returnHTML = '<div class ="tweet", tweetID="'+ object +'"></div><bracket class="depth'+(depth)+'">}</bracket>'
    return returnHTML;

  } else {
    returnHTML ='<button class="accordion depth'+depth+'">show</button> <br> <ol class="panel">'
    for(key in object) {
      if(typeof(object[key]) == 'object') {
        returnHTML += '<li id="object">' + display(key) + ' <bracket class="depth'+(depth+1)+'">{</bracket> </li>' + crawl(object[key], depth+1, key);
      } else {
        returnHTML += ('<li class="depth'+depth+'"> ' + display(key, object[key]) + '</li>')
      }
    }
    return (returnHTML + '</ol> <bracket class="depth'+(depth)+'">}</bracket>');
  }
}


function jsonDisplay(container, data) {
  var returnHTML = '';

  for(key in data) {
    if(typeof(data[key]) == 'object') {
      returnHTML += '<li id="object">' + display(key) + ' <bracket>{</bracket> </li>' + crawl(data[key], 0, key);
    } else {
      returnHTML += ('<li>' + display(key, data[key]) + '</li>')
    }
  }

  container.innerHTML = returnHTML;
}


var jsonData = $.ajax({
  url: "https://rawgit.com/gummyfrog/frogJson/master/test.json",
  dataType: "json",
}).done(function (data) {

  moment().format();
  var container = document.getElementById("jstree");
  jsonDisplay(container, data);

  for(c=0;c<pieIDs.length;c++) {
    new Chart(document.getElementById(pieIDs[c]), dataToPie(pieDatas[c], ''));
  }

  for(b=0;b<cartesianIDs.length;b++) {
    new Chart(document.getElementById(cartesianIDs[b]), dataToCartesian(cartesianDatas[b], ''));
  }

  for(l=0;l<barIDs.length;l++) {
    new Chart(document.getElementById(barIDs[l]), dataToBar(barDatas[l], ''));
  }

  // window.onload = (function(){
  //
  //   var tweet = document.getElementById("tweet");
  //   var id = tweet.getAttribute("tweetID");
  //
  //   twttr.widgets.createTweet(
  //     id, tweet,
  //     {
  //       conversation : 'none',    // or all
  //       cards        : 'hidden',  // or visible
  //       linkColor    : '#cc0000', // default is blue
  //       theme        : 'light'    // or dark
  //     })
  //   .then (function (el) {
  //     el.contentDocument.querySelector(".footer").style.display = "none";
  //   });
  //
  // });

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    var child = acc[i];
    var p = 0;
    while( (child = child.previousSibling) != null )
      p++;

    var panel = acc[i].parentNode.childNodes[p + 4];
    if(panel.innerHTML == '') {
      acc[i].innerHTML = 'empty';
      acc[i].classList.add('empty');
    }

    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");

        var child = this;
        var g = 0;
        while( (child = child.previousSibling) != null )
          g++;
        var panel = this.parentNode.childNodes[g + 4];
        panel.classList.toggle("transition");

        if(panel.innerHTML == '') {
          this.classList.toggle("active");
        }

    });
  }
});
