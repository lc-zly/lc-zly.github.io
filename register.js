$(function () {
  var number = $(".user-login form ul li input:eq(0)");
  var password = $(".user-login form ul li input:eq(1)");
  var again = $(".user-login form ul li input:eq(2)");
  var sbtn = $(".user-login form .sub");
  const s_err = [
    '"number" length must be less than or equal to 12 characters long',
    '与初始密码不相同',
    '"number" must only contain alpha-numeric characters',
    '"number" is not allowed to be empty',
    '"password" is not allowed to be empty',
    '"again" is not allowed to be empty',
    '学号被占用， 请更换其他用户名！'
  ];
  const c_err = [
    '学号格式错误(1-12位字母加数字)',
    '密码与第一遍不相同',
    '学号只能含有字母或数字',
    '学号不能为空',
    '密码为空',
    '请再次输入密码',
    '学号被占用， 请更换其他学号！',
    '格式错误(密码为6-12位字母加数字)',
  ];
  sbtn.click(function () {
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data: {
        number: number.val(),
        password: password.val(),
        again: again.val(),
      },
      success: function (res) {
        // console.log(res);
        var tip = $(".tip");
        if (res.status === 0) {
          // console.log(tip.find("p"));
          tip.find("p").html('注册成功');
          tip.find("button").off().click(function () {
            $(location).prop('href', 'login');
          })
        }
        else {
          // console.log(tip.find("p"));
          var i = 0;
          for (; i < s_err.length; i++) {
            if (res.message == s_err[i]) {
              // console.log(s_err[i]);
              tip.find("p").html(c_err[i]);
              break;
            }
          }
          if (i == s_err.length) {
            tip.find("p").html(c_err[i]);
          }
          tip.find("button").off().click(function () {
            tip.css('display', 'none');
          })
        }
        tip.css('display', 'block');
      }
    });
  })
}
)