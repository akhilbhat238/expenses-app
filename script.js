"use strict";
const container = document.querySelector(".container");
const dispTable = document.querySelector("#finance-table");

// const renderTable = function (data) {
//   const html = `<table>
//   <th>Category</th>
//   <th>Amount</th>
//   </table>`;
//   container.insertAdjacentHTML("beforeend", html);
// };

const getFinanceData = function () {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://shark-app-pytes.ondigitalocean.app/annual_expense"
  );
  request.send();

  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    for (const property in data) {
      console.log(`${property}: ${data[property]}`);
      var row = dispTable.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = property;
      cell2.innerHTML =
        Math.round((data[property] + Number.EPSILON) * 100) / 100;
    }
  });
};
getFinanceData();

var numb = 8374848959.4863318274862938;
var rounded = Math.round((numb + Number.EPSILON) * 100) / 100;
console.log(rounded);
