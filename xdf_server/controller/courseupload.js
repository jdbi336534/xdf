const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const Models = require('../lib/query/core');
const $Renewals = Models.$Renewals;


const ejsExcel = require("ejsexcel");// 用于将数据库的数据生成excel
var filepath2 = path.resolve(__dirname, '..');
//获得Excel模板的buffer对象
var exlBuf = fs.readFileSync(filepath2 + "/public/exports/assistantDirector.xlsx");




const {
    getNextMonth
} = require('../lib/utils/tool');
//优能一对一教学团队·主管四折标课续费情况统计
const Uploadandsave = async(ctx) => {
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
            ctx.body = {
                code: 400,
                msg: '本月你已提交，请不要重复提交！'
            }
        } else {
            let result = await $Renewals.newAndSave(username, name, collectionarr);
            if (!result) {
                ctx.body = {
                    code: 500,
                    msg: '服务器发生错误，保存失败！'
                }
            } else {
                ctx.body = {
                    code: 200,
                    msg: '保存成功！'
                }
            }
        }
    }

}

//四折标课文件上传
const Upload = (ctx) => {
    var filepath = path.resolve(__dirname, '..');
    var obj = xlsx.parse(filepath + '/' + ctx.req.file.destination + '/' + ctx.req.file.filename);
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
                'measures': data[i][5] || ''
            });
        }
    }
    //用数据源(对象)data渲染Excel模板
    // ejsExcel.renderExcel(exlBuf, collectionarr).then(function (exlBuf2) {
    //     fs.writeFileSync(filepath2 + "/public/exports/助理主管四折标课统计.xlsx", exlBuf2);
    //     console.log("生成助理主管四折标课统计.xlsx成功！");
    // }).catch(function (err) {
    //     console.error(err);
    // });
    // 这里不能直接存数据库，得手动在页面确认后才行。
    ctx.status = 200;
    ctx.body = {
        code: 200,
        data: collectionarr,
        origionname: ctx.req.file.originalname,
        filename: ctx.req.file.filename,
        // 去掉路径中的public字段
        filepath: (ctx.req.file.destination + '/' + ctx.req.file.filename).replace("public", "")
    }
}

//文件上传
const Fileupload = (ctx) => {
    var filepath = path.resolve(__dirname, '..');
    // 这里返回文件路径，页面在提交的时候提交路径信息
    ctx.status = 200;
    ctx.body = {
        code: 200,
        origionname: ctx.req.file.originalname,
        filename: ctx.req.file.filename,
        // 去掉路径中的public字段
        filepath: (ctx.req.file.destination + '/' + ctx.req.file.filename).replace("public", "")
    }
}

module.exports = {
    Upload,
    Fileupload
};