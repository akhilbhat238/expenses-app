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
const btnTab3 = document.querySelector("#tab3");
const btnTab4 = document.querySelector("#tab4");
const btnTab5 = document.querySelector("#tab5");
const btnTab6 = document.querySelector("#tab6");
const btnTab7 = document.querySelector("#tab7");

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

// const addGrids = function (gridState) {
//   let btnClassList = dynamicTable.className.split(" ");
//   let pattern = /col/;
//   btnClassList.forEach(function (btnClassId) {
//     console.log("1");
//     if (pattern.test(btnClassId)) {
//       if (btnClassId != gridState) {
//         dynamicTable.classList.remove(btnClassId);
//         dynamicTable.classList.add(gridState);
//         // dynamicDetail.classList.remove(btnClassId);
//         // dynamicDetailCell.classList.add(gridState);
//         // console.log("Here");
//         // console.log(dynamicDetailCell.classList);
//         if (gridState == "triple-col") {
//           const insertDiv = document.createElement("div");
//           insertDiv.classList.add("table-header-cell");
//           insertDiv.classList.add("header");
//           insertDiv.classList.add("key");
//           insertDiv.innerHTML = "Hello";
//           dynamicTable.appendChild(insertDiv);

//           const insertDiv2 = document.createElement("div");
//           insertDiv2.classList.add("table-header-cell");
//           insertDiv2.classList.add("header");
//           insertDiv2.classList.add("value");
//           insertDiv2.innerHTML = "Goodbye";
//           dynamicTable.appendChild(insertDiv2);

//           const insertDiv3 = document.createElement("div");
//           insertDiv3.classList.add("table-header-cell");
//           insertDiv3.classList.add("header");
//           insertDiv3.classList.add("key");
//           insertDiv3.innerHTML = "Hello";
//           dynamicTable.appendChild(insertDiv3);

//           const insertDiv4 = document.createElement("div");
//           insertDiv4.classList.add("table-header-cell");
//           insertDiv4.classList.add("header");
//           insertDiv4.classList.add("value");
//           insertDiv4.innerHTML = "Goodbye";
//           dynamicTable.appendChild(insertDiv4);
//         } else if (gridState == "double-col") {
//           const insertDiv = document.createElement("div");
//           insertDiv.classList.add("table-header-cell");
//           insertDiv.classList.add("header");
//           insertDiv.classList.add("key");
//           insertDiv.innerHTML = "Hello";
//           dynamicTable.appendChild(insertDiv);

//           const insertDiv2 = document.createElement("div");
//           insertDiv2.classList.add("table-header-cell");
//           insertDiv2.classList.add("header");
//           insertDiv2.classList.add("value");
//           insertDiv2.innerHTML = "Goodbye";
//           dynamicTable.appendChild(insertDiv2);
//         }
//       }
//     }
//   });

// let columnCount;
// columnCount = gridCount == 2 ? "double" : "triple";
// columnCount = columnCount + "-col";
// console.log(columnCount);
// dynamicTable.classList.remove("single-col");
// dynamicTable.classList.add(columnCount);
// for (let grid = 1; grid <= gridCount; grid++) {
//   dynamicTable.appendChild(dynamicTableCell);
// }
// };

const insertHeader = function () {
  const insertDiv = document.createElement("div");
  insertDiv.classList.add("table-header-cell");
  insertDiv.classList.add("header");
  insertDiv.classList.add("key");
  insertDiv.innerHTML = "Key";
  return insertDiv;
};

const insertDetail = function (cellType, requestData) {
  const insertDiv = document.createElement("div");
  insertDiv.classList.add("table-detail-cell");
  insertDiv.classList.add("detail");
  insertDiv.classList.add(cellType);
  insertDiv.innerHTML = requestData;
  return insertDiv;
};

const addGridColumns = function (gridState, requestData) {
  let btnClassList = dynamicTable.className.split(" ");
  let pattern = /col/;
  btnClassList.forEach(function (btnClassId) {
    if (pattern.test(btnClassId)) {
      dynamicTable.classList.remove(btnClassId);
      dynamicTable.classList.add(gridState);
      dynamicDetail.classList.remove(btnClassId);
      dynamicDetail.classList.add(gridState);
      if (gridState == "single-col") {
        dynamicTable.innerHTML = "";
        dynamicTable.appendChild(insertHeader());
        dynamicTable.appendChild(insertHeader());
        dynamicDetail.innerHTML = "";
        for (const key in requestData) {
          dynamicDetail.appendChild(insertDetail("key", key));
          dynamicDetail.appendChild(
            insertDetail("value", Math.round(requestData[key] * 100) / 100)
          );
        }
      } else if (gridState == "double-col") {
        dynamicTable.innerHTML = "";
        dynamicTable.appendChild(insertHeader());
        dynamicTable.appendChild(insertHeader());
        dynamicTable.appendChild(insertHeader());
        dynamicTable.appendChild(insertHeader());
        dynamicDetail.innerHTML = "";
        Object.keys(requestData).forEach((key) => {
          dynamicDetail.appendChild(insertDetail("key", key));
          dynamicDetail.appendChild(
            insertDetail("value", Math.round(requestData[key] * 100) / 100)
          );
        });
        // dynamicTable.appendChild(insertHeader());
        // dynamicTable.appendChild(insertHeader());
      } else {
        dynamicTable.innerHTML = "";
        dynamicTable.appendChild(insertHeader());
        dynamicTable.appendChild(insertHeader());
        dynamicTable.appendChild(insertHeader());
        dynamicTable.appendChild(insertHeader());
        dynamicTable.appendChild(insertHeader());
        dynamicTable.appendChild(insertHeader());
        dynamicDetail.innerHTML = "";
        Object.keys(requestData).forEach((key) => {
          dynamicDetail.appendChild(insertDetail("key", key));
          dynamicDetail.appendChild(
            insertDetail("value", Math.round(requestData[key] * 100) / 100)
          );
        });
      }
    }
  });
};

const createDiv = function (gridState, divKey, divValue) {
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
  // console.log(typeof request);

  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    const numEntries = Object.keys(data).length;
    const gridCount = Math.ceil(numEntries / 5);
    if (gridCount == 1) {
      addGridColumns("single-col", data);
      // for (const key in data) {
      //   const newEle = createDiv("single-col", key, data[key]);
      //   dynamicDetail.appendChild(newEle);
      // }
    } else if (gridCount == 2) {
      addGridColumns("double-col", data);
      // for (const key in data) {
      //   const newEle = createDiv("single-col", key, data[key]);
      //   dynamicDetail.appendChild(newEle);
      // }
    } else {
      addGridColumns("triple-col", data);
      // for (const key in data) {
      //   const newEle = createDiv("triple-col", key, data[key]);
      //   dynamicDetail.appendChild(newEle);
      // }
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

    dynamicDetail.innerHTML = "";
    getFinanceData(activeTab.id);
  });
});
