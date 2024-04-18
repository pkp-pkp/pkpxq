import request from '@/utils/request'

export function listCategory(query) {
  return request({
    url: '/category/list',
    method: 'get',
    params: query
  })
}
export function listCategoryExcludeChild(cateId){
  return request({
    url: '/category/exclude/'+cateId,
    method: 'get'
  })
}
export function getCategory(postId) {
  return request({
    url: '/category/' + postId,
    method: 'get'
  })
}
// 新增菜单
export function addCategory(data) {
  return request({
    url: '/category',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateCategory(data) {
  return request({
    url: '/category',
    method: 'put',
    data: data
  })
}

export function changeCategoryStatus(cateId, status) {
  return request({
    url: '/category/changeStatus',
    method: 'put',
    data: {cateId, status}
  })
}

export function delCategory(cateId) {
  return request({
    url: '/category/' + cateId,
    method: 'delete'
  })
}
