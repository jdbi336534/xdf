const router = require('koa-router')();
const SubjectController = require('../controller/subject');
router.prefix('/api');

router.get('/subject', SubjectController.GetAllSubject);
router.get('/getSubjectById', SubjectController.SubjectFindById);


module.exports = router