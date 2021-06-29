$(function () {
  var currentPage = 1;
  var pageSize = 3;

  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
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

  // 分页
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

  // 3- 下拉列表数据填充
  // ajax 取数据  + 模板引擎渲染
  // 获取一级分类的数据
  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    data: {
      page: 1,
      pageSize: 100,
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      $(".category-one").html(template("tmp-one", data));
    },
  });

  // 4- 下拉列表选中
  // 1- 点击a标签，获取a标签的文字， 赋值给按钮
  // 2- 获取a标签的data-id ,赋值给隐藏域  ，将来会提交给后台
  $(".category-one").on("click", "a", function () {
    $(".cateone-id").text($(this).text());
    $("#categoryId").val($(this).data("id"));
    $(".add-form")
      .data("bootstrapValidator")
      .updateStatus("categoryId", "VALID");
  });

  // 上传图片
  $("#file").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      var url = data.result.picAddr;
      console.log(data.result.picAddr);
      $("#img-sc").attr("src", url);
      $("#brandLogo").val(url);
      $(".add-form")
        .data("bootstrapValidator")
        .updateStatus("brandLogo", "VALID");
    },
  });

  //使用表单校验插件
  $(".add-form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [":disabled"],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh",
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: "选项不能为空",
          },
        },
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: "名称不能为空",
          },
        },
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: "图片不能为空",
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
      url: "/category/addSecondCategory",
      data: $(".add-form").serialize(),
      dataType: "json",
      success: function (res) {
        console.log(res);
        render();
        $(".modal-add").modal("hide");
        $(".add-form").data("bootstrapValidator").resetForm(true);
        $(".cateone-id").text("请选择一级分类");
        $("#img-sc").attr("src", "./images/none.png");
      },
    });
  });
});
