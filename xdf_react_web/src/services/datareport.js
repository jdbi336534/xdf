import { request, config } from 'utils'

const { api } = config
const { getAssistantList } = api

export async function AssistantList (data) {
  return request({
    url: getAssistantList,
    method: 'post',
    data,
  })
}
