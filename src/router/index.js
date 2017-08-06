import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        meta: {
            title: ''
        },
        redirect: 'login'
    }, {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['@/components/login/login.vue'], resolve)
    }, {
        path: '/director',
        name: 'director',
        meta: {
            title: '录入'
        },
        component: (resolve) => require(['@/components/director/director.vue'], resolve)
    }]
});
