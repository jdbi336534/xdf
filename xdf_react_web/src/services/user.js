import { request, config } from 'utils'

const { api } = config
const { getUserList } = api

export async function UserList (data) {
  return request({
    url: getUserList,
    method: 'post',
    data,
  })
}