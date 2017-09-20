var User = require('../../models/user').User;
//数据库的操作
//根据用户名查找用户
exports.findUser = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            username
        }, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};
//找到所有用户
exports.findAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};
//分页获取所有用户数据
exports.findUserList = (page, size, opt) => {
    return new Promise((resolve, reject) => {
        User.count(opt, (err, count) => {
            if (err) {
                reject(err);
            }
            User.find(opt, null, {
                skip: (page - 1) * size,
                sort: {
                    create_time: -1
                },
                limit: size
            }, (err, doc) => {
                if (err) {
                    reject(err);
                }
                let obj = {
                    total: count,
                    data: doc,
                    page,
                    size
                }
                resolve(obj);
            })
        });
    });
};
//删除某个用户
exports.delUser = (id) => {
    return new Promise((resolve, reject) => {
        User.findOneAndRemove({
            _id: id
        }, err => {
            if (err) {
                reject(err);
            }
            console.log('删除用户成功');
            resolve();
        });
    });
};
//注册用户
exports.registerUser = (username, password, subject, role, name, token, email) => {
    let user = new User({
        username,
        password,
        subject,
        role,
        name,
        token,
        email
    });
    return new Promise((resolve, reject) => {
        user.save((err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};
// 修改用户信息
exports.updateUser = (id, username, subject, role, name, email) => {
    return new Promise((resolve, reject) => {
        User.update({
            _id: id
        }, {
            $set: {
                username,
                subject,
                role,
                name,
                email
            }
        }, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
}
// 重置密码
// 修改用户信息
exports.resetPass = (id, password) => {
    return new Promise((resolve, reject) => {
        User.update({
            _id: id
        }, {
            $set: {
                password
            }
        }, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
}