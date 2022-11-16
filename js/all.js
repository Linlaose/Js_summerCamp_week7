import axios from '../node_modules/axios/dist/esm/axios.js';
import { addChart } from './chart.js';

const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketRegion = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector('#ticketDescription');
const formEl = document.querySelector('.addTicket-form');
const addTicketBtn = document.querySelector('.addTicket-btn');

const cardList = document.querySelector('.ticketCard-area');

const regionSearch = document.querySelector('.regionSearch');
const searchResult = document.querySelector('#searchResult-text');

const noneArea = document.querySelector('.cantFind-area');

const dataUrl = "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";

let data = [];
let id = 3; // 因初始資料的 id 到 2 了，所以新資料的 id 從 3 開始給


renderCard();
function renderCard() { // 渲染資料
  let data;
  axios.get(dataUrl)
    .then((res) => {
      let card = "";
      data = res.data.data;
      data.forEach((item) => {
        card += `
          <li class="ticketCard">
            <div class="ticketCard-img">
              <a href="#">
                <img
                  src="${item.imgUrl}"
                  alt=""
                />
              </a>
              <div class="ticketCard-region">${item.area}</div>
              <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3>
                  <a href="#" class="ticketCard-name">${item.name}</a>
                </h3>
                <p class="ticketCard-description">
                  ${item.description}
                </p>
              </div>
              <div class="ticketCard-info">
                <p class="ticketCard-num">
                  <span><i class="fas fa-exclamation-circle"></i></span>
                  剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                </p>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">$${item.price}</span>
                </p>
              </div>
            </div>
          </li>
          `;
      });
      cardList.innerHTML = card; // 初始渲染頁面
      searchResult.textContent = `本次搜尋共 ${data.length} 筆資料`
    }).catch((err) => {
      console.log(err);
    })
};
function calcText(obj) { // 計算敘述欄位字數
  let textLength = 0;
  let textArr = obj.description.trim().split(' ');
  textArr.forEach((item) => {
    textLength += item.length
  });
  return textLength
};
function newObject(obj) { // 將新的空物件賦予 input 欄位值
  obj.name = ticketName.value;
  obj.imgUrl = ticketImgUrl.value;
  obj.area = ticketRegion.value;
  obj.description = ticketDescription.value;
  obj.group = ticketNum.value;
  obj.price = ticketPrice.value;
  obj.rate = ticketRate.value;
  obj.id = id;

  return obj
};
function noResult() { // 顯示 "查無關鍵字區塊"
  cardList.innerHTML = "";
  noneArea.classList.add('display-block');
  searchResult.textContent = `本次搜尋共 0 筆資料`
  formEl.reset();
};
function addCard(data) {
  // data 已由 addChart() push 過 obj 了
  let originalData;
  axios.get(dataUrl)
    .then((res) => {
      let card = "";
      originalData = res.data.data;
      data.forEach((item) => {
        originalData.push(item)
      });
      originalData.forEach((item) => {
        card += `
          <li class="ticketCard">
            <div class="ticketCard-img">
              <a href="#">
                <img
                  src="${item.imgUrl}"
                  alt=""
                />
              </a>
              <div class="ticketCard-region">${item.area}</div>
              <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3>
                  <a href="#" class="ticketCard-name">${item.name}</a>
                </h3>
                <p class="ticketCard-description">
                  ${item.description}
                </p>
              </div>
              <div class="ticketCard-info">
                <p class="ticketCard-num">
                  <span><i class="fas fa-exclamation-circle"></i></span>
                  剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                </p>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">$${item.price}</span>
                </p>
              </div>
            </div>
          </li>
          `;
      });
      cardList.innerHTML = card; // 初始渲染頁面
      searchResult.textContent = `本次搜尋共 ${originalData.length} 筆資料`
    }).catch((err) => {
      console.log(err);
    })
}
function getData(selected) {
  let data;
  axios.get(dataUrl)
    .then((res) => {
      let card = "";
      data = res.data.data;
      data.forEach((item) => {
        if (item.area === selected) {
          console.log(item.area);
        }
      })
      // data.forEach((item) => {
      //   card += `
      //     <li class="ticketCard">
      //       <div class="ticketCard-img">
      //         <a href="#">
      //           <img
      //             src="${item.imgUrl}"
      //             alt=""
      //           />
      //         </a>
      //         <div class="ticketCard-region">${item.area}</div>
      //         <div class="ticketCard-rank">${item.rate}</div>
      //       </div>
      //       <div class="ticketCard-content">
      //         <div>
      //           <h3>
      //             <a href="#" class="ticketCard-name">${item.name}</a>
      //           </h3>
      //           <p class="ticketCard-description">
      //             ${item.description}
      //           </p>
      //         </div>
      //         <div class="ticketCard-info">
      //           <p class="ticketCard-num">
      //             <span><i class="fas fa-exclamation-circle"></i></span>
      //             剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
      //           </p>
      //           <p class="ticketCard-price">
      //             TWD <span id="ticketCard-price">$${item.price}</span>
      //           </p>
      //         </div>
      //       </div>
      //     </li>
      //     `;
      // });
    }).catch((err) => {
      console.log(err);
    })
}

addTicketBtn.addEventListener('click', () => {
  let obj = {};
  let isNone = false; // 欄位初始狀態

  newObject(obj); // 新的空物件賦予值

  Object.values(obj).forEach((value) => { // 物件迴圈，若發現有空值則將欄位初始狀態轉換為 true
    if (value === "") {
      isNone = true;
    };
  });

  calcText(obj); // 計算字數

  if (isNone === false) { // 判斷表單內容是否都有值
    if (obj.rate <= 10 && obj.rate > 0) { // 判斷星級是不是 1 ~ 10
      if (calcText(obj) <= 100) { // 敘述要小於 100 字
        id++;
        addChart(data, obj);
        addCard(data);
      } else {
        noResult()
        return alert(`敘述欄位字數 ${obj.description.length}，超過 100 字，請重新輸入。`);
      }
    } else {
      noResult()
      return alert(`目前輸入星級 ${obj.rate}，星級只能 1-10 分，請重新輸入。`)
    };
  } else {
    noResult()
    return alert(`欄位不得為空，請重新輸入。`);
  };

  formEl.reset(); // 清除 form 資料
});

regionSearch.addEventListener('click', (e) => {
  // 取得 select 標籤當前的值
  const val = e.target.value
  if (val === "" || val === "地區搜尋") {
    renderCard();
    noneArea.classList.remove('display-block'); // 隱藏"查無關鍵字區塊"
  } else {
    // 如果 val 的值為某某地區，則渲染該地區的卡片

    // 放暫存資料的變數，用來放被篩選過的資料
    noneArea.classList.remove('display-block'); // 隱藏"查無關鍵字區塊"
    let tempData = [];
    getData(val);
    // data.forEach((item) => { // 對 data 陣列逐一取資料
    //   if (item.area === val) { // 判斷 select 的值有沒有跟陣列資料相符
    //     tempData.push(item)
    //   };
    // });

    // 渲染被篩選過的資料
    // renderCard(tempData);
  }
});