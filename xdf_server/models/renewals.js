var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//声明用户schema
const RenewalsSchema = new Schema({
    district: {
        type: String
    }, // 校区
    subject: {
        type: String
    }, // 科目
    leftdirector: {
        type: String
    }, // 助理主管
    teacher: {
        type: String
    }, // 老师姓名
    student: {
        type: String
    }, // 学生姓名
    renew: {
        type: String
    }, // 是否续费
    measures: {
        type: String
    }, //未续费不就措施
    update_at: {
        type: Date,
        default: Date.now
    }
});
RenewalsSchema.pre('save', function (next) {
    var now = new Date();
    this.update_at = now;
    next();
});

module.exports = {
    Renewals: mongoose.model('Renewals', RenewalsSchema)
};