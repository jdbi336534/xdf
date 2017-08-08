const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
//优能一对一教学团队·主管四折标课续费情况统计
const Upload = (ctx) => {
    var filepath= path.resolve(__dirname, '..');
    var obj = xlsx.parse(filepath+'/public/uploads/excel/director.xlsx');
    
    ctx.status = 200;
    ctx.body = {
        code:200,
        fileobj:obj[0].data
    }
}

module.exports = {
    Upload
};