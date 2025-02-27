$(function () {
  var search = $(" .search input");
  search.prop('value', sessionStorage.getItem('searchcontent'));
  $.ajax({
    type: "post",
    url: "/get/search",
    data: {
      search: sessionStorage.getItem('searchcontent'),
    },
    success: function (res) {
      console.log(res);
      console.log(res.data.length);
      for (var i = 0; i < res.data.length; i++) {
        var new1 = $("<li></li>"); var new2 = $("<figure></figure>"); new2.addClass('book');
        // front
        var new3 = $("<ul></ul>"); new3.addClass('hardcover_front'); var new4 = $("<li></li>");
        var new5 = $("<img></img>").attr('width', '100%').attr('height', '100%');
        var new6 = $("<li></li>");
        new4.append(new5); new3.append(new4); new3.append(new6);
        //page
        var new7 = $("<ul></ul>"); new7.addClass('page'); var new8 = $("<li></li>");
        var new9 = $("<li></li>"); new9.html('<a class="btn" href="#">Download</a>');
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


        for (var k in res.data[i]) {
          // console.log(k);
          // console.log(res[i][k]);
          if (k === 'id') continue;
          if (k === 'book_name') {
            // new20.html('<a>《' + hhh + '》</a>');
            new20.html('<a>《' + res.data[i][k] + '》</a>');
            // new20.text(1);
            new20.data('bookId', res.data[i]['id']);
            // console.log(td.data('bookId'));
          }
          else if (k === 'book_author') {
            new21.text(res.data[i][k]);
          }
          else if (k === 'book_borrowNum') {
            new22.text('借阅次数：' + res.data[i][k]);
          }
          else if (k === 'book_remainNum') {
            new22.text('剩余数量：' + res.data[i][k]);
          } else if (k === 'url') {
            new5.attr('src', res.data[i][k]);

            new3.attr('width', '100%').attr('height', '100%');
            console.log(new5.attr('src'));
          }
          else { }

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
  })
})

//搜索
var content = $(".component .align");
$(" .search button").click(function () {
  // $(location).prop('href', 'search.html');
  var search = $(" .search input");
  var searchcontent = search.val();
  content.empty();
  //加载搜索结果
  if (searchcontent != '请输入书名...') {
    $.ajax({
      type: "post",
      url: "/get/search",
      data: {
        search: searchcontent,
      },
      success: function (res) {
        console.log(res.data);
        console.log(res.data.length);
        for (var i = 0; i < res.data.length; i++) {
          var new1 = $("<li></li>"); var new2 = $("<figure></figure>"); new2.addClass('book');
          // front
          var new3 = $("<ul></ul>"); new3.addClass('hardcover_front'); var new4 = $("<li></li>");
          var new5 = $("<img></img>").attr('width', '100%').attr('height', '100%');
          var new6 = $("<li></li>");
          new4.append(new5); new3.append(new4); new3.append(new6);
          //page
          var new7 = $("<ul></ul>"); new7.addClass('page'); var new8 = $("<li></li>");
          var new9 = $("<li></li>"); new9.html('<a class="btn" href="#">Download</a>');
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


          for (var k in res.data[i]) {
            // console.log(k);
            // console.log(res[i][k]);
            if (k === 'id') continue;
            if (k === 'book_name') {
              // new20.html('<a>《' + hhh + '》</a>');
              new20.html('<a>《' + res.data[i][k] + '》</a>');
              // new20.text(1);
              new20.data('bookId', res.data[i]['id']);
              // console.log(td.data('bookId'));
            }
            else if (k === 'book_author') {
              new21.text(res.data[i][k]);
            }
            else if (k === 'book_borrowNum') {
              new22.text('借阅次数：' + res.data[i][k]);
            }
            else if (k === 'book_remainNum') {
              new22.text('剩余数量：' + res.data[i][k]);
            } else if (k === 'url') {
              new5.attr('src', res.data[i][k]);

              new3.attr('width', '100%').attr('height', '100%');
              console.log(new5.attr('src'));
            }
            else { }

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
})