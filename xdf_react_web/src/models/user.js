/* global window */
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { UserList,UserRegister,UserUpdate,UserDelete,GetSubject,RestPassword } from 'services/user'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'user',
  state: {
    currentItem: {},
    modalType: 'create',
    modalVisible: false,
    visibleSure:false,
    subject:[],
    condition:{}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({type:'querySubject'});
      history.listen((location) => {
        if (location.pathname === '/user') {
          const payload = location.query || { page: 1, pageSize: 30 }
          dispatch({
            type: 'query',
            payload,
          });
        }
      })
    },
  },

  effects: {
    * query ( {payload={} }, { put, call, select }) {
      const condition = yield select(({ user }) => user.condition);
      const data = yield call(UserList, {page: 1, pageSize: 30,...payload,...condition});
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
    * querySubject ( {}, { put, call, select }) {
      const subject = yield call(GetSubject);
      if(subject.success){
        yield put({
          type:'Change',
          payload:{
            subject:subject.data
          }
        });
      }else{
        throw subject
      }
    },
    * update ({ payload }, { select, call, put}) {
      const id = yield select(({ user }) => user.currentItem._id)
      const newUser = { ...payload, id }
      const data = yield call(UserUpdate, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    * create ({ payload }, { call, put }) {
      const data = yield call(UserRegister, payload)
      if (data.success) {
        if(data.code!==200){
          throw new Error(data.msg);
        }
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    * delete ({ payload }, { call, put, select }) {
      const id = yield select(({ user }) => user.currentItem._id)
      const data = yield call(UserDelete, {id})
      if (data.success) {
        yield put({
          type:'Change',
          payload:{
            visibleSure:false
          }
        });
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    * reset ({ payload }, { call, put, select }) {
      const id = yield select(({ user }) => user.currentItem._id)
      const name = yield select(({ user }) => user.currentItem.name)
      const username = yield select(({ user }) => user.currentItem.username)
      const email = yield select(({ user }) => user.currentItem.email)
      const newUser = { id,name,username,email }
      const data = yield call(RestPassword, newUser)
      if (data.success) {
        if(data.code===200){
          message.success(data.msg);
          yield put({
            type:'Change',
            payload:{
              visibleSure:false
            }
          });
        }
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
