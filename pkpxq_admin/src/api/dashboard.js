import request from '@/utils/request'

// 查询数据
export function listDashboard(query) {
  return request({
    url: '/dashboard/list',
    method: 'get',
    params: query
  })
}
// 根据key查询echarts数据
export function getDashboard(key){
  return request({
    url: '/dashboard/'+key,
    method: 'get'
  })
}
