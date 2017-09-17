module.exports = {
    port:process.env.PORT || 3001,
    mongodb: {
        // url: 'mongodb://testuser:testpass@www.r7data.top:20000/admin'
        url: 'mongodb://localhost:20000/demo'
    },
    nodemailer:{
        host: 'smtp.mxhichina.com',
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'zhuhl@r7data.top', // generated ethereal user
            pass: 'Jdbi336534'  // generated ethereal password
        }
    }
}