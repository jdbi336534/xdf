const multer = require('koa-multer');//加载koa-multer模块  
const fs = require('fs');
//文件上传  
//配置  
var storage = multer.diskStorage({
  //文件保存路径  
  destination: function (req, file, cb) {
    // 每天会生成不同的文件夹，文件夹的命名以日期命名，如20160709
    let date = new Date();
    let Y = date.getFullYear() + '';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
    let D = date.getDate() + '';
    let datepath = Y + M + D;
    // 如果文件夹不存在，则创建文件夹
    if (!fs.existsSync('public/uploads/excel/' + datepath)) {
      fs.mkdirSync('public/uploads/excel/' + datepath);
    }
    cb(null, 'public/uploads/excel/' + datepath);
  },
  //修改文件名称  
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置  
module.exports = multer({ storage: storage });  