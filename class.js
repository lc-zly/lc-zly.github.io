// $.ajax({
//   type: "get",
//   url: "/api/getBooksNum",
//   success: function (res) {
//     // console.log(res);
//     var ul = $(".pages ul");
//     for (var i = 1; i <= (res[0].num + 1) / 17 + 1; i++) {
//       var li = $("<li></li>");
//       li.html(i);
//       ul.append(li);
//     }

//     $(".pages ul li:eq(0)").css('background-color', 'rgb(255, 255, 255)');
//   }
// });