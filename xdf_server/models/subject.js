var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//学科组
const subjectSchema = new Schema({
    subject: {
        type: String,
        default: ''
    }
});

module.exports = {
    Subject: mongoose.model('Subject', subjectSchema)
};