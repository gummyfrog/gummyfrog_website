function createTable(table, data, available) {
  var header = table.insertRow(0);
  var headerData = `<td><h2 class="tableheader"> profit </h2></td>`;

  for(var h=0;h<available.length;h++) {
    headerData += `<td><h2 class="tableheader">${available[h]}</h2></td>`;
  }

  header.innerHTML = headerData;

  for(var r=0;r<data.length;r++) {
    var row = table.insertRow(r+1);
    var rowData = `<td>$${f(data[r].sum)}</td>`

    for(var c=0;c<data[r].combo.length;c++) {
      rowData += `<td>$${f(data[r].combo[c])}</td>`;
    }

    row.innerHTML = rowData;
  }
}


// function createTable(table, data, available) {
//   var tb = `<tr><td><h2 class="tableheader"> sum </h2></td>`;

//   for(var h=0;h<available.length;h++) {
//     tb += `<td><h2 class="tableheader">${available[h]}</h2></td>`;
//   }
//   tb += "</tr>"

//   // header row done

//   for(var r=0;r<data.length;r++) {
//     var rowData = `<tr><td>${data[r].sum}</td>`

//     for(var c=0;c<data[r].combo.length;c++) {
//       rowData += `<td>${data[r].combo[c]}</td>`;
//     }

//     tb += rowData+"</tr>"
//   }

//   table.innerHTML = `<tbody>${tb}</tbody>`;
// }



function jsonDisplay(container, data, available) {
  container.innerHTML = "";
  createTable(container, data, available)
}


function f(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}