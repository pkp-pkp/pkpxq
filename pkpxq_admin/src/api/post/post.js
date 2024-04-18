import request from '@/utils/request'

export function listPost(query) {
  return request({
    url: '/post/list',
    method: 'get',
    params: query
  })
}

export function getPost(postId) {
  return request({
    url: '/post/' + postId,
    method: 'get'
  })
}
export function changePostStatus(postId, status) {
  return request({
    url: '/post/changeStatus',
    method: 'put',
    data: {postId, status}
  })
}

export function delPost(postId) {
  return request({
    url: '/post/' + postId,
    method: 'delete'
  })
}
