// 鼠标移入的时候选定，其他导航点没有选中
$(function () {
  $(".slider label").on("mouseover", function () {
    var targetid = $(this).attr("for");
    // var inputt = $('input[type="radio"][for="'targetid'"]').attr("name");
    $('input[type="radio"][name="select"][id="' + targetid + '"]').prop("checked", true);
    // console.log(1111)
    // console.log($(this).siblings("label"));
    $(this).siblings("label").prop("checked", false);
  }).hover(
    //鼠标移入代码
    function () {
      $(this).siblings("label").css({ "width": "15px", "height": "25px", "border-radious": "12.5px", "transition": ".6s" })
    },


    //鼠标移出代码
    function () {
      $(this).siblings("label").css({ "width": "10px", "height": "25px", "border-radious": "20px", "transition": ".6s" })
    }

  )
});

// 鼠标移入的时候选定，其他导航点没有选中re
$(function () {
  $(".reslider label").on("mouseover", function () {
    var targetid = $(this).attr("for");
    // var inputt = $('input[type="radio"][for="'targetid'"]').attr("name");
    $('input[type="radio"][name="reselect"][id="' + targetid + '"]').prop("checked", true);
    // console.log(1111)
    // console.log($(this).siblings("label"));
    $(this).siblings("label").prop("checked", false);
  }).hover(
    //鼠标移入代码
    function () {
      $(this).siblings("label").css({ "width": "15px", "height": "25px", "border-radious": "12.5px", "transition": ".6s" })
    },


    //鼠标移出代码
    function () {
      $(this).siblings("label").css({ "width": "10px", "height": "25px", "border-radious": "20px", "transition": ".6s" })
    }

  )
});

// 获取大图片
//加载图片
$.ajax({
  type: "get",
  url: "/api/images1",
  success: function (res) {
    // console.log(res);
    var newimgurl = res[0].url
    $('.box').css('background', `url("${newimgurl}") center/cover no-repeat`);
  },
  error: function (xhr, status, error) {
    console.error("获取背景图像url出错：", error);
  }
});

//获取第二部分的图片
$.ajax({
  type: "get",
  url: "/api/images2",
  success: function (res) {
    console.log(res);
    // var newimgurl = res[0].url
    $('.mincard.card-1').find('.img img').prop('src', res[0].url);
    $('.mincard.card-1').find('.content .title').text(res[0].tittle);
    $('.mincard.card-1').find('.content .text').text(res[0].text);
    //
    $('.mincard.card-2').find('.img img').prop('src', res[1].url);
    $('.mincard.card-2').find('.content .title').text(res[1].tittle);
    $('.mincard.card-2').find('.content .text').text(res[1].text);
    //
    $('.mincard.card-3').find('.img img').prop('src', res[2].url);
    $('.mincard.card-3').find('.content .title').text(res[2].tittle);
    $('.mincard.card-3').find('.content .text').text(res[2].text);
  },
  error: function (xhr, status, error) {
    console.error("获取背景图像url出错：", error);
  }
});

//获取第二部分的图片re
$.ajax({
  type: "get",
  url: "/api/images2re",
  success: function (res) {
    console.log(res);
    // var newimgurl = res[0].url
    $('.remincard.recard-1').find('.reimg img').prop('src', res[0].url);
    $('.remincard.recard-1').find('.recontent .retitle').text(res[0].tittle);
    $('.remincard.recard-1').find('.recontent .retext').text(res[0].text);
    //
    $('.remincard.recard-2').find('.reimg img').prop('src', res[1].url);
    $('.remincard.recard-2').find('.recontent .retitle').text(res[1].tittle);
    $('.remincard.recard-2').find('.recontent .retext').text(res[1].text);
    //
    $('.remincard.recard-3').find('.reimg img').prop('src', res[2].url);
    $('.remincard.recard-3').find('.recontent .retitle').text(res[2].tittle);
    $('.remincard.recard-3').find('.recontent .retext').text(res[2].text);
  },
  error: function (xhr, status, error) {
    console.error("获取背景图像url出错：", error);
  }
});

//获取第三部分的图片
$.ajax({
  type: "get",
  url: "/api/images3",
  success: function (res) {
    console.log(res);
    // var newimgurl = res[0].url
    $('#oo1').find('img').prop('src', res[0].url);
    $('#oo1').find('h1').text(res[0].h1);
    $('#oo1').find('h2').text(res[0].h2);
    $('#oo1').find('p').text(res[0].p);
    //
    $('#oo2').find('img').prop('src', res[1].url);
    $('#oo2').find('h1').text(res[1].h1);
    $('#oo2').find('h2').text(res[1].h2);
    $('#oo2').find('p').text(res[1].p);
    //
    $('#oo3').find('img').prop('src', res[2].url);
    $('#oo3').find('h1').text(res[2].h1);
    $('#oo3').find('h2').text(res[2].h2);
    $('#oo3').find('p').text(res[2].p);
  },
  error: function (xhr, status, error) {
    console.error("获取背景图像url出错：", error);
  }
});

//获取
$.ajax({
  type: "get",
  url: "/api/newtext",
  success: function (res) {
    console.log(res);
    // var newimgurl = res[0].url
    res.forEach(function (item, index) {
      $(".new-text").find('a').eq(index).prop('href', item.href)
      $(".new-text").find('h3').eq(index).text(item.text)
    })
  },
  error: function (xhr, status, error) {
    console.error("获取最新动态出错：", error);
  }
});