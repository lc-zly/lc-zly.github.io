$.ajax({
  type: "post",
  url: "/ot/getdes",
  data: {
    id: sessionStorage.getItem('id'),
  },
  success: function (res) {
    // console.log(res);
    $("p").text(res.content);

  }
});