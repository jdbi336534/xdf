// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './store/'
import router from './router'
import VueCookie from 'vue-cookie'
// import ECharts from 'vue-echarts/components/ECharts.vue'
import iView from 'iview';
import { Button } from 'element-ui';
import 'iview/dist/styles/iview.css';    // 使用 CSS
Vue.config.productionTip = false
Vue.use(iView);
Vue.use(Vuex);
Vue.use(VueCookie);
Vue.use(Button)
// Vue.component('chart', ECharts)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})
