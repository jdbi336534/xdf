var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//声明用户schema
const RenewalsSchema = new Schema({
    // district: {
    //     type: String,
    //     default:''
    // }, // 校区
    // subject: {
    //     type: String,
    //     default:''
    // }, // 科目
    // leftdirector: {
    //     type: String,
    //     default:''
    // }, // 助理主管
    // teacher: {
    //     type: String,
    //     default:''
    // }, // 老师姓名
    // student: {
    //     type: String,
    //     default:''
    // }, // 学生姓名
    // renew: {
    //     type: String,
    //     default:''
    // }, // 是否续费
    // measures: {
    //     type: String,
    //     default:''
    // }, //未续费不就措施
    username: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    renew: {
        type: Array,
        default: []
    },
    create_time: {
        type: Date,
        default: Date.now
    }
});
// RenewalsSchema.pre('save', function (next) {
//     var now = new Date();
//     this.update_at = now;
//     next();
// });

module.exports = {
    Renewals: mongoose.model('Renewals', RenewalsSchema)
};