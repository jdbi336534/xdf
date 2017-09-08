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
//分页获取助理主管提交的数据
exports.findAssistantList = (page, size) => {
    return new Promise((resolve, reject) => {
        Director.count({}, (err, count) => {
            if (err) {
                reject(err);
            }
            Director.find({}, null, {
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
exports.registerUser = (username, password, subject, role, name, token) => {
    let user = new User({
        username,
        password,
        subject,
        role,
        name,
        token
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