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

let filter = "";
let filterData = [];
let id = 3; // 因初始資料的 id 到 2 了，所以新資料的 id 從 3 開始給

let data = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];


renderCard(data);
function renderCard(renderData) { // 渲染資料
  let card = "";
  renderData.forEach((item) => {
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
        data.push(obj);
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


  id++;

  card = ""; // 清空初始渲染產生的卡片資料

  renderCard(data);
  formEl.reset(); // 清除 form 資料
});

regionSearch.addEventListener('click', (e) => {
  // 取得 select 標籤當前的值
  const val = e.target.value
  if (val === "" || val === "地區搜尋") {
    renderCard(data);
    noneArea.classList.remove('display-block'); // 隱藏"查無關鍵字區塊"
  } else {
    // 如果 val 的值為某某地區，則渲染該地區的卡片

    // 放暫存資料的變數，用來放被篩選過的資料
    noneArea.classList.remove('display-block'); // 隱藏"查無關鍵字區塊"
    let tempData = [];
    data.forEach((item) => { // 對 data 陣列逐一取資料
      if (item.area === val) { // 判斷 select 的值有沒有跟陣列資料相符
        tempData.push(item)
      };
    });

    // 渲染被篩選過的資料
    renderCard(tempData);
  }
});