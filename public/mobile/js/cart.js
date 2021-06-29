$(function () {
  $.ajax({
    type: "get",
    url: "/cart/queryCart",
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.error) {
        location.href = "./login.html";
      } else {
        var obj = {
          list: data,
        };
        $(".mui-table-view").html(template("tmp", obj));
      }
    },
  });
  var id = null;
  var isDelete = null;

  $(".mui-table-view").on("click", ".btn_delete", function () {
    id = $(this).parent().data("id");
    $(this).parent().parent().remove(id);
    $.ajax({
      type: "get",
      url: "/cart/deleteCart",
      data: {
        id: id,
      },
      dataType: "json",
      success: function (data) {
        console.log("删除成功");
      },
    });
  });
});
