const mongoose = require('mongoose');
const mongodburl = require('../config').mongodb.url;
mongoose.connect(mongodburl, {
    useMongoClient: true
});

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', function () {
    console.log('mongodb数据库连接出错！');
});
db.on('open', function () {
    console.log('mongodb数据库连接成功！');
});

//声明用户schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    token: {
        type: String,
        default: ''
    },
    subject: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    role: {
        type: Number,
        default: 0
    },
    create_time: {
        type: Date,
        default: Date.now
    }
});
//根据schema生成model
const model = {
    User: mongoose.model('User', userSchema)
};

module.exports = model;