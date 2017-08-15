var Director = require('../../models/director').Director;
// 保存主管提交的信息
exports.newAndSave = (prescheduling, carryover, Q1prescheduling, Q1carryover, takesteps, prespeed, speed, reason, takemeasures, firstfive, lastfive, others, isresearch, notresearchreason, filepath, imgpath, username) => {
    var director = new Director();
    director.prescheduling = prescheduling; // 本月预排
    director.carryover = carryover; // 本月结转
    director.Q1prescheduling = Q1prescheduling; // Q1预排
    director.Q1carryover = Q1carryover; // Q1结转
    director.takesteps = takesteps; // 采取措施和情况
    director.prespeed = prespeed; // 预排速度
    director.speed = speed; // 结转速度
    director.reason = reason; // 结转原因
    director.takemeasures = takemeasures; // 结转采取措施
    director.firstfive = firstfive; // 前五名
    director.lastfive = lastfive; // 后五名
    director.others = others; // 其他职能工作情况
    director.isresearch = isresearch; // 后五名
    director.notresearchreason = notresearchreason; // 其他职能工作情况
    director.filepath = filepath; // filepath
    director.imgpath = imgpath; // 其他职能工作情况
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