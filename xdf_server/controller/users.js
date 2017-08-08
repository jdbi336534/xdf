const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
// const User = require('../models/user').User;
const Models = require('../lib/query/core');
const $User = Models.$User;
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
        console.log('检查到用户名不存在');
        ctx.status = 200;
        ctx.body = {
            info: false
        }
    } else if (doc.password === password) {
        console.log('密码一致!');

        //生成一个新的token,并存到数据库
        let token = createToken(username);
        // console.log(token);
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
        ctx.cookies.set("dotcom_user", username);
        ctx.body = {
            success: true,
            username,
            token, //登录成功要创建一个新的token,应该存入数据库
            create_time: doc.create_time
        };
    } else {
        console.log('密码错误!');
        ctx.status = 200;
        ctx.body = {
            success: false
        };
    }
};
//注册
const Reg = async(ctx) => {
    let user = new User({
        username: ctx.request.body.username,
        password: sha1(ctx.request.body.password), //加密
        token: createToken(this.username) //创建token并存入数据库
    });
    //将objectid转换为用户创建时间(可以不用)
    user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');

    let doc = await $User.findUser(user.username);
    if (doc) {
        console.log('用户名已经存在');
        ctx.status = 200;
        ctx.body = {
            success: false
        };
    } else {
        await new Promise((resolve, reject) => {
            user.save((err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        console.log('注册成功');
        ctx.status = 200;
        ctx.body = {
            success: true
        }
    }
};
//获得所有用户信息
const GetAllUsers = async(ctx) => {
    //查询所有用户信息
    let doc = await $User.findAllUsers();
    ctx.status = 200;
    ctx.body = {
        succsess: '成功',
        result: doc
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

//文件上传
const Upload = (ctx) => {
    var filepath= path.resolve(__dirname, '..');
    var obj = xlsx.parse(filepath+'/'+ctx.req.file.destination+'/'+ctx.req.file.filename);
    console.log('excelobj:',obj);
    ctx.status = 200;
    ctx.body = {
        code:200,
        origionname:ctx.req.file.originalname,
        filename: ctx.req.file.filename,
        filepath:ctx.req.file.destination+'/'+ctx.req.file.filename
    }
}

module.exports = {
    Login,
    Reg,
    GetAllUsers,
    DelUser,
    Upload
};