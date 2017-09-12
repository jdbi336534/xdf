const mongoose = require('mongoose');
const mongodburl = require('../config').mongodb.url;
mongoose.connect(mongodburl,{useMongoClient:true});

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', function(){
    console.log('mongodb数据库连接出错！');
});
db.on('open', function(){
    console.log('mongodb数据库连接成功！');
});

//声明用户schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    name: String,
    token: String,
    subject:String,
    role:Number,
    create_time: Date
});
//根据schema生成model
const model = {
    User: mongoose.model('User', userSchema)
};

module.exports = model;