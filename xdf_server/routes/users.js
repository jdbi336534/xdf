const router = require('koa-router')();
const UserController = require('../controller/users');
const UploadController = require('../controller/userupload');
const DirectorController = require('../controller/director');
// 上传中间件的配置
const Upload = require('../controller/upload');
//checkToken作为中间件存在
const checkToken = require('../lib/token/checkToken.js');
router.prefix('/api');

router.post('/login', UserController.Login);
router.post('/register', UserController.Reg);
// 测试
router.get('/users',UploadController.Upload);
// 文件上传
router.post('/upload',Upload.single('file'), UserController.Upload);
// 主管提交信保存
router.post('/directorsave', DirectorController.Save);

//需要先检查权限的路由
router.get('/user', checkToken, UserController.GetAllUsers);
router.post('/delUser', checkToken, UserController.DelUser);

module.exports = router
