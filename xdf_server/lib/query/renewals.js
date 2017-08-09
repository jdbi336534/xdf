var Renewals = require('../../models/renewals').Renewals;
// 保存excel导入的数据
exports.newAndSave = (district, subject, leftdirector, teacher, student, renew, measures) => {
    var renewals = new Renewals();
    renewals.district = district;
    renewals.subject = subject;
    renewals.leftdirector = leftdirector;
    renewals.teacher = teacher;
    renewals.student = student;
    renewals.renew = renew;
    renewals.measures = measures;
    return new Promise((resolve, reject) => {
        renewals.save((err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};

exports.insertCollection = (arrdata, callback) => {
    Renewals.collection.insert(arrdata, callback);
}