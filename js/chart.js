// import axios from '../node_modules/axios/dist/esm/axios.js'; // 本地開發路徑
// import axios from '../tree/master/node_modules/axios/dist/esm/axios.js'; // Github 路徑 失敗
const dataUrl = "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";

function getChart() {
  let data;
  axios.get(dataUrl)
    .then((res) => {
      data = res.data.data;
      const chart = c3.generate({
        bindto: "#chart",
        data: {
          columns: reBuildArr(data),
          type: 'donut',
        },
        donut: {
          title: "套票地區比重"
        }
      });
    }).catch((err) => {
      console.log(err);
    })
};
function reBuildArr(data) {
  const newObj = data.reduce((acc, obj) => {
    acc[obj.area] ?
      acc[obj.area] += 1 :
      acc[obj.area] = 1
    return acc
  }, {})

  let newArr = [];

  Object.keys(newObj).forEach((item) => {
    let arr = [];
    arr.push(item);
    arr.push(newObj[item]);
    newArr.push(arr);
  });
  return newArr
};
export function addChart(data, obj) {
  data.push(obj);

  let originalData;
  axios.get(dataUrl)
    .then((res) => {
      originalData = res.data.data;
      data.forEach((item) => {
        originalData.push(item)
      });
      const chart = c3.generate({
        bindto: "#chart",
        data: {
          columns: reBuildArr(originalData),
          type: 'donut',
        },
        donut: {
          title: "套票地區比重"
        }
      });
    })
};

getChart();