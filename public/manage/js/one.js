$(function () {
  var currentPage = 1;
  var pageSize = 3;
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
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
  $(".add-form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [":disabled", ":hidden", ":not(:visible)"],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh",
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: "名称不能为空",
          },
        },
      },
    },
  });
  $(".add-form").on("success.form.bv", function (e) {
    // 阻止表单的默认事件触发;
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/category/addTopCategory",
      data: $(".add-form").serialize(),
      dataType: "json",
      success: function (res) {
        console.log(res);
        currentPage = 1;
        render();
        $(".modal-add").modal("hide");
        $(".add-form").data("bootstrapValidator").resetForm(true);
      },
    });
  });
  render();
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
