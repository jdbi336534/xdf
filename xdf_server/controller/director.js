const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const Models = require('../lib/query/core');
const moment = require('moment');
const tool =require('../lib/utils/tool');
const $Director = Models.$Director;
const $Renewals = Models.$Renewals;
//保存主管提交的信息
const Save = async(ctx) => {
    // 获得cookie
    if (ctx.cookies.get("xdf_user")) {
        //  ctx.body = {
        //     code: 500,
        //     msg: '保存失败！'
        // };
    } else {}
    //拿到数据
    let prescheduling = ctx.request.body.prescheduling;
    let carryover = ctx.request.body.carryover;
    let Q1prescheduling = ctx.request.body.Q1prescheduling;
    let Q1carryover = ctx.request.body.Q1carryover;
    let takesteps = ctx.request.body.takesteps;
    let prespeed = ctx.request.body.prespeed;
    let speed = ctx.request.body.speed;
    let reason = ctx.request.body.reason;
    let takemeasures = ctx.request.body.takemeasures;
    let firstfive = ctx.request.body.firstfive;
    let lastfive = ctx.request.body.lastfive;
    let others = ctx.request.body.others;
    let isresearch = ctx.request.body.isresearch;
    let notresearchreason = ctx.request.body.notresearchreason;
    let filepath = ctx.request.body.filepath;
    let imgpath = ctx.request.body.imgpath;
    let researchexp = ctx.request.body.researchexp;
    let username = ctx.cookies.get("xdf_user");
    let name = ctx.cookies.get("xdf_name");
    let subject = ctx.cookies.get("xdf_subject");
    let excelfilepath = ctx.request.body.excelpath;
    // 可以进行相关的验证


    let realfilepath = path.resolve(__dirname, '..');
    console.log(realfilepath + '/public' + excelfilepath);
    let obj = xlsx.parse(realfilepath + '/public' + excelfilepath);
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
    let doc = await $Director.newAndSave(prescheduling, carryover, Q1prescheduling, Q1carryover, takesteps, prespeed, speed, reason, takemeasures, firstfive, lastfive, others, isresearch, notresearchreason, filepath, imgpath, researchexp, username, name, subject);
    let result = await $Renewals.newAndSave('username', 'name', collectionarr);
    if (doc&&result) {
        ctx.body = {
            code: 200,
            data: ctx.request.body,
            msg: '保存成功！'
        }
    } else {
        // ctx.status = 200;
        ctx.body = {
            code: 500,
            msg: '保存失败！'
        };
    }
};
const FindByDate = async(ctx) => {
    let ctxstart = ctx.request.body.start;
    let ctxend = ctx.request.body.end;
    let start = new Date(ctxstart);
    let end = new Date(ctxend);
    // console.log(start,moment(start).format('YYYY-MM-DD HH:mm:ss'));
    // console.log(end,moment(end).format('YYYY-MM-DD HH:mm:ss'));
    let doc = await $Director.findBydate(start, end);
    // for(let item in doc){
    //     console.log(moment(item.create_time).format('YYYY-MM-DD HH:mm:ss'));
    //     item.create_time=moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
    // }
    if (doc) {
        ctx.body = {
            code: 200,
            start,
            end,
            date: doc
        }
    } else {
        ctx.body = {
            code: 500,
            msg: doc
        }
    }
};
const FindById = async(ctx) => {
    // get 请求，获取get的参数的值
    let id = ctx.query.id;
    let doc = await $Director.findOne(id);
    if (doc) {
        ctx.body = {
            code: 200,
            data: doc
        }
    } else {
        ctx.body = {
            code: 500,
            msg: doc
        }
    }
};
const getAssistantList = async(ctx) => {
    let page = parseInt(ctx.request.body.page);
    let size = parseInt(ctx.request.body.pageSize);
    let name=ctx.request.body.name||'';
    let prespeed =ctx.request.body.prespeed||'';
    let speed=ctx.request.body.speed||'';
    let subject =ctx.request.body.subject||'';
    let start=ctx.request.body.start||'';
    let end =ctx.request.body.end||'';
    // 去掉为空的查询条件
    let obj=tool.deleteObj({
        name,
        prespeed,
        speed,
        subject,
    },'');
    if(start!==''&&end !==''){
        obj.create_time={
            '$gt': new Date(start),
            '$lt': new Date(end)
        }
    }
    console.log(obj);
    let doc = await $Director.findAssistantList(page,size,obj);
    if (doc) {
        doc.code = 200;
        ctx.body = doc;
    } else {
        ctx.throw(400, '服务器错误');
    }
};



module.exports = {
    Save,
    FindByDate,
    FindById,
    getAssistantList
};