import request from '@/utils/request'

// 查询下载记录列表
export function listUpload(query) {
  return request({
    url: '/upload/list',
    method: 'get',
    params: query
  })
}

// 查询下载记录详细
export function getUpload(id) {
  return request({
    url: '/upload/' + id,
    method: 'get'
  })
}
// 删除下载记录
export function delUpload(id) {
  return request({
    url: '/upload/' + id,
    method: 'delete'
  })
}
