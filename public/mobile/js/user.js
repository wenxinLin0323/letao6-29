$(function () {
  $("#logout").click(function () {
    $.ajax({
      type: "get",
      url: "/user/logout",
      dataType: "json",
      success: function (data) {
        console.log(data);
        mui.confirm("确认要退出吗?", "退出", ["否", "是"], function (e) {
          if (e.index == 1) {
            location.href = "./login.html";
          }
        });
      },
    });
  });
});
