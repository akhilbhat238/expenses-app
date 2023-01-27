"use strict";
const detailsBar = document.querySelector(".details-viz-hdr");
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
const btnTab3 = document.querySelector("#tab3");
const btnTab4 = document.querySelector("#tab4");
const btnTab5 = document.querySelector("#tab5");
const btnTab6 = document.querySelector("#tab6");
const btnTab7 = document.querySelector("#tab7");

let activeTab;

const getActiveTab = function () {
  return document.querySelector(".active");
};

const tabDict = {
  tab1: "expenses_by_length",
  tab2: "expenses_by_type",
  tab3: "expenses_by_category",
  tab4: "annual_expense",
  tab5: "monthly_expense",
  tab6: "one_time_expense",
  tab7: "personal_expense_breakdown",
};

const colDict = {
  "single-col": 1,
  "double-col": 2,
  "triple-col": 3,
};

function getKeyByValue(object, value) {
  if (value <= 3) {
    return Object.keys(object).find((key) => object[key] === value);
  } else {
    return "triple-col";
  }
}

const creatDiv = function (cellType, cellValue, requestData) {
  const insertDiv = document.createElement("div");
  const cellName = `table-${cellType}-cell`;
  insertDiv.classList.add(cellName);
  insertDiv.classList.add(cellValue.toLowerCase());
  if (cellType == "header") {
    insertDiv.innerHTML = cellValue;
  } else {
    insertDiv.innerHTML = requestData;
  }
  return insertDiv;
};

const insertCells = function (tempVar, tempObj) {
  for (let i = 0; i < tempVar; i++) {
    dynamicTable.appendChild(creatDiv("header", "Expense", tempObj));
    dynamicTable.appendChild(creatDiv("header", "Amount_Spent", tempObj));
  }
  for (const key in tempObj) {
    dynamicDetail.appendChild(creatDiv("detail", "Key", key));
    dynamicDetail.appendChild(
      creatDiv("detail", "Value", `₹ ${Math.round(tempObj[key] * 100) / 100}`)
    );
  }
};

const clearContents = function (btnClassId, gridState) {
  dynamicTable.classList.remove(btnClassId);
  dynamicTable.classList.add(gridState);
  dynamicDetail.classList.remove(btnClassId);
  dynamicDetail.classList.add(gridState);
  dynamicTable.innerHTML = "";
};

const addGridColumns = function (requestData) {
  const data = JSON.parse(requestData);
  const numEntries = Object.keys(data).length;
  const gridCount = Math.ceil(numEntries / 5);
  const colVar = getKeyByValue(colDict, gridCount);

  let btnClassList = dynamicTable.className.split(" ");
  let pattern = /col/;
  btnClassList.forEach(function (btnClassId) {
    if (pattern.test(btnClassId)) {
      clearContents(btnClassId, colVar);
      insertCells(colDict[colVar], data);
    }
  });
};

const getFinanceData = function (tabId) {
  const tabLink = `https://shark-app-pytes.ondigitalocean.app/${tabDict[tabId]}`;
  const request = new XMLHttpRequest();
  request.open("GET", tabLink);
  request.send();

  request.addEventListener("load", function () {
    addGridColumns(this.responseText);
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

detailsBar.addEventListener("click", function () {
  flipFunction(arrowButton);
});

btnTabs.forEach(function (btnTab) {
  btnTab.addEventListener("click", function () {
    btnTabs.forEach(function (allTab) {
      allTab.classList.remove("active");
    });
    btnTab.classList.add("active");
    activeTab = getActiveTab();

    dynamicDetail.innerHTML = "";
    getFinanceData(activeTab.id);
  });
});
