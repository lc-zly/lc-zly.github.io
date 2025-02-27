$(function () {
  $.ajax({
    type: "post",
    url: "/ot/getprojectdes",
    data: { id: sessionStorage.getItem('id') },
    success: function (res) {
      console.log(res);
      // 明确检查响应结构
      if (res && res.content) {
        $("p").text(res.content);
      } else {
        console.error("无效的响应格式:", res);
      }
    },
    error: function (xhr, status, error) {
      console.error("请求失败:", error);
    }
  });
});

// projectDes.js
$(window).on('beforeunload', function () {
  sessionStorage.removeItem('id');
});