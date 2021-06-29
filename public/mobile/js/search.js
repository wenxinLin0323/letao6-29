$(function () {
  // 0 - 准备历史记录 假数据
  // 1- 从本地 动态渲染历史记录
  // 数据 + 模板
  // 如果没有取到数据 默认赋值[]
  function render() {
    var history = JSON.parse(localStorage.getItem('search')) || []
    // console.log(history);
    // 渲染
    $('.search-main').html(template('tmp', { list: history }))
  }

  render()

  // 2 - 清空历史
  // 1-点击清空历史按钮，弹出确认框， 确认后， 删除本地存储中对应数据 removeItem(key);
  // 2- 删除完成后，页面重新渲染
  // 确认框
  // mui.confirm(消息， 标题，[按钮组]， function (){});

  // 用事件委托来绑定事件
  $('.search-main').on('click', '.history-clear', function () {
    // $('.history-clear').click(function () {
    mui.confirm(
      '确定要清空吗？',
      '警告',
      ['在想想', '不想了', '嘿嘿'],
      function (e) {
        console.log(e)
        // e.index 按钮下标
        if (e.index == 1) {
          //清空
          localStorage.removeItem('search')
          // 重新渲染
          render()
        }
      }
    )
  })

  // 3 - 删除单个历史
  // 1- 点击删除按钮，获取当前数据下标， 弹出确认框
  // 2- 根据下标去本地中删除对应的数据
  //     数据 以字符串的形式存储，以数组形态去操作
  //     1- 先把json字符串读取处理，转成数组
  //     2- 从数组中删除
  //     3- 把删除数据后数组 转成字符串，再存回本地
  // 3- 删除完成后，页面重新渲染
  $('.search-main').on('click', '.history-del', function () {
    // 获取当前数据下标
    var index = $(this).data('index')
    //弹出确认框
    mui.confirm('确定要删除吗？', '警告', ['不删了', '删了'], function (e) {
      // e.index 获取点击按钮索引值
      if (e.index == 1) {
        // 1- 先把json字符串读取处理，转成数组
        var arr = JSON.parse(localStorage.getItem('search'))
        // 2- 从数组中删除  arr.splice(从哪删， 删几个， 替换项);
        arr.splice(index, 1)
        // 3- 把删除数据后数组 转成字符串，再存回本地
        localStorage.setItem('search', JSON.stringify(arr))
        // 重新渲染
        render()
      }
    })
  })

  // 4 - 添加历史记录
  // 1 - 点击搜索按钮，获取搜素关键字， 判断是否为空，为空到此结束
  // 2 - 将历史记录添加到本地
  // 数据 以字符串的形式存储，以数组形态去操作
  // 1 - 先把json字符串读取处理，转成数组
  // 2 - 向数组中添加
  // 3 - 把添加数据后数组 转成字符串，再存回本地
  // 3 - 添加完成后，页面重新渲染
  // 注意点：
  // 1 - 历史记录不能有重复
  //     在新记录添加到历史记录之前，先判断是否有重复项，有重复就先删除重复项，在添加
  // 2 - 只保留最近6条记录
  //      在新数据 添加到数组中后，判断数据是越界
  $('.search-btn').click(function () {
    // 获取搜素关键字
    var txt = $('.search-txt').val()
    // 判断是否为空，为空到此结束
    if (txt.trim().length == 0) {
      mui.toast('请输入关键字')
      return
    }
    // 清空输入框
    $('.search-txt').val('')
    // 添加
    // 1 - 先把json字符串读取处理，转成数组
    var arr = JSON.parse(localStorage.getItem('search'))
    // 添加之前， 去重
    // 在新记录添加到历史记录之前，先判断是否有重复项，有重复就先删除重复项，在添加
    var index = arr.indexOf(txt)
    if (index > -1) {
      //删除重复项
      arr.splice(index, 1)
    }

    // 2 - 向数组中添加
    arr.unshift(txt)
    //添加之后  只保留最近6条记录
    if (arr.length > 6) {
      // 删除最后一条
      arr.pop()
    }
    // 3 - 把添加数据后数组 转成字符串，再存回本地
    localStorage.setItem('search', JSON.stringify(arr))

    // 重新渲染
    render()

    // 跳转到搜索列表页搜索对应商品并展示
    location.href = './searchList.html?key=' + txt
  })
})
