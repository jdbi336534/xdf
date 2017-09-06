var Renewals = require('../../models/renewals').Renewals;
// 保存excel导入的数据
// exports.newAndSave = (district, subject, leftdirector, teacher, student, renew, measures) => {
//     var renewals = new Renewals();
//     renewals.district = district;
//     renewals.subject = subject;
//     renewals.leftdirector = leftdirector;
//     renewals.teacher = teacher;
//     renewals.student = student;
//     renewals.renew = renew;
//     renewals.measures = measures;
//     return new Promise((resolve, reject) => {
//         renewals.save((err, doc) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(doc);
//         });
//     });
// };

exports.newAndSave = (username, name, renew) => {
    var renewals = new Renewals();
    if (username) {
        renewals.username = decodeURI(username);
    }
    if (name) {
        renewals.name = decodeURI(name);
    }
    renewals.renew = renew;
    return new Promise((resolve, reject) => {
        renewals.save((err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};
// exports.insertCollection = (arrdata) => {
//     return new Promise((resolve, reject) => {
//         Renewals.collection.insert(arrdata, (err, doc) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(doc);
//         });
//     });
// }
// 查询本月是否保存过
exports.isSave = (username, start, end) => {
    return new Promise((resolve, reject) => {
        Renewals.find({
            username,
            'create_time': {
                '$gt': start,
                '$lt': end
            }
        }, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};