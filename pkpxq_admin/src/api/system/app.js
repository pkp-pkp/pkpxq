import request from '@/utils/request'

// 查询页面配置
export function _getAppList() {
  return request({
    url: '/app/list',
    method: 'get'
  })
}
export function _updateApp(data) {
  return request({
    url: '/app',
    method: 'put',
    data
  })
}
