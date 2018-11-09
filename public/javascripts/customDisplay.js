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

  if(value == undefined) {
    return  (key + ': ')
  }

  switch(name) {

    case 'words':
        return('Words');

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
    var arr = []
    while(arr.length < 4){
        var randomnumber = Math.floor(Math.random()*Object.keys(object).length) + 1;
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }


    returnHTML = '<li class="tweetList, depth'+depth+'">'
    for(i=0;i<arr.length;i++) {
        returnHTML += '<div class="tweet", tweetID="'+ object[arr[i]] +'"></div>'

    }
    returnHTML += '</li>'

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
  console.log(data);
  var returnHTML = '';

  for(key in data) {
    if(typeof(data[key]) == 'object') {
      returnHTML += '<li id="object">' + display(key) + ' <bracket>{</bracket> </li>' + crawl(data[key], 0, key);
    } else {
      returnHTML += ('<li>' + display(key, data[key]) + '</li>')
    }
  }

  container.innerHTML = returnHTML;

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
}


