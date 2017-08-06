import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    // ip: 'http://172.16.1.34:8011',
    ip: '/api',
    userInfo: {},
    disable: 1, // 是否要失去焦点验证
    is_show_data_edit: false, // 是否显示新增数据源内容区
    data_add_edit: {} // 新增数据源容器
}

// getters
const getters = {

}

// actions

// mutations
const mutations = {
    [types.SET_IP](state, {
        id
    }) {

    },
    [types.USER_INFO](state, data) {
        state.userInfo = data;
    },
    [types.CHECK_FLAG](state, flag) {
        state.disable += 1;
    },
    [types.IS_SHOW_DATA_EDIT](state, flag) {
        state.is_show_data_edit = flag;
    },
    [types.DATA_ADD_EDIT](state, flag) {
        state.data_add_edit = flag;
    },
}

export default {
    state,
    getters,
    mutations
}
