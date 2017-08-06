import request from '../utils/request';
import qs from 'qs';

// 精简预报三天
export async function briefforecast3days(params) {
  return request('http://aliv2.data.moji.com/whapi/json/aliweather/briefforecast3days', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'APPCODE f838a318042845739f20f709ace1d772'
    },
    body: qs.stringify(params)
  });
}
// 精简实况
export async function briefcondition(params) {
  return request('http://aliv2.data.moji.com/whapi/json/aliweather/briefcondition', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'APPCODE f838a318042845739f20f709ace1d772'
    },
    body: qs.stringify(params)
  });
}
// 精简AQI
export async function briefaqi(params) {
  return request('http://aliv2.data.moji.com/whapi/json/aliweather/briefaqi', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'APPCODE f838a318042845739f20f709ace1d772'
    },
    body: qs.stringify(params)
  });
}
// 获取地域表数据
export async function area(params) {
  return request('static/area.json');
}
