import { request, config } from 'utils'

const { api } = config
const { dirSave } = api

export async function directiveSave (data) {
  return request({
    url: dirSave,
    method: 'post',
    data,
  })
}
