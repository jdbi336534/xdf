import { request, config } from 'utils'

const { api } = config
const { getUserList,register,updateUserinfo,delUser,subject,resetPass } = api

export async function UserList (data) {
  return request({
    url: getUserList,
    method: 'post',
    data,
  })
}
export async function UserRegister (data) {
  return request({
    url: register,
    method: 'post',
    data,
  })
}
export async function UserUpdate (data) {
  return request({
    url: updateUserinfo,
    method: 'post',
    data,
  })
}
export async function UserDelete (data) {
  return request({
    url: delUser,
    method: 'post',
    data,
  })
}
export async function RestPassword (data) {
  return request({
    url: resetPass,
    method: 'post',
    data,
  })
}

export async function GetSubject (data) {
  return request({
    url: subject,
    method: 'get',
    data,
  })
}