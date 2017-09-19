const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const APIV3 = '/node'

module.exports = {
  name: '数据统计系统',
  prefix: 'antdAdmin',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
    // jdb's
    getAssistantList: `${APIV3}/api/getAssistantList`,// 获取汇报列表
    FindReportListById:`${APIV3}/api/FindReportListById`,// 获取汇报列表详情
    getUserList:`${APIV3}/api/getUserList`,// 获取用户列表
    login:`${APIV3}/api/login`,// 登录
    register:`${APIV3}/api/register`,// 注册，新增用户
    updateUserinfo:`${APIV3}/api/updateUserinfo`,// 更新用户信息
    delUser:`${APIV3}/api/delUser`,// 删除用户
    subject:`${APIV3}/api/subject`,// 获取学科组
    resetPass:`${APIV3}/api/resetPassword`,// 获取学科组
    dirSave:`${APIV3}/api/directorsave`, // 助理主管提交汇报 
  },
}
