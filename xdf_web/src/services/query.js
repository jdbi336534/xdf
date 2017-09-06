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
// 注册
export async function register(params) {
  return request(`${prefix}/api/register`, {
    ...postparams,
    body: qs.stringify(params)
  });
}
// 提交汇报统计表
export async function directorsave(params) {
  return request(`${prefix}/api/directorsave`, {
    ...postparams,
    body: qs.stringify(params)
  });
}
// 保存四折标课
export async function coursesave(params) {
  return request(`${prefix}/api/coursesave`, {
    ...postparams,
    body: qs.stringify(params)
  });
}
// 基础汇报
export async function basicinfo(params) {
  return request(`${prefix}/api/basicinfo`, {
    ...postparams,
    body: qs.stringify(params)
  });
}
// get获取地域表数据
export async function getuser(params) {
  return request(`${prefix}/api/user`, getparams);
}
// 助理主管提交报告列表查询
export async function getAssistantList(params) {
  return request(`${prefix}/api/getAssistantList`, {
    ...postparams,
    body: qs.stringify(params)
  });
}
