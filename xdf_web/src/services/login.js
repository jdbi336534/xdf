import request from '../utils/request';
import qs from 'qs';
const postparams = {
  credentials: 'include',
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};
const getparams = {
  credentials: 'include'
}
const prefix = '/node';
// 登陆
export async function login(params) {
  return request(`${prefix}/api/login`, {
    ...postparams,
    body: qs.stringify(params)
  });
}
// 登陆
// export async function login(params) {
//   return request(`${prefix}/api/login`, {
//     credentials: 'include',
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: qs.stringify(params)
//   });
// }

// get获取地域表数据
export async function getuser(params) {
  return request(`${prefix}/api/user`, getparams);
}
