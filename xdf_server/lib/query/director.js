var Director = require('../../models/director').Director;
// 保存主管提交的信息
exports.newAndSave = (prescheduling, carryover, Q1prescheduling, Q1carryover, takesteps, speed, reason, takemeasures, research, development, others, remarks, username) => {
    var director = new Director();
    director.prescheduling = prescheduling; // 本月预排
    director.carryover = carryover; // 本月结转
    director.Q1prescheduling = Q1prescheduling; // Q1预排
    director.Q1carryover = Q1carryover; // Q1结转
    director.takesteps = takesteps; // 采取措施和情况
    director.speed = speed; // 结转速度
    director.reason = reason; // 结转原因
    director.takemeasures = takemeasures; // 结转采取措施
    director.research = research; // 教研情况
    director.development = development; // 研发情况
    director.others = others; // 其他职能工作情况
    director.remarks = remarks; // 备注
    director.username = username;
    return new Promise((resolve, reject) => {
        director.save((err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
}