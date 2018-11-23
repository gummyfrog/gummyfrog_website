function displayEmbed(data) {
  var keys = Object.keys(data);
  var returnHTML = '';
  for(i=0;i<keys.length;i++) {
    var key = keys[i];
    returnHTML += embed(data[key], key, data[key]['last'], data[key]['desc'])
  }

  return(returnHTML)
};

function type(val) {
  if(val == "offline" || val == "online") {
    return(`<${val}>${val}</${val}>`);
  }
  return(`<${typeof(val)}>${val}</${typeof(val)}>`);
}

function embed(data, key, time, desc) {
  var info = Object.keys(data).map((key) => {
    if(key == 'last' || key == 'desc') {
      return;
    };

    return `<span class="item">${key.replace('-', ' ')}: ${type(data[key])}</span>`
  })

  console.log(info);
  return(`
    <div class="embed status" id="${key}">

    <div class="titleBar">
      <span class="titleText">${key}</span>
      <span class="infoText">⏰ ${time}</span>
    </div>

    <div class="desc">
      <span>${desc}</span>
    </div>

    <div class="embedContent">${info.join('\n')}</div>
    </div>`)
};


function jsonDisplay(container, data) {
  console.log(data);
  if(data) {
    container.innerHTML = displayEmbed(data);
  }
};
