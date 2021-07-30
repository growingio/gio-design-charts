var fs = require("fs");
fs.readFile("./public/wenli2.png", "binary", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("数据读取成功");
  }
  const buffer = new Buffer(data, "binary");
  buffer.toString("base64");

  console.log("data: image/png;base64," + buffer.toString("base64"));
});
