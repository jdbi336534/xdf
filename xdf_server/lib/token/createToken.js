const jwt = require('jsonwebtoken');
/**
 * user_id为传入的值，'sinner77'为解密秘钥
 */
//登录时：核对用户名和密码成功后，应用将用户的id（图中的user_id）作为JWT Payload的一个属性
module.exports = function(user_id){
    const token = jwt.sign({
        user_id: user_id
    }, 'sinner77', {
        expiresIn: '86400s' //过期时间设置为24h。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
    });
    return token;
};
