
function createTable(table, data, available, valuations) {
  var tb = `<tr><td><h2 class="tableheader"> profit </h2></td>`;

  for(var h=0;h<available.length;h++) {
    tb += `<td><h2 class="tableheader">${available[h]}</h2></td>`;
  }
  tb += "</tr>"

  // header row done

  for(var r=0;r<data.length;r++) {
    var rowData = `<tr class="tableRow"><td class="sum">$${f(data[r].sum)}</td>`

    for(var c=0;c<data[r].combo.length;c++) {
      var value = (valuations[available[c]].vals.indexOf(data[r].combo[c]));
      rowData += `<td class= "v${value}">$${f(data[r].combo[c])}</td>`;
    }

    tb += rowData+"</tr>"
  }

  table.innerHTML = `<tbody>${tb}</tbody>`;
}

function display(container, data, available, values) {
  container.innerHTML = "";
  var t0 = performance.now();
  createTable(container, data, available, values)
  var t1 = performance.now();
}


function f(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}