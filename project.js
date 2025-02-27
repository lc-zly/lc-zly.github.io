

$(function () {
  $.ajax({
    type: "get",
    url: "/ot/getnews",
    success: function (res) {
      console.log(res)
      // 遍历数据
      $.each(res, function (index, item) {
        // 创建一个新的div元素
        var new1 = $('<tr></tr>')
        new1.html(`<td><a  href="#">${item.content}</a></td>`);
        // new1.text(item.content)
        new1.data('projectId', item.id)
        $('#tableBody').append(new1);
      });
    }
  })
})


$(function () {
  $(document).on('click', '#tableBody tr', function (e) {
    console.log($(this).data('projectId')); // 使用 this 更准确
    const projectId = $(this).data('projectId')
    sessionStorage.setItem('id', projectId)
    $(location).prop('href', 'projectDes.html');
  });
});