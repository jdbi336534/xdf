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
// 四折标课excel文件上传
router.post('/course',Upload.single('file'), UserController.Upload);

// 教研文件图片上传
router.post('/researchfile',Upload.single('file'), UserController.Fileupload);
// 四折标课数据保存
router.post('/coursesave',UploadController.Upload);
// 主管提交信保存
router.post('/directorsave', DirectorController.Save);
// 按日期条件查询主管提交的数据
router.post('/getbydate',DirectorController.FindByDate);
// 分页查询助理主管汇报列表(已经按照时间排序)
router.post('/getAssistantList',DirectorController.getAssistantList);

//需要先检查权限的路由
router.get('/user', checkToken, UserController.GetAllUsers);
router.post('/delUser', checkToken, UserController.DelUser);

module.exports = router
