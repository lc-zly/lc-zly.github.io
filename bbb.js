let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

//config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function () {
  itemActive = itemActive + 1;
  if (itemActive >= countItem) {
    itemActive = 0;
  }
  showSlider();
}
//event prev click
prev.onclick = function () {
  itemActive = itemActive - 1;
  if (itemActive < 0) {
    itemActive = countItem - 1;
  }
  showSlider();
}
//auto run slider
let refreshInterval = setInterval(() => {
  next.click();
}, 3000)
function showSlider() {
  //remove item active old
  let itemActiveOld = document.querySelector('.slider .list .item.active');
  let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
  itemActiveOld.classList.remove('active');
  thumbnailActiveOld.classList.remove('active');

  //active new item
  items[itemActive].classList.add('active');
  thumbnails[itemActive].classList.add('active');

  //clear auto time run slider
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 5000)

}

//click thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    itemActive = index;
    showSlider();
  })
})

//获取第二部分的图片
$.ajax({
  type: "get",
  url: "/ot/getmaxnew",
  success: function (res) {
    console.log(res)
    // 处理第一个元素
    const $firstItem = $('.list .item.active');
    $firstItem.append($('<img>').prop('src', res[0].url));
    $(".thumbnail .item.active").append($('<img>').prop('src', res[0].url))
    $firstItem.find('.content').append(
      $('<h2>').html(`<a href="#">${res[0].content}</a>`).data('maxnewId', 1),

      $('<p>').text(res[0].content)
    );

    // 处理后续元素
    $('.list .item:not(.active)').each(function (index) {
      const i = index + 1; // 从1开始
      if (i >= res.length) return;

      $(this).append($('<img>').prop('src', res[i].url));
      // 渲染缩略图
      $(".thumbnail .item").each(function (index) {
        if (res[index]) {
          // 清空原有内容，再添加新图片
          $(this).empty().append(
            $('<img>').prop('src', res[index].url)
          );
        }
      });
      $(this).find('.content').append(
        $('<h2>').html(`<a href="#">${res[i].content}</a>`).data('maxnewId', i + 1),
        $('<p>').text(res[i].content)
      );
    });
  },
  error: function (xhr, status, error) {
    console.error("获取数据出错：", error);
  }
});

$(function () {
  $(document).on('click', '.list .item h2', function (e) {
    console.log($(this).data('maxnewId')); // 使用 this 更准确
    const projectId = $(this).data('maxnewId')
    sessionStorage.setItem('id', projectId)
    $(location).prop('href', 'bbbdes.html');
  });
});