$(function () {
  var currentPage = 1;
  var pageSize = 5;
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: "json",
      success: function (data) {
        console.log(data);
        $("tbody").html(template("tmp", data));
        setPage(data.total);
      },
    });
  }
  render();

  function setPage(total) {
    $("#paginator").bootstrapPaginator({
      bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
      currentPage: currentPage, //当前页
      totalPages: Math.ceil(total / pageSize), //总页数
      onPageClicked: function (event, originalEvent, type, page) {
        //为按钮绑定点击事件 page:当前点击的按钮值
        currentPage = page;
        render();
      },
    });
  }

  var id = null;
  var isDelete = null;
  $("tbody").on("click", ".btn-exec", function () {
    id = $(this).parent().data("id");
    isDelete = $(this).hasClass("btn-success") ? 1 : 0;
    console.log(id, isDelete);
  });

  // 下拉列表数据填充;
  // ajax 取数据  + 模板引擎渲染
  // 获取二级分类的数据
  $.ajax({
    type: "get",
    url: "/category/querySecondCategoryPaging",
    data: {
      page: 1,
      pageSize: 100,
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      $(".category-two").html(template("tmp-two", data));
    },
  });

  $(".category-two").on("click", "a", function () {
    $(".catetwo-id").text($(this).text());
    $("#brandId").val($(this).data("id"));
    $(".add-form").data("bootstrapValidator").updateStatus("brandId", "VALID");
  });
  // 图片上传
  var picArr = [];
  $("#file").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      var img = data.result.picAddr;
      console.log(data.result.picAddr);
      picArr.unshift(img);
      console.log(picArr);
      $(".img-content").prepend('<img src="' + img + '" alt="" height=100px>');
      if (picArr.length > 3) {
        picArr.pop();
        $(".img-content img:last-child").remove();
      }
      if (picArr.length == 3) {
        $("#picArr").val(JSON.stringify(picArr));
        $(".add-form")
          .data("bootstrapValidator")
          .updateStatus("picArr", "VALID");
      }
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
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请选择分类",
          },
        },
      },
      proName: {
        validators: {
          notEmpty: {
            message: "商品名称不能为空",
          },
        },
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: "商品描述不能为空",
          },
        },
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: "商品数量不能为空",
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "必须是非0的数量",
          },
        },
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: "商品尺码不能为空",
          },
          regexp: {
            regexp: /^[1-9]\d-[1-9]\d*$/,
            message: "必须是xx-xx格式，x是数字",
          },
        },
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: "商品原价不能为空",
          },
          //正则校验
          regexp: {
            regexp: /(^0$)|(^[1-9]\d{0,5}(\.\d{1,2})?$)|(^(0\.\d[1-9])?$)|(^(0\.[1-9])?$)/,
            message: "价格:0-999999.99",
          },
        },
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: "商品现价不能为空",
          },
          //正则校验
          regexp: {
            regexp: /(^0$)|(^[1-9]\d{0,5}(\.\d{1,2})?$)|(^(0\.\d[1-9])?$)|(^(0\.[1-9])?$)/,
            message: "价格:0-999999.99",
          },
        },
      },
      picArr: {
        validators: {
          //不能为空
          notEmpty: {
            message: "图片不能少于三张",
          },
        },
      },
    },
  });

  $(".add-form").on("success.form.bv", function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type: "POST",
      url: "/product/addProduct",
      data: $(".add-form").serialize(),
      dataType: "json",
      success: function (data) {
        console.log(data);
        render();
        $(".modal-product").modal("hide");
        $(".add-form").data("bootstrapValidator").resetForm(true);
        $(".catetwo-id").text("请选择二级分类");
        $(".img-content").empty();
        picArr = [];
      },
    });
  });
});
