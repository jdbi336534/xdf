const Mail = require('../lib/utils/mail');
const Models = require('../lib/query/core');
const $User = Models.$User;
const User = require('../models/user').User;
const tool =require('../lib/utils/tool');
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
        // maxAge单位是毫秒 60 * 60 * 1000 *n，过期时间为n小时
        ctx.cookies.set("token", token, {
            domain: 'localhost', // 写cookie所在的域名
            path: '/', // 写cookie所在的路径
            maxAge: 60 * 60 * 1000 * 24, // 24小时后失效
            httpOnly: true, // 是否只用于http请求中获取
            overwrite: false // 是否允许重写
        });
        ctx.cookies.set("xdf_user", username, {
            domain: 'localhost', // 写cookie所在的域名
            path: '/', // 写cookie所在的路径
            maxAge: 60 * 60 * 1000 * 24, // 24小时后失效
            httpOnly: true, // 是否只用于http请求中获取
            overwrite: false // 是否允许重写
        });
        ctx.cookies.set("xdf_name", encodeURI(doc.name), {
            domain: 'localhost', // 写cookie所在的域名
            path: '/', // 写cookie所在的路径
            maxAge: 60 * 60 * 1000 * 24, // 24小时后失效
            httpOnly: true, // 是否只用于http请求中获取
            overwrite: false // 是否允许重写
        });
        ctx.cookies.set("xdf_subject", encodeURI(doc.subject), {
            domain: 'localhost', // 写cookie所在的域名
            path: '/', // 写cookie所在的路径
            maxAge: 60 * 60 * 1000 * 24, // 24小时后失效
            httpOnly: true, // 是否只用于http请求中获取
            overwrite: false // 是否允许重写
        });

        ctx.body = {
            code: 200,
            msg: '登录成功！',
            username,
            name: doc.name,
            subject: doc.subject,
            //token, //登录成功要创建一个新的token,应该存入数据库
            create_time: doc.create_time
        };
    }
};
//注册
const Reg = async(ctx) => {
    let username = ctx.request.body.username;
    let password = sha1('111111'); //加密
    let name = ctx.request.body.name;
    let subject = ctx.request.body.subject;
    let role = ctx.request.body.role;
    let email = ctx.request.body.email;
    let token = createToken(username); //创建token并存入数据库
    let doc = await $User.findUser(username);
    if (doc) {
        ctx.body = {
            code: 500,
            msg: '用户名已存在'
        };
    } else {
        let result = await $User.registerUser(username, password, subject, role, name, token, email);
        if (result) {
            ctx.body = {
                code: 200,
                msg: '用户注册成功'
            }
        } else {
            ctx.body = {
                code: 500,
                msg: result
            }
        }
    }
};
// 修改
const Upd = async(ctx) => {
    let id = ctx.request.body.id;
    let username = ctx.request.body.username;
    let name = ctx.request.body.name;
    let subject = ctx.request.body.subject;
    let role = ctx.request.body.role;
    let email = ctx.request.body.email;
    let result = await $User.updateUser(id, username, subject, role, name, email);
    if (result) {
        ctx.body = {
            code: 200,
            data: result,
            msg: '用户信息修改成功'
        }
    }
}
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
// 分页获取用户的数据
const getUserList = async(ctx) => {
    let page = parseInt(ctx.request.body.page);
    let size = parseInt(ctx.request.body.pageSize);
    let name=ctx.request.body.name||'';
    let role =ctx.request.body.role||'';
    let subject=ctx.request.body.subject||'';
    let username =ctx.request.body.username||'';
    // 去掉为空的查询条件
    let obj=tool.deleteObj({
        name,
        role,
        username,
        subject,
    },'');
    let doc = await $User.findUserList(page, size, obj);
    if (doc) {
        doc.code = 200;
        ctx.body = doc;
    } else {
        ctx.status = 500;
        ctx.body = {
            code: 500,
            msg: doc
        }
    }
};
//删除某个用户
const DelUser = async(ctx) => {
    //拿到要删除的用户id
    let id = ctx.request.body.id;
    await $User.delUser(id);
    // if (doc) {
        // ctx.status = 200;
       ctx.body = {
            code:200,
            msg: '删除成功'
        };
    // }

};
// 重置密码
const ResetPassWord = async(ctx)=>{
    let id = ctx.request.body.id;
    let address = ctx.request.body.address;
    let name = ctx.request.body.name;
    let username = ctx.request.body.username;
    let pass = '666666';// 之后随机生成
    let password = sha1(pass);
    let result = await $User.resetPass(id,password);
    let doc = await Mail.sendmail('address',username,name,pass);
    if(result&&doc){
        ctx.body = {
            code:200,
            status:doc,
            msg: '重置的密码已经发送至您的邮箱,请查收！若没有收到请再次重置'
        };
    }else{
        ctx.status = 500;
        ctx.body = {
            code:500,
            msg: result
        };
    }

}


module.exports = {
    Login,
    Reg,
    Upd,
    ResetPassWord,
    GetAllUsers,
    getUserList,
    DelUser
};