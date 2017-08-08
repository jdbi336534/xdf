import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: 'login'
    }, {
        path: '/login',
        name: 'login',
        component: (resolve) => require(['@/components/login/login.vue'], resolve)
    }, {
        path: '/main',
        name: 'main',
        component: (resolve) => require(['@/components/main.vue'], resolve),
        children: [{
            path: '/director',
            name: 'director',
            component: (resolve) => require(['@/components/director/director.vue'], resolve)
        }]
    }]
});
