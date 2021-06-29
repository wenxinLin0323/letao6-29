$(function () {
  // 1- 渲染左侧一级分类
  // 2- 渲染右侧二级分类
  // 3- 点击左侧一级分类，根据一级分类去渲染对应二级分类 ， 切换高亮效果

  // 1- 渲染左侧一级分类
  // 1-1 获取所有的一级分类
  // 1-2 用模板引擎渲染
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function (res) {
      console.log(res);
      // 渲染
      $(".cate-aside ul").html(template("tmp-one", res));
    },
  });

  // 2- 根据左侧选择一级分类  在右侧渲染对应二级分类
  // 代码即注释
  // id: 一级分类id
  function renderSecondCategoryById(id) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: { id: id },
      dataType: "json",
      success: function (res) {
        console.log(res);
        // 渲染
        $(".cate-content").html(template("tmp-two", res));
      },
    });
  }

  renderSecondCategoryById(1);

  // 3- 点击左侧一级分类，根据一级分类去渲染对应二级分类 ， 切换高亮效果
  $(".cate-aside ul").on("click", "a", function () {
    // 切换高亮效果
    $(this).parent().addClass("current").siblings().removeClass("current");
    // 根据一级分类去渲染对应二级分类
    renderSecondCategoryById($(this).data("id"));
  });
});
