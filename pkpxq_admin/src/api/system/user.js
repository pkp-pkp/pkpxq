import request from '@/utils/request'
import {parseStrEmpty} from "@/utils";

export const getRouters = () => {
  return request({
    url: '/admin/getRouters',
    method: 'get'
  })
}

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/admin/user/' + parseStrEmpty(userId),
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/admin/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/admin/user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: '/admin/user/' + userId,
    method: 'delete'
  })
}

// 用户密码重置
export function resetUserPwd(id, password) {

  return request({
    url: '/admin/user/resetPwd',
    method: 'put',
    data: {id, password}
  })
}


// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/admin/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/admin/profile',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  return request({
    url: '/admin/profile/updatePwd',
    method: 'put',
    data: {oldPassword, newPassword}
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/admin/profile/avatar',
    method: 'post',
    data: data
  })
}
