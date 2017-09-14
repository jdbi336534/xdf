/* global window */
import modelExtend from 'dva-model-extend'
import { AssistantList } from 'services/datareport'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'datareport',
  state: {
    modalType: 'create',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/datareport') {
          const payload = location.query || { page: 1, pageSize: 30 }
          dispatch({
            type: 'reportlist',
            payload,
          })
        }
      })
    },
  },

  effects: {
    * reportlist ( {payload={} }, { put, call, select }) {
        const data = yield call(AssistantList, payload);
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
