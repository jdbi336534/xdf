var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//声明用户schema
const RenewalsSchema = new Schema({
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