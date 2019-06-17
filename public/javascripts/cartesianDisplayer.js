function createTable(table, data, available) {
  var header = table.insertRow(0);
  var sum = header.insertCell(0);
  sum.innerHTML = `<h2 class="tableheader"> sum </h2>`;

  for(var h=0;h<available.length;h++) {
    var hcell = header.insertCell(h+1);
    hcell.innerHTML = `<h2 class="tableheader">${available[h]}</h2>`;
  }

  for(var r=0;r<data.length;r++) {
    var row = table.insertRow(r+1);

    var sum = row.insertCell(0);
    sum.innerHTML = data[r].sum;

    for(var c=0;c<data[r].combo.length;c++) {
      var cell = row.insertCell(c+1);
      cell.innerHTML = data[r].combo[c]
    }
  }


}

function jsonDisplay(container, data, available) {
  container.innerHTML = "";
  createTable(container, data, available)
  var returnHTML = `<ol class="cartesian">
  <li><h2> ${available} </h2></li>`;

  for(var x=0;x<data.length;x++) {
      returnHTML += (`<li> ${data[x].sum} ${data[x].combo} </li>`)
  }
  // container.innerHTML = returnHTML + '</ol>';

}