import { routerRedux } from 'dva/router'
import { login } from 'services/login'

export default {
  namespace: 'createreport',

  state: {
    imgpath:[],
    filepath:[]
  },

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      const data = yield call(login, payload)
      if (data.success) {
      } else {
        throw data
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/createreport') {
        //   const payload = location.query || { page: 1, pageSize: 30 }
        //   dispatch({
        //     type: 'reportlist',
        //     payload,
        //   });
        //   dispatch({type:'querySubject'});
        }
      })
    },
  },
  reducers: {
    Change (state, action) {
      return { ...state, ...action.payload }
    }
  }
}
