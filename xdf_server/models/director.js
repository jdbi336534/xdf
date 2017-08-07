const mongoose = require('mongoose');
//声明用户schema
const directorSchema = new Schema({
          prescheduling:{type:String} , // 本月预排
          carryover:{type:String} , // 本月结转
          Q1prescheduling:{type:String} , // Q1预排
          Q1carryover:{type:String} , // Q1结转
          takesteps:{type:String} , // 采取措施和情况
          speed:{type:String} , // 结转速度
          reason: {type:String}, // 结转原因
          takemeasures: {type:String}, // 结转采取措施
          research: {type:String}, // 教研情况
          development:{type:String} , // 研发情况
          others:{type:String} , // 其他职能工作情况
          remarks:{type:String}  // 备注
});
    mongoose('');