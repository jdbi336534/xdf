var User = require('../../models/user').User;
//数据库的操作
//根据用户名查找用户
exports.findUser = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({ username }, (err, doc) => {
            if(err){
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
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};
//删除某个用户
exports.delUser = function(id){
    return new Promise(( resolve, reject) => {
        User.findOneAndRemove({ _id: id }, err => {
            if(err){
                reject(err);
            }
            console.log('删除用户成功');
            resolve();
        });
    });
};