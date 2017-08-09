const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const Models = require('../lib/query/core');
const $Renewals = Models.$Renewals;
//优能一对一教学团队·主管四折标课续费情况统计
const Upload = (ctx) => {
    var filepath = path.resolve(__dirname, '..');
    var obj = xlsx.parse(filepath + '/public/uploads/excel/director.xlsx');
    let data = obj[0].data;
    let collectionarr = [];
    for (let i = 2; i < data.length; i++) {
        collectionarr.push({
            'district': data[i][0] || '',
            'subject': data[i][1] || '',
            'leftdirector': data[i][2] || '',
            'teacher': data[i][3] || '',
            'student': data[i][4] || '',
            'renew': data[i][5] || '',
            'measures': data[i][6] || ''
        });
    }
    $Renewals.insertCollection(collectionarr, function () {
        if (err) {
            // TODO: handle error
        } else {
            console.info('%d potatoes were successfully stored.', docs.length);
        }
    });
    ctx.status = 200;
    ctx.body = {
        code: 200,
        fileobj: collectionarr
    }
}

module.exports = {
    Upload
};