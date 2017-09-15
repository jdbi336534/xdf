const Models = require('../lib/query/core');
const $Subject = Models.$Subject;

//获得所有学科组
const GetAllSubject = async(ctx) => {
    //查询所有用户信息
    let doc = await $Subject.findAllSubject();
    ctx.status = 200;
    ctx.body = {
        code: 200,
        data: doc
    };
};

//获得所有学科组
const SubjectFindById = async(ctx) => {
    let id = ctx.query.id;
    let doc = await $Subject.findOneById(id);
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



module.exports = {
    GetAllSubject,
    SubjectFindById
};