/* global window */
import modelExtend from 'dva-model-extend'
import { AssistantList } from 'services/datareport'
import { GetSubject } from 'services/user'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'datareport',
  state: {
    modalType: 'create',
    subject:[],
    condition:{}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({type:'querySubject'});
      history.listen((location) => {
        if (location.pathname === '/datareport') {
          const payload = location.query || { page: 1, pageSize: 30 }
          console.log()
          dispatch({
            type: 'reportlist',
            payload,
          });
          
        }
      })
    },
  },

  effects: {
    * reportlist ( {payload={} }, { put, call, select }) {
      const condition = yield select(({ datareport }) => datareport.condition);
      const data = yield call(AssistantList, {page: 1, pageSize: 30,...payload,...condition});
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
