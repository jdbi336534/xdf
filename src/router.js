const routers = [{
    path: '/',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
},{
    path: '/login',
    meta: {
        title: '登录'
    },
    component: (resolve) => require(['./views/login/login.vue'], resolve)
}];
export default routers;