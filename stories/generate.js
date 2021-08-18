(function generate() {
  var monthes = ['一月', '二月', '三月', '四月', '五月', '六月', '7月', '8月', '9月', '10月', '11月', '12月'];
  var cities = [
    // "北京",
    // "上海",
    // "深证",
    // "郑州",
    // "杭州",
    // "兰州",
    // "福州",
    // "广州",
    // "南宁",
    // "长沙",
    // "合肥",
    // "南京",
    '长春',
    '哈尔滨',
    '石家庄',
  ];
  var data = [];
  monthes.map(function (month) {
    cities.map(function (city) {
      data.push({
        month,
        city,
        temperature: Number((Math.random() * 20 + 10).toFixed(2)),
      });
    });
  });
})();
