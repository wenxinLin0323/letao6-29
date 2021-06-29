$(".cate-title").click(function () {
  $(".cate-list").stop().slideToggle();
});

$(".lt-menu").click(function () {
  $(".lt-aside").toggleClass("lt-out");
  $(".main-head,body").toggleClass("pl-180");
});

$(".login-out").click(function () {
  $.ajax({
    type: "GET",
    url: "/employee/employeeLogout",
    dataType: "json",
    success: function (data) {
      if (data.success) {
        location.href = "./login.html";
      }
    },
  });
});
