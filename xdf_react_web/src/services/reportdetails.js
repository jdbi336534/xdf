
import { request, config } from 'utils'

const { api } = config
const { FindReportListById } = api

export async function query (params) {
  return request({
    url: FindReportListById,
    method: 'get',
    data: params,
  })
}