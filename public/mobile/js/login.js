$(".btn-login").click(function () {
  var username = $(".mui-input-clear").val();
  var password = $(".mui-input-password").val();
  if (username.trim().length == 0) {
    mui.toast("请输入用户名");
    return;
  }
  if (password.trim().length == 0) {
    mui.toast("请输入密码");
    return;
  }
  $.ajax({
    type: "POST",
    url: "/user/login",
    data: {
      username: username,
      password: password,
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.error) {
        mui.toast(data.message);
      }
      if (data.success) {
        if (location.search.indexOf("reUrl") > -1) {
          var url = location.href.split("?reUrl=")[1];
          location.href = url;
        } else {
          location.href = "./user.html";
        }
      }
    },
  });
});
