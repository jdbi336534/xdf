const router = require('koa-router')();
const UserController = require('../controller/users');
//checkToken作为中间件存在
const checkToken = require('../lib/token/checkToken.js');
router.prefix('/api');

router.post('/login', UserController.Login);
router.post('/register', UserController.Reg);
// 测试
router.get('/users',function(ctx){
ctx.body="wo shi jiangdongbing";
});

//需要先检查权限的路由
router.get('/user', checkToken, UserController.GetAllUsers);
router.post('/delUser', checkToken, UserController.DelUser);

module.exports = router
