import request from '@/utils/request'

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

export function changeUserStatus(userId, status) {
  return request({
    url: '/user/changeStatus',
    method: 'put',
    data: {userId, status}
  })
}

// 删除用户
export function delUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}
