var myChart1 = echarts.init(document.getElementById("main1"));
var myChart2 = echarts.init(document.getElementById("main2"));
// 指定图表的配置项和数据
var option1 = {
  title: {
    text: "2017年注册人数",
  },
  tooltip: {},
  legend: {
    data: ["人数"],
  },
  xAxis: {
    data: ["一月", "二月", "三月", "四月", "五月", "六月"],
  },
  yAxis: {},
  series: [
    {
      name: "人数",
      type: "bar",
      data: [200, 700, 300, 1100, 650, 520],
    },
  ],
};

var option2 = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: 10,
    data: ["耐克", "阿迪达斯", "李宁", "新百伦", "匡威"],
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "30",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 335, name: "耐克" },
        { value: 310, name: "阿迪达斯" },
        { value: 234, name: "李宁" },
        { value: 135, name: "新百伦" },
        { value: 1548, name: "匡威" },
      ],
    },
  ],
};

// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);
myChart2.setOption(option2);
