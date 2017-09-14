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
    getAssistantList: `${APIV3}/api/getAssistantList`,
    FindReportListById:`${APIV3}/api/FindReportListById`
  },
}
