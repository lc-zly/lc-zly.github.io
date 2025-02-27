$.ajax({
  type: "get",
  url: "/ot/getnewsNum",
  success: function (res) {
    console.log(res[0].num);
    var ul = $(".pages ul");
    for (var i = 1; i <= (res[0].num + 1) / 6 + 1; i++) {
      var li = $("<li></li>");
      li.text(i);
      ul.append(li);
    }

    $(".pages ul li:eq(0)").css('background-color', 'rgb(255, 255, 255)');
  }
});
$(function () {
  //读取数据begin
  sessionStorage.setItem('page', 1);
  content = $('.stripe-table tbody')
  console.log(content)
  $.ajax({
    type: "post",
    url: "/ot/getns",
    data: {
      page: 1,
    },
    success: function (res) {
      console.log(res);
      for (var i = 0; i < res.length; i++) {

        var tr = $("<tr></tr>");
        for (var k in res[i]) {
          // console.log(k);
          // console.log(res[i]['id']);
          if (k === 'id') continue;
          if (k === 'time') continue;
          // if (k === 'time') continue;
          var td = $("<td></td>");
          if (k === 'url') {
            td.html(`<img src="${res[i][k]}" style="width:200px;height:200px">`);
            td.addClass('img-cell')
            // $(".img-cell img").prop("width", "400px").prop("height", "400px")
            // console.log(td.data('bookId'));
          }
          else {
            td.html(`<a>${res[i][k]}</a>`);
            td.data('newsId', res[i]['id']);
            console.log(td.data('newsId'))
            td.addClass('content-cell')
          }
          tr.append(td);
        }

        $('.stripe-table tbody').append(tr);

      }
    }
  });
  $(".pages ul").on('click', 'li', function (e) {
    content = $('.stripe-table tbody')
    var li = $(e.target);
    sessionStorage.setItem('page', li.html()),
      li.css('background-color', 'rgb(255, 255, 255)').siblings("li").css('background-color', 'rgba(180, 180, 180, .4)');
    content.empty();
    $.ajax({
      type: "post",
      url: "/ot/getns",
      data: {
        page: sessionStorage.getItem('page'),
      },
      success: function (res) {
        console.log(res);
        for (var i = 0; i < res.length; i++) {

          var tr = $("<tr></tr>");
          for (var k in res[i]) {
            // console.log(k);
            // console.log(res[i]['id']);
            if (k === 'id') continue;
            // if (k === 'time') continue;
            var td = $("<td></td>");
            if (k === 'url') {
              td.html(`<img src="${res[i][k]}" style="width:200px;height:200px">`);
              td.addClass('img-cell')
              // $(".img-cell img").prop("width", "400px").prop("height", "400px")
              // console.log(td.data('bookId'));
            }
            else {
              td.html(`<a>${res[i][k]}</a>`);
              td.data('newsId', res[i]['id']);
              console.log(td.data('newsId'))
              td.addClass('content-cell')
            }
            tr.append(td);
          }

          $('.stripe-table tbody').append(tr);

        }
      }
    });
  })
})
// $(function () {
//   $(document).on('click', '.content-cell', function (e) {
//     console.log($(this).data('newsId')); // 使用 this 更准确
//     sessionStorage.setItem('id', $(e.target).data('newsId'));
//     $(location).prop('href', 'NewsDescription.html');
//   });
// });

$(function () {
  $(document).on('click', '.content-cell', function (e) {
    console.log($(this).data('newsId')); // 使用 this 更准确
    const newsId = $(this).data('newsId')
    sessionStorage.setItem('id', newsId)
    $(location).prop('href', 'NewsDescription.html');
  });
});