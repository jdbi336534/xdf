const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
// const User = require('../models/user').User;
const Models = require('../lib/query/core');
const $User = Models.$User;
var User = require('../models/user').User;
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../lib/token/createToken.js');


//登录
const Login = async(ctx) => {
    //拿到账号和密码
    let username = ctx.request.body.username;
    let password = sha1(ctx.request.body.password);

    let doc = await $User.findUser(username);
    if (!doc) {
        // console.log('检查到用户名不存在');
        ctx.status = 200;
        ctx.body = {
            code: 400,
            msg: '用户名或密码错误！'
        }
    } else if (doc.password === password) {
        //生成一个新的token,并存到数据库
        let token = createToken(username);
        doc.token = token;
        await new Promise((resolve, reject) => {
            doc.save((err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });

        ctx.status = 200;
        // maxAge单位是毫秒 3600*n，过期时间为n小时
        ctx.cookies.set("token", token);
        ctx.cookies.set("xdf_user", username);
        ctx.cookies.set("xdf_name", encodeURI(doc.name));

        ctx.body = {
            code: 200,
            msg: '登录成功！',
            username,
            name: doc.name,
            token, //登录成功要创建一个新的token,应该存入数据库
            create_time: doc.create_time
        };
    }
};
//注册
const Reg = async(ctx) => {
    let username = ctx.request.body.username;
    let password = sha1(ctx.request.body.password); //加密
    let name = '测试用户';
    let token = createToken(username); //创建token并存入数据库
    let doc = await $User.findUser(username);
    if (doc) {
        ctx.status = 200;
        ctx.body = {
            code: 500,
            msg: '用户名已存在'
        };
    } else {
        let result = await $User.registerUser(username, password, name, token);
        if (result) {
            ctx.status = 200;
            ctx.body = {
                code: 200,
                msg: '用户注册成功'
            }
        }
    }
};
//获得所有用户信息
const GetAllUsers = async(ctx) => {
    //查询所有用户信息
    let doc = await $User.findAllUsers();
    ctx.status = 200;
    ctx.body = {
        code: 200,
        data: doc
    };
};

//删除某个用户
const DelUser = async(ctx) => {
    //拿到要删除的用户id
    let id = ctx.request.body.id;
    await $User.delUser(id);
    ctx.status = 200;
    ctx.body = {
        success: '删除成功'
    };
};

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
    // 这里不能直接存数据库，得手动在页面确认后才行。
    ctx.status = 200;
    ctx.body = {
        code: 200,
        data: collectionarr,
        origionname: ctx.req.file.originalname,
        filename: ctx.req.file.filename,
        filepath: ctx.req.file.destination + '/' + ctx.req.file.filename
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
        filepath: ctx.req.file.destination + '/' + ctx.req.file.filename
    }
}

module.exports = {
    Login,
    Reg,
    GetAllUsers,
    DelUser,
    Upload,
    Fileupload
};