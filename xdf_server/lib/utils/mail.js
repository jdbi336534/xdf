const nodemailer = require('nodemailer');
const mailconfig = require('../../config').nodemailer;
exports.sendmail = (address,username,name,password) => {
    return new Promise((resolve, reject) => {
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                reject(err);
            }
            let transporter = nodemailer.createTransport(mailconfig);
            // setup email data with unicode symbols
            let mailOptions = {
                from: '"朱海亮 👻" <zhuhl@r7data.top>', // sender address
                to: 'jiangdb@r7data.com', // list of receivers
                subject: '用户密码重置成功✔', // Subject line
                // text: 'Hello world?', // plain text body
                html: '<b>尊敬的用户'+name+'您好，你的账号<span style="color:blue;font-weight:500;">username</span>密码已被重置，重置结果如下:</b></br>'+
                '<p><span>密码：'+password+'<span></p>'+
                '<b style="color:red;">记住，打死也不要告诉他人。</b>'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                }
                resolve(info);
                transporter.close();
            });
        });
    });

}