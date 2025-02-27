

$(function () {
  $.ajax({
    type: "get",
    url: "/ot/getteam",
    success: function (res) {
      console.log(res)
      // 遍历数据
      $.each(res, function (index, item) {
        // 创建一个新的div元素
        var new1 = $('<div></div>')
        new1.addClass('col-md-3').addClass('col-sm-6')
        var new2 = $('<div></div>')
        new2.addClass('our-team')
        var new3 = $('<div></div>')
        new3.addClass('pic')
        var new4 = $('<img>')
        new3.append(new4)

        var new5 = $('<div>')
        new5.addClass('team-content')
        var new6 = $('<h3></h3>')
        new6.addClass('title')
        var new7 = $('<Span></Span>')
        new7.addClass('post')
        new5.append(new6)
        new5.append(new7)
        var new8 = $('<ul></ul>')
        new8.addClass('social')
        var new9 = $('<li></li>')
        new9.html('<a  href="#" class="fa fa-phone"></a>');
        var new10 = $('<li></li>')
        new10.html('<a  href="#" class="fa fa-comments"></a>');
        var new11 = $('<li></li>')
        new11.html('<a  href="#" class="fa fa-envelope"></a>');
        var new12 = $('<li></li>')
        new12.html('<a  href="#" class="fa fa-plus"></a>');

        new8.append(new9)
        new8.append(new10)
        new8.append(new11)
        new8.append(new12)
        new1.append(new2)
        new2.append(new3)
        new2.append(new5)
        new2.append(new8)

        new4.attr('src', res[index].url)
        new6.text(res[index].tittle1)
        new7.text(res[index].tittle2)
        new6.data('peopleId', item.id)
        // 根据tittle2的值将元素插入到对应的父盒子中
        if (item.tittle2 === '研究员') {
          $('.demo #yanjiuyuan .row').append(new1);
        } else if (item.tittle2 === '教授') {
          $('.demo #jiaoshou .row').append(new1);
        }
      });
    }
  })
})


// var new9 = $("<li></li>"); new9.html('<a class="btn" href="javascript:;">借阅</a>');

// <div class="col-md-3 col-sm-6">//new1
//   <div class="our-team">//new2
//     <div class="pic">//new3
//       <img src="../images/01.avif">//new4
//     </div>
//     <div class="team-content">//new5
//       <h3 class="title">Caroline</h3>new6
//       <Span class="post">Web Designer</Span>new7
//     </div>
//     <ul class="social">new8
//       <li><a href="#" class="fa fa-facebook"></a></li>9
//       <li><a href="#" class="fa fa-twitter"></a></li>10
//       <li><a href="#" class="fa fa-google-plus"></a></li>11
//       <li><a href="#" class="fa fa-linkedin"></a></li>12
//     </ul>
//   </div>
// </div>

// $(function () {
//   var new1 = $('<div></div>')
//   new1.addClass('col-md-3 col-sm-6')
//   var new2 = $('<div></div>')
//   new2.addClass('our-team')
//   var new3 = $('<div></div>')
//   new3.addClass('pic')
//   var new4 = $('<img>')
//   new3.append(new4)

//   var new5 = $('<div>')
//   new5.addClass('team-content')
//   var new6 = $('<h3></h3>')
//   new6.addClass('title')
//   var new7 = $('<Span></Span>')
//   new7.addClass('post')
//   new5.append(new6)
//   new5.append(new7)
//   var new8 = $('<ul></ul>')
//   var new9 = $('<li></li>')
//   new9.html('<a  href="#" class="fa fa-phone"></a>');
//   var new10 = $('<li></li>')
//   new10.html('<a  href="#" class="fa fa-comments"></a>');
//   var new11 = $('<li></li>')
//   new11.html('<a  href="#" class="fa fa-envelope"></a>');
//   var new12 = $('<li></li>')
//   new12.html('<a  href="#" class="fa fa-plus"></a>');
//   new8.append(new9)
//   new8.append(new10)
//   new8.append(new11)
//   new8.append(new12)
//   new1.append(new2)
//   new2.append(new3)
//   new2.append(new5)
//   new2.append(new8)
//   new6.text(item.tittle1)
//   new7.text(item.tittle2)


// })


$(function () {
  $(document).on('click', '.team-content .title', function (e) {
    // console.log($(this).data('peopleId')); // 使用 this 更准确
    sessionStorage.setItem('id', $(e.target).data('peopleId'));
    $(location).prop('href', 'Description.html');
  });
});