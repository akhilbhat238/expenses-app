"use strict";

const arrowButton = document.querySelector(".details-viz-arrow");
const detailsDiv = document.querySelector(".details-viz-div");
const detailsTabs = document.querySelector(".details-viz-tabs");
const detailsTable = document.querySelector(".details-viz-table");
const dispTable = document.querySelector("#finance-table");
const dynamicTable = document.querySelector(".table-container");
const dynamicTableCell = document.querySelector(".table-container-cell");

const btnTab1 = document.querySelector("#tab1");
const btnTab2 = document.querySelector("#tab2");

let activeTab;

const getActiveTab = function () {
  return document.querySelector(".active");
};

var tabDict = {
  tab1: "expenses_by_length",
  tab2: "expenses_by_category",
};

const addGrids = function (gridCount) {
  let columnCount;
  columnCount = gridCount == 2 ? "double" : "triple";
  columnCount = columnCount + "-col";
  console.log(columnCount);
  dynamicTable.classList.remove("single-col");
  dynamicTable.classList.add(columnCount);
  for (let grid = 1; grid <= gridCount; grid++) {
    dynamicTable.appendChild(dynamicTableCell);
  }
};

const getFinanceData = function (tabId) {
  console.log(tabId);
  const tabLink = `https://shark-app-pytes.ondigitalocean.app/${tabDict[tabId]}`;
  const request = new XMLHttpRequest();
  request.open("GET", tabLink);
  request.send();

  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    console.log(data);
    const numEntries = Object.keys(data).length;
    const gridCount = Math.ceil(numEntries / 5);
    if (gridCount == 2) {
      addGrids(2);
    } else if (gridCount >= 3) {
      addGrids(3);
    }

    // for (const property in data) {
    //   console.log(`${property}: ${data[property]}`);
    //   var row = dispTable.insertRow(1);
    //   var cell1 = row.insertCell(0);
    //   var cell2 = row.insertCell(1);
    //   cell1.innerHTML = property;
    //   cell2.innerHTML =
    //     Math.round((data[property] + Number.EPSILON) * 100) / 100;
    // }
  });
};

const flipFunction = function (inputElement) {
  if (inputElement.classList.contains("down")) {
    arrowButton.classList.remove("down");
    arrowButton.classList.add("up");
    detailsDiv.classList.remove("hidden");
    detailsTabs.classList.remove("hidden");
    detailsTable.classList.remove("hidden");
    activeTab = getActiveTab();
    console.log(activeTab.id);
    getFinanceData(activeTab.id);
  } else {
    arrowButton.classList.remove("up");
    arrowButton.classList.add("down");
    detailsDiv.classList.add("hidden");
    detailsTabs.classList.add("hidden");
    detailsTable.classList.add("hidden");
  }
};

// getFinanceData();

arrowButton.addEventListener("click", function () {
  flipFunction(arrowButton);
  // addGrids(3);
});

btnTab2.addEventListener("click", function () {
  btnTab1.classList.remove("active");
  btnTab2.classList.add("active");
  activeTab = getActiveTab();
  console.log(activeTab.id);
  getFinanceData(activeTab.id);
});
