var Subject = require('../../models/subject').Subject;
//找到所有学科组
exports.findAllSubject = () => {
    return new Promise((resolve, reject) => {
        Subject.find({}, (err, doc) => {
            console.log(err,doc)
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};
// 通过_id查询某一调数据
exports.findOneById = (id) => {
    return new Promise((resolve, reject) => {
        Subject.findById(id, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
}