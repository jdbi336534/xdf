/* global window */
import modelExtend from 'dva-model-extend'
import { UserList } from 'services/user'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'user',
  state: {
    modalType: 'create',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/user') {
          const payload = location.query || { page: 1, pageSize: 30 }
          dispatch({
            type: 'query',
            payload,
          })
          
        }
      })
    },
  },

  effects: {
    * query ( {payload={} }, { put, call, select }) {
        const data = yield call(UserList, payload);
        if (data.success) {
          yield put({
            type:'querySuccess',
            payload:{
              list:data.data,
              pagination:{
                current:Number(payload.page) || 1,
                pageSize:Number(payload.pageSize) || 30,
                total:data.total
              }
            }
          })
        } else {
          throw data
        }
    },
  },

  reducers: {
    Change (state, action) {
      return { ...state, ...action.payload }
    }
  }
})
