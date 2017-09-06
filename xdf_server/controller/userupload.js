const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const Models = require('../lib/query/core');
const {
    getNextMonth
} = require('../lib/utils/tool');
const $Renewals = Models.$Renewals;
//优能一对一教学团队·主管四折标课续费情况统计
const Upload = async(ctx) => {
    let excelfilepath = ctx.request.body.filepath;
    let username = ctx.cookies.get("xdf_user");
    let name = ctx.cookies.get("xdf_name");
    var filepath = path.resolve(__dirname, '..');
    var obj = xlsx.parse(filepath + '/public' + excelfilepath);
    let data = obj[0].data;
    let collectionarr = [];
    for (let i = 4; i < data.length; i++) {
        if (data[i].length !== 0) {
            collectionarr.push({
                'campus': data[i][0] || '',
                'assistant': data[i][1] || '',
                'teacher': data[i][2] || '',
                'student': data[i][3] || '',
                'isrenew': data[i][4] || '',
                'measures': data[i][5] || '',
                'create_time': new Date()
            });
        }
    }
    // let doc = await $Renewals.insertCollection(collectionarr);
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let fromDate = year + '-' + month + '-' + 1;
    let toDate = getNextMonth(fromDate);
    let start = new Date(fromDate);
    let end = new Date(toDate);
    let doc = await $Renewals.isSave(username, start, end);
    if (doc) {
        if (doc.length > 0) {
            ctx.status = 400;
            ctx.body = {
                code: 400,
                msg: '请不要重复提交！'
            }
        } else {
            let result = await $Renewals.newAndSave(username, name, collectionarr);
            if (!result) {
                ctx.status = 500;
                ctx.body = {
                    code: 500,
                    msg: '服务器发生错误，保存失败！'
                }
            } else {
                ctx.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '保存成功！'
                }
            }
        }
    }

}

module.exports = {
    Upload
};