const Models = require('../lib/query/core');
const moment = require('moment');
const $Director = Models.$Director;
//保存主管提交的信息
const Save = async(ctx) => {
    // 获得cookie
    if (ctx.cookies.get("xdf_user")) {
        //  ctx.body = {
        //     code: 500,
        //     msg: '保存失败！'
        // };
    } else {

    }
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
    // let remarks = ctx.request.body.remarks;
    let username = ctx.cookies.get("xdf_user");
    // 可以进行相关的验证
    let doc = await $Director.newAndSave(prescheduling, carryover, Q1prescheduling, Q1carryover, takesteps, prespeed, speed, reason, takemeasures, firstfive, lastfive, others, isresearch, notresearchreason, filepath, imgpath, username);
    console.log('doc', doc);
    if (doc) {
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
    let ctxstart =ctx.request.body.start;
    let ctxend =ctx.request.body.end;    
    let start = new Date(ctxstart);
    let end = new Date(ctxend);
    // console.log(start,moment(start).format('YYYY-MM-DD HH:mm:ss'));
    // console.log(end,moment(end).format('YYYY-MM-DD HH:mm:ss'));
    let doc = await $Director.findBydate(start, end);
    for(let item in doc){
        console.log(moment(item.create_time).format('YYYY-MM-DD HH:mm:ss'));
        item.create_time=moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
    }
    if (doc) {
        ctx.body = {
            code: 200,
            start,
            end,
            date: doc
        }
    }else{
        ctx.body={
            code:500,
            msg:doc
        }
    }
}
module.exports = {
    Save,
    FindByDate
};