"use strict";

const arrowButton = document.querySelector(".details-viz-arrow");
const detailsDiv = document.querySelector(".details-viz-div");
const detailsTabs = document.querySelector(".details-viz-tabs");
const detailsTable = document.querySelector(".details-viz-table");
const dispTable = document.querySelector("#finance-table");
const dynamicTable = document.querySelector(".table-header");
const dynamicTableCell = document.querySelector(".table-header-cell");
const dynamicDetail = document.querySelector(".table-detail");
const dynamicDetailCell = document.querySelector(".table-detail-cell");

const btnTabs = document.querySelectorAll(".catg-tabs");
const btnTab1 = document.querySelector("#tab1");
const btnTab2 = document.querySelector("#tab2");

let activeTab;

const getActiveTab = function () {
  return document.querySelector(".active");
};

var tabDict = {
  tab1: "expenses_by_length",
  tab2: "expenses_by_type",
  tab3: "expenses_by_category",
  tab4: "annual_expense",
  tab5: "monthly_expense",
  tab6: "one_time_expense",
  tab7: "personal_expense_breakdown",
};

const addGrids = function (gridState) {
  let btnClassList = dynamicTable.className.split(" ");
  let pattern = /col/;
  btnClassList.forEach(function (btnClassId) {
    if (pattern.test(btnClassId)) {
      if (btnClassId != gridState) {
        dynamicTable.classList.remove(btnClassId);
        dynamicTable.classList.add(gridState);
        // dynamicDetail.classList.remove(btnClassId);
        // dynamicDetailCell.classList.add(gridState);
      }
    }
  });

  // let columnCount;
  // columnCount = gridCount == 2 ? "double" : "triple";
  // columnCount = columnCount + "-col";
  // console.log(columnCount);
  // dynamicTable.classList.remove("single-col");
  // dynamicTable.classList.add(columnCount);
  // for (let grid = 1; grid <= gridCount; grid++) {
  //   dynamicTable.appendChild(dynamicTableCell);
  // }
};

const createDiv = function (gridState, divKey, divValue) {
  console.log("Here");
  const insertDiv = document.createElement("div");
  insertDiv.classList.add("table-detail");
  insertDiv.classList.add(gridState);
  const insertDivKey = document.createElement("div");
  insertDivKey.classList.add("table-detail-cell");
  insertDivKey.classList.add("key");
  insertDivKey.innerHTML = divKey;
  insertDiv.appendChild(insertDivKey);
  const insertDivValue = document.createElement("div");
  insertDivValue.classList.add("table-detail-cell");
  insertDivValue.classList.add("value");
  insertDivValue.innerHTML = divValue;
  insertDiv.appendChild(insertDivValue);
  return insertDiv;
};

const getFinanceData = function (tabId) {
  const tabLink = `https://shark-app-pytes.ondigitalocean.app/${tabDict[tabId]}`;
  const request = new XMLHttpRequest();
  request.open("GET", tabLink);
  request.send();

  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    const numEntries = Object.keys(data).length;
    const gridCount = Math.ceil(numEntries / 5);
    if (gridCount == 1) {
      addGrids("single-col");
      for (const key in data) {
        const newEle = createDiv("single-col", key, data[key]);
        dynamicDetail.appendChild(newEle);
      }
    } else if (gridCount == 2) {
      addGrids("double-col");
    } else {
      addGrids("triple-col");
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

btnTabs.forEach(function (btnTab) {
  btnTab.addEventListener("click", function () {
    btnTabs.forEach(function (allTab) {
      allTab.classList.remove("active");
    });
    btnTab.classList.add("active");
    activeTab = getActiveTab();
    getFinanceData(activeTab.id);
  });
});
