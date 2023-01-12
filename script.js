"use strict";

const arrowButton = document.querySelector(".details-viz-arrow");
const detailsDiv = document.querySelector(".details-viz-div");
const detailsTabs = document.querySelector(".details-viz-tabs");
const detailsTable = document.querySelector(".details-viz-table");
const dispTable = document.querySelector("#finance-table");

const flipFunction = function (inputElement) {
  if (inputElement.classList.contains("down")) {
    arrowButton.classList.remove("down");
    arrowButton.classList.add("up");
    detailsDiv.classList.remove("hidden");
    detailsTabs.classList.remove("hidden");
    detailsTable.classList.remove("hidden");
  } else {
    arrowButton.classList.remove("up");
    arrowButton.classList.add("down");
    detailsDiv.classList.remove("hidden");
    detailsTabs.classList.add("hidden");
    detailsTable.classList.add("hidden");
  }
};

const getFinanceData = function () {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://shark-app-pytes.ondigitalocean.app/expenses_by_category"
  );
  request.send();

  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    for (const property in data) {
      console.log(`${property}: ${data[property]}`);
      var row = dispTable.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = property;
      cell2.innerHTML =
        Math.round((data[property] + Number.EPSILON) * 100) / 100;
    }
  });
};

// getFinanceData();

arrowButton.addEventListener("click", function () {
  flipFunction(arrowButton);
});
