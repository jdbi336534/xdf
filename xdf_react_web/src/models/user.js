/* global window */
import modelExtend from 'dva-model-extend'
import { UserList } from 'services/user'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'user',
  state: {
    currentItem: {},
    modalType: 'create',
    modalVisible: false,
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
    * update ({ payload }, { select, call, put}) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    }
  },

  reducers: {
    Change (state, action) {
      return { ...state, ...action.payload }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    }
  }
})
