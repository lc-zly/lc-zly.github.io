// 获取图书总数，来分页
$.ajax({
  type: "get",
  url: "/get/getBooksNum",
  success: function (res) {
    // console.log(res[0].num);
    var ul = $(".pages ul");
    for (var i = 1; i <= (res[0].num + 1) / 4 + 1; i++) {
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
  var content = $(".book-store table tbody");
  $.ajax({
    type: "post",
    url: "/get/getBooks",
    data: {
      page: 1,
    },
    success: function (res) {
      console.log(res);
      console.log(res.length);
      for (var i = 0; i < res.length; i++) {
        var new1 = $("<li></li>"); var new2 = $("<figure></figure>"); new2.addClass('book');
        // front
        var new3 = $("<ul></ul>"); new3.addClass('hardcover_front'); var new4 = $("<li></li>");
        var new5 = $("<img></img>").attr('width', '100%').attr('height', '100%');
        var new6 = $("<li></li>");
        new4.append(new5); new3.append(new4); new3.append(new6);
        //page
        var new7 = $("<ul></ul>"); new7.addClass('page'); var new8 = $("<li></li>");
        var new9 = $("<li></li>"); new9.html('<a class="btn" href="#">借阅</a>');
        var new10 = $("<li></li>"); var new11 = $("<li></li>"); var new12 = $("<li></li>");
        new7.append(new8); new7.append(new9); new7.append(new10); new7.append(new11); new7.append(new12);
        //back
        var new13 = $("<ul></ul>"); new13.addClass('hardcover_back'); var new14 = $("<li></li>");
        var new15 = $("<li></li>"); var new16 = $("<ul></ul>"); new16.addClass('book_spine');
        var new17 = $("<li></li>"); var new18 = $("<li></li>");
        var new19 = $("<figcaption></figcaption>"); var new20 = $("<h1></h1>");
        var new21 = $("<span></span>"); var new22 = $("<p></p>");
        new13.append(new14); new13.append(new15); new16.append(new17); new16.append(new18);
        new19.append(new20); new19.append(new21); new19.append(new22);

        //合并
        new1.append(new2); new2.append(new3); new2.append(new7);
        new2.append(new13); new2.append(new16); new2.append(new19);


        for (var k in res[i]) {
          // console.log(k);
          // console.log(res[i][k]);
          if (k === 'id') continue;
          if (k === 'book_name') {
            // new20.html('<a>《' + hhh + '》</a>');
            new20.html('<a>《' + res[i][k] + '》</a>');
            // new20.text(1);
            new20.data('bookId', res[i]['id']);
            // console.log(td.data('bookId'));
          }
          else if (k === 'book_author') {
            new21.text(res[i][k]);
          }
          else if (k === 'book_borrowNum') {
            new22.text('借阅次数：' + res[i][k]);
          }
          else if (k === 'book_remainNum') {
            new22.text('剩余数量：' + res[i][k]);
          } else if (k === 'url') {
            new5.attr('src', res[i][k]);

            new3.attr('width', '100%').attr('height', '100%');
            console.log(new5.attr('src'));
          }
          else { }


        }
        new9.data('borrowId', res[i]['id']);
        console.log(new9.data('borrowId'));
        $(".component .align").append(new1);
        // var td = $("<td></td>");
        // td.html('<a href="javascript:;">借阅</a>');
        // td.data('borrowId', res[i]['id']);
        // tr.append(td);
        // content.append(tr);
      }
    }
  });

  $(".pages ul").on('click', 'li', function (e) {
    var content = $(".component .align");
    var li = $(e.target);
    sessionStorage.setItem('page', li.html()),
      li.css('background-color', 'rgb(255, 255, 255)').siblings("li").css('background-color', 'rgba(180, 180, 180, .4)');
    var containerHeight = $('.component').outerHeight();
    content.empty();
    $('<div></div>').css({ height: containerHeight + 'px' }).appendTo('.component');
    $.ajax({
      type: "post",
      url: "/get/getBooks",
      data: {
        page: sessionStorage.getItem('page'),
      },
      success: function (res) {
        console.log(res);
        console.log(res.length);
        for (var i = 0; i < res.length; i++) {
          var new1 = $("<li></li>"); var new2 = $("<figure></figure>"); new2.addClass('book');
          // front
          var new3 = $("<ul></ul>"); new3.addClass('hardcover_front'); var new4 = $("<li></li>");
          var new5 = $("<img></img>").attr('width', '100%').attr('height', '100%');
          var new6 = $("<li></li>");
          new4.append(new5); new3.append(new4); new3.append(new6);
          //page
          var new7 = $("<ul></ul>"); new7.addClass('page'); var new8 = $("<li></li>");
          var new9 = $("<li></li>"); new9.html('<a class="btn" href="javascript:;">借阅</a>');
          var new10 = $("<li></li>"); var new11 = $("<li></li>"); var new12 = $("<li></li>");
          new7.append(new8); new7.append(new9); new7.append(new10); new7.append(new11); new7.append(new12);
          //back
          var new13 = $("<ul></ul>"); new13.addClass('hardcover_back'); var new14 = $("<li></li>");
          var new15 = $("<li></li>"); var new16 = $("<ul></ul>"); new16.addClass('book_spine');
          var new17 = $("<li></li>"); var new18 = $("<li></li>");
          var new19 = $("<figcaption></figcaption>"); var new20 = $("<h1></h1>");
          var new21 = $("<span></span>"); var new22 = $("<p></p>");
          new13.append(new14); new13.append(new15); new16.append(new17); new16.append(new18);
          new19.append(new20); new19.append(new21); new19.append(new22);

          //合并
          new1.append(new2); new2.append(new3); new2.append(new7);
          new2.append(new13); new2.append(new16); new2.append(new19);


          for (var k in res[i]) {
            // console.log(k);
            // console.log(res[i][k]);
            if (k === 'id') continue;
            if (k === 'book_name') {
              // new20.html('<a>《' + hhh + '》</a>');
              new20.html('<a>《' + res[i][k] + '》</a>');
              // new20.text(1);
              new20.data('bookId', res[i]['id']);
              // console.log(td.data('bookId'));
            }
            else if (k === 'book_author') {
              new21.text(res[i][k]);
            }
            else if (k === 'book_borrowNum') {
              new22.text('借阅次数：' + res[i][k]);
            }
            else if (k === 'book_remainNum') {
              new22.text('剩余数量：' + res[i][k]);
            } else if (k === 'url') {
              new5.attr('src', res[i][k]);

              new3.attr('width', '100%').attr('height', '100%');
              console.log(new5.attr('src'));
            }
            else { }

          }
          new9.data('borrowId', res[i]['id']);
          console.log(new9.data('borrowId'));

          $('.component > div:last').remove();
          $(".component .align").append(new1);


          // var td = $("<td></td>");
          // td.html('<a href="javascript:;">借阅</a>');
          // td.data('borrowId', res[i]['id']);
          // tr.append(td);
          // content.append(tr);
        }
      }
    });
  })
  // var content = $(".component .align");
  //点击书名查看详情 借阅
  $(".component .align").on('click', 'li', function (e) {
    console.log(e.target);
    e.stopPropagation();
    var li = $(e.target).closest('li'); // 确保获取到正确的 li 元素
    console.log(li.data('borrowId'));
    // var li = $(e.target);
    // li = li.is('a') ? li.parent() : li; //bug 已修复
    // console.log(li.data('borrowId'))
    // console.log(li)
    // console.log(td.is('a'));
    // console.log(td.data('bookId'));
    // if (td.data('bookId') != undefined) {
    //   sessionStorage.setItem('bookId', td.data('bookId'));
    //   $(location).prop('href', 'bookDescription.html');
    // }
    if (li.data('borrowId') != undefined) {
      // alert(td.data('borrowId'));
      var date = new Date();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var mns = date.getMinutes();
      m = m < 10 ? '0' + m : m;
      d = d < 10 ? '0' + d : d;
      h = h < 10 ? '0' + h : h;
      mns = mns < 10 ? '0' + mns : mns;
      const time = date.getFullYear() + "-"
        + m + "-"
        + d + " "
        + h + ":"
        + mns;
      // alert(time)
      $.ajax({
        type: "post",
        url: "/b_r/borrowOrReturnOneBook",
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        data: {
          id: li.data('borrowId'),
          borrow_time: time,
        },
        success: function (res) {
          // console.log(res);
          if (res.message === '身份认证失败!' && res.status == 1) {
            logout();
          }
          if (res.status == 0) {
            alert(res.message);
            //刷新数据
            var content = $(".component .align");
            content.empty();
            $.ajax({
              type: "post",
              url: "/get/getBooks",
              data: {
                page: sessionStorage.getItem('page'),
              },
              success: function (res) {
                // console.log(res);
                for (var i = 0; i < res.length; i++) {
                  var new1 = $("<li></li>"); var new2 = $("<figure></figure>"); new2.addClass('book');
                  // front
                  var new3 = $("<ul></ul>"); new3.addClass('hardcover_front'); var new4 = $("<li></li>");
                  var new5 = $("<img></img>").attr('width', '100%').attr('height', '100%');
                  var new6 = $("<li></li>");
                  new4.append(new5); new3.append(new4); new3.append(new6);
                  //page
                  var new7 = $("<ul></ul>"); new7.addClass('page'); var new8 = $("<li></li>");
                  var new9 = $("<li></li>"); new9.html('<a class="btn" href="javascript:;">借阅</a>');
                  var new10 = $("<li></li>"); var new11 = $("<li></li>"); var new12 = $("<li></li>");
                  new7.append(new8); new7.append(new9); new7.append(new10); new7.append(new11); new7.append(new12);
                  //back
                  var new13 = $("<ul></ul>"); new13.addClass('hardcover_back'); var new14 = $("<li></li>");
                  var new15 = $("<li></li>"); var new16 = $("<ul></ul>"); new16.addClass('book_spine');
                  var new17 = $("<li></li>"); var new18 = $("<li></li>");
                  var new19 = $("<figcaption></figcaption>"); var new20 = $("<h1></h1>");
                  var new21 = $("<span></span>"); var new22 = $("<p></p>");
                  new13.append(new14); new13.append(new15); new16.append(new17); new16.append(new18);
                  new19.append(new20); new19.append(new21); new19.append(new22);

                  //合并
                  new1.append(new2); new2.append(new3); new2.append(new7);
                  new2.append(new13); new2.append(new16); new2.append(new19);


                  for (var k in res[i]) {
                    // console.log(k);
                    // console.log(res[i][k]);
                    if (k === 'id') continue;
                    if (k === 'book_name') {
                      // new20.html('<a>《' + hhh + '》</a>');
                      new20.html('<a>《' + res[i][k] + '》</a>');
                      // new20.text(1);
                      new20.data('bookId', res[i]['id']);
                      // console.log(td.data('bookId'));
                    }
                    else if (k === 'book_author') {
                      new21.text(res[i][k]);
                    }
                    else if (k === 'book_borrowNum') {
                      new22.text('借阅次数：' + res[i][k]);
                    }
                    else if (k === 'book_remainNum') {
                      new22.text('剩余数量：' + res[i][k]);
                    } else if (k === 'url') {
                      new5.attr('src', res[i][k]);

                      new3.attr('width', '100%').attr('height', '100%');
                      console.log(new5.attr('src'));
                    }
                    else { }
                    new9.data('borrowId', res[i]['id']);

                  }

                  $('.component > div:last').remove();
                  $(".component .align").append(new1);


                  // var td = $("<td></td>");
                  // td.html('<a href="javascript:;">借阅</a>');
                  // td.data('borrowId', res[i]['id']);
                  // tr.append(td);
                  // content.append(tr);
                }
              }
            });
          }
          else alert(res.message);
        }
      });
    }
  })

  //搜索
  var content = $(".component .align");
  $(".search button").click(function () {
    // $(location).prop('href', 'search.html');
    content.empty();
    var search = $(".search input");
    var searchcontent = search.val();
    //加载搜索结果
    if (searchcontent != '请输入书名...') {
      sessionStorage.setItem('searchcontent', searchcontent);
      // location是一个对象，用于获取当前页面的地址(location.href)、主机地址(location.host)、协议(http:)等信息,
      // 是window对象的一个属性。是javaScript中的对象这里把他转换成了jQuery对象，所以可以使用jQuery的方法。
      $(location).prop('href', 'search.html');
    }
  })
})