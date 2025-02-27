// console.log("borrow_book.js 文件已加载");

$(function () {
  // console.log("jQuery 函数已执行");
  // var token = localStorage.getItem('token');
  // if (token) {
  //   console.log("Token:", token);
  // } else {
  //   console.error("Token 不存在");
  // }
  $(function () {
    var content = $(".component .align");
    // console.log(content);
    console.log(localStorage.getItem('token'));
    $.ajax({
      type: "get",
      url: "/b_r/getBooksAndBorrow",
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      success: function (res) {
        console.log(res.data);
        // var books = res.data.books.split('||');
        var borrow_time = res.data.borrow_time.split('||');
        var books = res.data.books.split('||');
        // console.log(books)
        // console.log(borrow_time);
        $.ajax({
          type: "post",
          url: "/b_r/getMoreBooks",
          headers: {
            Authorization: localStorage.getItem('token'),
          },
          data: {
            books: res.data.books,
          },
          success: function (res) {
            console.log(res);
            booksNum = res.length;
            if (res.length == undefined) $(".pages p").html('共 ' + 0 + ' 本书');
            else $(".pages p").html('共 ' + res.length + ' 本书');
            // console.log(borrow_books);
            for (var i = 0; i < res.length; i++) {

              for (var i = 0; i < res.length; i++) {
                for (var j = 0; j < res.length; j++) {
                  // console.log(res[j].id)
                  // console.log(borrow_books[i])
                  // console.log('ok');
                  if (res[j].id == books[i]) {
                    var new1 = $("<li></li>"); var new2 = $("<figure></figure>"); new2.addClass('book');
                    // front
                    var new3 = $("<ul></ul>"); new3.addClass('hardcover_front'); var new4 = $("<li></li>");
                    var new5 = $("<img></img>").attr('width', '100%').attr('height', '100%');
                    var new6 = $("<li></li>");
                    new4.append(new5); new3.append(new4); new3.append(new6);
                    //page
                    var new7 = $("<ul></ul>"); new7.addClass('page'); var new8 = $("<li></li>");
                    var new9 = $("<li></li>"); new9.html('<a class="btn" href="#">归还</a>');
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
                    for (var k in res[j]) {
                      if (k === 'id') continue;
                      if (k === 'book_name') {
                        // new20.html('<a>《' + hhh + '》</a>');
                        new20.html('<a>《' + res[j][k] + '》</a>');
                        // new20.text(1);
                        new20.data('bookId', res[j]['id']);
                        // console.log(td.data('bookId'));
                      }
                      else if (k === 'book_author') {
                        new21.text(res[j][k]);
                      }
                      // else if (k === 'book_borrowNum') {
                      //   new22.text('借阅次数：' + res[i][k]);
                      // }
                      // else if (k === 'book_remainNum') {
                      //   new22.text('剩余数量：' + res[i][k]);
                      else if (k === 'url') {
                        new5.attr('src', res[j][k])
                      }

                      //   new3.attr('width', '100%').attr('height', '100%');
                      //   console.log(new5.attr('src'));
                      // }
                      else { }

                    }
                    new9.data('borrowId', res[j]['id']);
                    console.log(new9.data('borrowId'));
                    $(".component .align").append(new1);
                    // console.log(borrow_books[i])
                  }
                }
              }
            }
          }
        });
      },
      error: function (xhr, status, error) {
        console.error("请求失败:", status, error);
        console.error("响应文本:", xhr.responseText);
      }
    });
  });


  //点击书名查看详情
  $(".component .align").on('click', 'li', function (e) {
    //  console.log(e.target);
    e.stopPropagation();
    var li = $(e.target).closest('li'); // 确保获取到正确的 li 元素
    console.log(li.data('borrowId'));
    // console.log(td.is('a'));
    // console.log(td.data('bookId'));
    if (li.data('bookId') != undefined) {
      sessionStorage.setItem('bookId', li.data('bookId'));
      // $(location).prop('href', 'bookDescription.html');
    }
    if (li.data('borrowId') != undefined) {
      //更新共 条记录
      booksNum--;
      $(".pages p").html('共 ' + booksNum + ' 本书');
      // console.log(td.data('borrowId'));
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
          borrow_time: '-' + time,
        },
        success: function (res) {
          // console.log(res);
          if (res.message === '身份认证失败!' && res.status == 1) {
            logout();
          }
          if (res.status == 0) {
            alert('归还成功！');
            li.closest(".page").closest(".book").parent("li").remove();
          }
        }
      });
    }
  })
})