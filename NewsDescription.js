$.ajax({
  type: "post",
  url: "/ot/getness",
  data: {
    id: sessionStorage.getItem('id'),
  },
  success: function (res) {
    console.log(res);
    $("p").text(res.content);

  }
});