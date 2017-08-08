const Models = require('../lib/query/core');
const $Director = Models.$Director;
//保存主管提交的信息
const Save = async(ctx) => {
    //拿到数据
    let prescheduling = ctx.request.body.prescheduling;
    let carryover = ctx.request.body.carryover;
    let Q1prescheduling = ctx.request.body.Q1prescheduling;
    let Q1carryover = ctx.request.body.Q1carryover;
    let takesteps = ctx.request.body.takesteps;
    let speed = ctx.request.body.speed;
    let reason = ctx.request.body.reason;
    let takemeasures = ctx.request.body.takemeasures;
    let research = ctx.request.body.research;
    let development = ctx.request.body.development;
    let others = ctx.request.body.others;
    let remarks = ctx.request.body.remarks;
    let username ="jdb369"
    // 可以进行相关的验证
console.log(ctx.request.body);
    let doc = await $Director.newAndSave(prescheduling, carryover, Q1prescheduling, Q1carryover, takesteps, speed, reason, takemeasures, research, development, others, remarks,username);
    console.log('doc', doc);
    if (doc) {
        ctx.body = {
            code: 200,
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

module.exports = {
    Save
};