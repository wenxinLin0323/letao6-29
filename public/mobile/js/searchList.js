$(function () {
  // 1- 获取传递后来搜索关键字 ， 填充在输入框中
  // 2- 根据关键字 去后台搜索对应商品，并渲染在中
  // 3- 点击搜索按钮，根据新的关键字 重新进行搜索

  // 获取地址栏搜索关键字
  // location.search  可以获取地址栏参数部分
  // decodeURI() 对地址栏中文进行解码
  var key = decodeURI(location.search.split("=")[1]);
  console.log(key);

  // 把关键字填充到输入框
  $(".search_input").val(key);

  // 2- 根据关键字 去后台搜索对应商品，并渲染在中
  var obj = {
    proName: key,
    page: 1,
    pageSize: 100,
  };

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: obj,
      dataType: "json",
      beforeSend: function () {
        $(".lt_product").html('<div class="loading"></div>');
      },
      success: function (res) {
        console.log(res);
        // 渲染
        setTimeout(function () {
          $(".lt_product").html(template("tmp", res));
        }, 800);
      },
    });
  }
  render();

  // 3- 点击搜索按钮，根据新的关键字 重新进行搜索
  // 判断关键字非空
  // 添加历史记录
  // 去重
  // 长度限制
  // 搜索商品并展示
  $(".search_btn").click(function () {
    // 获取搜素关键字
    var txt = $(".search_input").val();
    // 判断是否为空，为空到此结束
    if (txt.trim().length == 0) {
      mui.toast("请输入关键字");
      return;
    }
    // 添加
    // 1 - 先把json字符串读取处理，转成数组
    var arr = JSON.parse(localStorage.getItem("search"));
    // 添加之前， 去重
    // 在新记录添加到历史记录之前，先判断是否有重复项，有重复就先删除重复项，在添加
    var index = arr.indexOf(txt);
    if (index > -1) {
      //删除重复项
      arr.splice(index, 1);
    }

    // 2 - 向数组中添加
    arr.unshift(txt);
    //添加之后  只保留最近6条记录
    if (arr.length > 6) {
      // 删除最后一条
      arr.pop();
    }
    // 3 - 把添加数据后数组 转成字符串，再存回本地
    localStorage.setItem("search", JSON.stringify(arr));

    // 根据新的关键字搜索商品并渲染
    obj.proName = txt;
    // 重新渲染
    render();
  });
});
