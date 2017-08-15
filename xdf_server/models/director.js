var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
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
    prespeed: {
        type: String
    }, // 结转速度
    speed: {
        type: String
    }, // 结转速度
    reason: {
        type: String
    }, // 结转原因
    takemeasures: {
        type: String
    }, // 结转采取措施
    firstfive: {
        type: String
    }, // 结转前五名
    lastfive: {
        type: String
    }, // 结转后五名
    others: {
        type: String
    }, // 其他职能工作情况
    isresearch: {
        type: String
    }, // 是否进行教研
    notresearchreason: {
        type: String
    }, // 未教研原因
    filepath: {
        type: Array
    }, // 文件路径
    imgpath: {
        type: Array
    }, // 图片路径
    // remarks: {
    //     type: String
    // }, // 备注
    username: {
        type: String
    },
    update_at: {
        type: Date,
        default: Date.now
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