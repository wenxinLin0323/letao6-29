Bootstrap Paginator是一款基于Bootstrap的js分页插件，功能很丰富，个人觉得这款插件已经无可挑剔了。它提供了一系列的参数用来支持用户的定制，提供了公共的方法可随时获得插件状态的改变，以及事件来监听用户的动作。目前经过测试的浏览器包括： Firefox 5+, Chrome 14+, Safari 5+, Opera 11.6+ and IE 7+。

GitHub 官网地址：<https://github.com/lyonlai/bootstrap-paginator>

**参数介绍：**

| **参数名**              | **数据类型**     | **默认值** | **描述**                                                     |
| ----------------------- | ---------------- | ---------- | ------------------------------------------------------------ |
| bootstrapMajorVersion   | number           | 2          | 搭配使用的Bootstrap版本，2.X 的 分页必须使用div元素，3.X分页的必须使用ul元素。请注意与所使用的bootstrap版本对应上。 |
| size                    | string           | "normal"   | 设置控件的显示大小，是个字符串. 允许的值: *mini*, *small*, *normal*,*large。*值：mini版的、小号的、正常的、大号的。 |
| itemContainerClass      | function         |            | 该参数接收一个函数，返回一个字符串，该字符串是一个我们自定义的class类样式。当控件内的每个操纵按钮被渲染(render)时，都会调用该函数，同时把有关该按钮的信息作为参数传入。参数：**type**,**page**, **current** 。**type**为该控件的操作按钮的类型，如上图所示的五种类型：first、prev、page、next、last。**page**为该按钮所属第几页。**current** 指示整个控件的当前页是第几页。 |
| currentPage             | number           | 1          | 设置当前页.                                                  |
| numberOfPages           | number           | 5          | 设置控件显示的页码数.即：类型为"page"的操作按钮的数量。      |
| totalPages              | number           | 1          | 设置总页数.                                                  |
| pageUrl                 | function         |            | 实际上，控件内的每个操作按钮最终会被渲染成超链接，该参数的作用就是设置超链接的链接地址。该参数是个函数，参数为：**type**,**page**, **current。**这样我们就可以通过这个函数为每个操作按钮动态设置链接地址。如："http://example.com/list/page/"+page |
| shouldShowPage          | boolean/function | true       | 该参数用于设置某个操作按钮是否显示，可是个布尔值也可是个函数。当为true时，显示。当为false时，不显示。如果该参数是个函数，需要返回个布尔值，通过这个返回值判断是否显示。函数有3个参数: **type**, **page**, **current。**使用函数的好处是，可以对每个操作按钮进行显示控制。 |
| itemTexts               | function         |            | 控制每个操作按钮的显示文字。是个函数，有3个参数: **type**, **page**, **current。**通过这个参数我们就可以将操作按钮上的英文改为中文，如first-->首页，last-->尾页。 |
| tooltipTitles           | function         |            | 设置操作按钮的title属性。是个函数，有3个参数: **type**, **page**, **current。** |
| useBootstrapTooltip     | boolean          | false      | 设置是否使用Bootstrap内置的tooltip。 true是使用，false是不使用,默认是不使用。注意：如果使用，则需要引入bootstrap-tooltip.js插件。 |
| bootstrapTooltipOptions | object           |            | Default:    {        animation: true,        html: true,        placement: 'top',        selector: false,        title: "",        container: false }该参数是个js对象。当参数useBootstrapTooltip为true时，会将该对象传给Bootstrap的bootstrap-tooltip.js插件。 |
| onPageClicked           | function         |            | 为操作按钮绑定click事件。回调函数的参数：**event**, **originalEvent**, **type**,**page。** |
| onPageChanged           | function         |            | 为操作按钮绑定页码改变事件，回调函数的参数：**event**, **oldPage**, **newPage。** |

**公共命令：**

另外该插件还提供了几个公共的命令，可以通过如下方法调用，如：$('.example').bootstrapPaginator("show",3) 调用show命令$('.example').bootstrapPaginator("getPages") 调用getPages命令。

| **命令名**   | **参数** | **返回值** | **描述**                                                     |
| ------------ | -------- | ---------- | ------------------------------------------------------------ |
| show         | page     |            | **show**命令用于直接跳转到特定的page，与直接点击操作按钮的效果是一样的。使用方法，如：$('#example').bootstrapPaginator("show",3) 直接跳转到第3页，$('#example').bootstrapPaginator("show",100)直接跳转到100页。 |
| showFirst    |          |            | **showFirst** 命令用于直接跳转到首页，与点击first按钮相同。使用方法：$('#example').bootstrapPaginator("showFirst") |
| showPrevious |          |            | **showPrevious** 命令用于直接跳转到上一页。使用方法：$('#example').bootstrapPaginator("showPrevious") |
| showNext     |          |            | **showNext**命令用于直接跳转到下一页。                       |
| showLast     |          |            | **showLast** 命令用于直接跳转到上一页。                      |
| getPages     |          | *object*   | **getPages**命令用于返回当前控件中显示的页码，以数组形式返回。使用方法：var arra = $('#example').bootstrapPaginator("getPages") |
| setOptions   | *object* |            | **setOptions** 命令用于重新设置参数，使用方法：$('#example').bootstrapPaginator("setOptions",newoptions) |

**事件Events：**

Bootstrap Paginator 提供了俩个事件：*page-clicked*和*page-changed*。这俩个事件作为参数使用，分别对应*onPageClicked*和*onPageChanged*。

| **事件名**   | **回调函数**                                       | **描述**                                                     |
| ------------ | -------------------------------------------------- | ------------------------------------------------------------ |
| page-clicked | function(*event*, *originalEvent*, *type*, *page*) | 同上文。另外，参数*event*, *originalEvent是俩个jquery事件对象，可参考jquery相关文档* |
| page-changed | function(*event*, *oldPage*, *newPage*)            | 同上文                                                       |

 

**Demo 示例：**

1-引包

```js
    <script src="./lib/jquery/jquery.min.js"></script>
    <script src="./lib/bootstrap-validator/js/bootstrapValidator.min.js"></script>
    <script src="./lib/bootstrap-paginator/bootstrap-paginator.min.js"></script>
```

2-准备一个分页父容器：

> 搭配使用的Bootstrap版本，2.X 的 分页必须使用div元素，3.X分页的必须使用ul元素。请注意与所使用的bootstrap版本对应上。

```html
	<ul id="paginator"></ul>
```

3-初始化分页插件

```js
$("#paginator").bootstrapPaginator({
      bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
      currentPage:1,//当前页
      totalPages:10,//总页数
      size:"small",//设置控件的大小，mini, small, normal,large
      onPageClicked:function(event, originalEvent, type,page){
        //为按钮绑定点击事件 page:当前点击的按钮值
      }

});

```



 

 ![img](file:///C:\Users\cc\AppData\Local\Temp\ksohtml\wpsC8D.tmp.png)

![img](file:///C:\Users\cc\AppData\Local\Temp\ksohtml\wpsC8E.tmp.png) 

 

注意：分页样式用BootStrap 的，如果单独使用，请去BootStrap中把分页样式拷出来。jQuery版本需要1.8及以上。

 