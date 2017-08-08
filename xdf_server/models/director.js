var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
//声明用户schema
const DirectorSchema = new Schema({
    prescheduling: {
        type: Number
    }, // 本月预排
    carryover: {
        type: Number
    }, // 本月结转
    Q1prescheduling: {
        type: Number
    }, // Q1预排
    Q1carryover: {
        type: Number
    }, // Q1结转
    takesteps: {
        type: String
    }, // 采取措施和情况
    speed: {
        type: String
    }, // 结转速度
    reason: {
        type: String
    }, // 结转原因
    takemeasures: {
        type: String
    }, // 结转采取措施
    research: {
        type: String
    }, // 教研情况
    development: {
        type: String
    }, // 研发情况
    others: {
        type: String
    }, // 其他职能工作情况
    remarks: {
        type: String
    }, // 备注
    update_at: {
        type: Date,
        default: Date.now
    },
    username:{
        type:String 
    }
});
//  {
//     versionKey: false // 不想数据库存储_v字段
// }
DirectorSchema.pre('save', function (next) {
    var now = new Date();
    this.update_at = now;
    next();
});

module.exports = {
    Director: mongoose.model('Director', DirectorSchema)
};