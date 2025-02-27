// 定义变量
let offset = 0;
let maxOffset = 0;
let minOffset = -3; // 允许4个位置（0到-3）
const slides = Array.from(document.querySelectorAll(".card"));
const clock = document.querySelector("#clock-table");

// 日期配置
const startDate = new Date(2023, 11, 31); // 起始日期（月份0-11）
let currentPointerDate = new Date(startDate);

// 初始化时钟刻度
for (let i = -90, days = 0; i < 270; i += 90) { // 4个刻度（360/4=90）
  addThickClockScale(i, formatDate(addDays(startDate, days)));
  days += 1;
}

// 生成小刻度（可选）
for (let i = -90; i < 270; i += 6) {
  addClockScale(i);
}

// 添加时钟刻度函数
function addClockScale(degree) {
  const invisibleClockTable = document.createElement("div");
  invisibleClockTable.className = "invisible-table";
  invisibleClockTable.style.transform = `rotate(${degree}deg)`;

  const clockScale = document.createElement("div");
  clockScale.className = "clock-scale";
  invisibleClockTable.appendChild(clockScale);
  clock.appendChild(invisibleClockTable);
}

// 添加日期刻度函数
function addThickClockScale(degree, dateStr) {
  const invisibleClockTable = document.createElement("div");
  invisibleClockTable.className = "invisible-table";
  invisibleClockTable.style.transform = `rotate(${degree}deg)`;

  const thickClockScale = document.createElement("div");
  thickClockScale.className = "clock-thick";

  const scaleContent = document.createElement("span");
  scaleContent.textContent = dateStr;
  thickClockScale.appendChild(scaleContent);

  invisibleClockTable.appendChild(thickClockScale);
  clock.appendChild(invisibleClockTable);
}

// 日期处理函数
function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

function formatDate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('/');
}

// 更新卡片内容
function updateCards() {
  slides.forEach((slide, index) => {
    const currentDate = addDays(startDate, index + offset);
    slide.querySelector('.year').textContent = currentDate.getFullYear();
    slide.querySelector('.month').textContent = String(currentDate.getMonth() + 1).padStart(2, '0');
    slide.querySelector('.day').textContent = String(currentDate.getDate()).padStart(2, '0');
    slide.style.transform = `translateY(${offset * 100}%)`;
  });
}

// 切换函数
function slideToPrev() {
  offset = Math.min(maxOffset, offset + 1);
  updateCards();
  clockRotate(offset * 90); // 每次旋转90度
}

function slideToNext() {
  offset = Math.max(minOffset, offset - 1);
  updateCards();
  clockRotate(offset * 90);
}

// 时钟旋转
function clockRotate(degree) {
  clock.style.transform = `rotate(${degree}deg)`;
}

// 初始化卡片
updateCards();

// 自动播放（可选）
// setInterval(() => {
//   if(offset > minOffset) slideToNext();
//   else offset = maxOffset;
// }, 3000);

// 保留原有AJAX
$.ajax({
  type: "get",
  url: "/ot/getxzlh",
  success: function (res) {
    console.log(res);
    // 在此处处理日期数据
  }
});