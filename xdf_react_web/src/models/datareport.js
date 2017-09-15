/* global window */
import modelExtend from 'dva-model-extend'
import { AssistantList } from 'services/datareport'
import { GetSubject } from 'services/user'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'datareport',
  state: {
    modalType: 'create',
    subject:[]
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/datareport') {
          const payload = location.query || { page: 1, pageSize: 30 }
          dispatch({
            type: 'reportlist',
            payload,
          });
          dispatch({type:'querySubject'});
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
    }
  },

  reducers: {
    Change (state, action) {
      return { ...state, ...action.payload }
    }
  }
})
