var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
//声明用户schema
const DirectorSchema = new Schema({
    prescheduling: {
        type: Number,
        default: 0
    }, // 本月预排
    carryover: {
        type: Number,
        default: 0
    }, // 本月结转
    Q1prescheduling: {
        type: Number,
        default: 0
    }, // Q1预排
    Q1carryover: {
        type: Number,
        default: 0
    }, // Q1结转
    takesteps: {
        type: String,
        default: ''
    }, // 采取措施和情况
    prespeed: {
        type: String,
        default: ''
    }, // 结转速度
    speed: {
        type: String,
        default: ''
    }, // 结转速度
    reason: {
        type: String,
        default: ''
    }, // 结转原因
    takemeasures: {
        type: String,
        default: ''
    }, // 结转采取措施
    firstfive: {
        type: String,
        default: ''
    }, // 结转前五名
    lastfive: {
        type: String,
        default: ''
    }, // 结转后五名
    others: {
        type: String,
        default: ''
    }, // 其他职能工作情况
    isresearch: {
        type: String,
        default: ''
    }, // 是否进行教研
    notresearchreason: {
        type: String,
        default: ''
    }, // 未教研原因
    filepath: {
        type: Array,
        default: []
    }, // 文件路径
    imgpath: {
        type: Array,
        default: []
    }, // 图片路径
    researchexp: {
        type: String,
        default: ''
    }, // 已教研说明
    username: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    subject: {
        type: String,
        default: ''
    },
    create_time: {
        type: Date,
        default: Date.now
    }
});
//  {
//     versionKey: false // 不想数据库存储_v字段
// }
// DirectorSchema.pre('save', function (next) {
//     var now = new Date();
//     this.create_time = now;
//     next();
// });

module.exports = {
    Director: mongoose.model('Director', DirectorSchema)
};