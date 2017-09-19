import { routerRedux } from 'dva/router'
import { directiveSave } from 'services/createreport'

export default {
  namespace: 'createreport',

  state: {
    imgpath:[],
    filepath:[],
    report:false,
    visibleSave:false
  },

  effects: {
    * commit ({
      payload,
    }, { put, call, select }) {
      const imgpath = yield select(({ createreport }) => createreport.imgpath);
      const filepath = yield select(({ createreport }) => createreport.filepath);
      const data = yield call(directiveSave, {...payload,imgpath,filepath});
      if (data.success) {
        yield put({type:'showModal'});
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
    },
    showModal (state) {
      return { ...state, visibleSave: true }
    },
    hideModal (state) {
      return { ...state, visibleSave: false }
    }
  }
}
