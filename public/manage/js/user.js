$(function () {
  var currentPage = 1;
  var pageSize = 5;
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: "json",
      success: function (res) {
        console.log(res);
        $("tbody").html(template("tmp", res));
        setPage(res.total);
      },
    });
  }
  render();
  var id = "";
  var isDelete = "";
  $("tbody").on("click", ".btn-exec", function () {
    id = $(this).parent().data("id");
    isDelete = $(this).hasClass("btn-success") ? 1 : 0;
    console.log(id, isDelete);
  });

  $(".btn-ok")
    .off("click")
    .click(function () {
      $.ajax({
        type: "POST",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete,
        },
        dataType: "json",
        success: function (data) {
          console.log(data);
          render();
          $(".modal-user").modal("hide");
        },
      });
    });
  function setPage(total) {
    $("#paginator").bootstrapPaginator({
      bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
      currentPage: currentPage, //当前页
      totalPages: Math.ceil(total / pageSize), //总页数
      // size: "small", //设置控件的大小，mini, small, normal,large
      onPageClicked: function (event, originalEvent, type, page) {
        //为按钮绑定点击事件 page:当前点击的按钮值
        currentPage = page;
        render();
      },
    });
  }
});
