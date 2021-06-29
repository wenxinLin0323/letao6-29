$(function () {
  // 1-展示真实的商品信息
  // 1- 获取地址栏中商品id
  // 2- 根据商品id 去后台查询当前id对应商品的数据
  // 3- 把商品的数据渲染到页面中

  // 2- 尺码高亮排他
  // 3-加入购物车

  // 1- 获取地址栏中商品id
  var id = location.search.split("=")[1];
  // 2- 根据商品id 去后台查询当前id对应商品的数据
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: { id: id },
    dataType: "json",
    success: function (res) {
      console.log(res);
      // 渲染
      $(".mui-scroll").html(template("tmp", res));
      // 给轮播图绑定事件
      //获得slider插件对象
      var gallery = mui(".mui-slider");
      gallery.slider({
        interval: 5000, //自动轮播周期，若为0则不自动播放，默认为0；
      });
      // 给数字输入框绑定事件
      mui(".mui-numbox").numbox();
    },
  });

  // 2- 尺码高亮排他
  $(".mui-scroll").on("click", ".lt_size span", function () {
    $(this).addClass("current").siblings().removeClass("current");
  });

  // 3-加入购物车
  // 1- 点击加入购物车按钮，获取商品相关数据（id, 尺码， 数量）， 判断尺码不能为空，如果为空提示，到此结束
  // 2- 通过ajax 把商品添加到购物车
  // 3- 接收添加到购物车结果，
  //     成功： 跳转到购物车
  //     失败： 用户未登录， 去登录页

  $("#addCart").click(function () {
    // 获取商品相关数据（id, 尺码， 数量）
    var size = $(".lt_size .current").text();
    // var num = $('.mui-numbox-input').val();
    var num = mui(".mui-numbox").numbox().getValue();
    console.log(id, num, size);
    if (!size) {
      mui.toast("请选择尺码");
      return;
    }
    //通过ajax 把商品添加到购物车
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: id,
        num: num,
        size: size,
      },
      dataType: "json",
      success: function (res) {
        console.log(res);
        // 添加失败，未登录 跳转到登录页
        // 添加成功 询问用户 是继续浏览，还是去购物车
        if (res.error) {
          location.href = "./login.html?reUrl=" + location.href;
        }
        if (res.success) {
          // 询问用户 是继续浏览，还是去购物车
          mui.confirm(
            "添加到购物车成功",
            "温馨提示",
            ["继续浏览", "去购物车"],
            function (e) {
              if (e.index == 1) {
                location.href = "./cart.html";
              }
            }
          );
        }
      },
    });
  });
});
