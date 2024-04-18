import {
	request
} from '../utils/request.js'

export const _getPostList = (data)=>{
	return request({
		url: '/post/list',
		method: 'GET',
		data
	})
}

export const _postAdd = (data)=>{
	return request({
		url: '/post/add',
		method: 'POST',
		data
	})
}
export const _postUpd = (data)=>{
	return request({
		url: '/post/upd',
		method: 'POST',
		data
	})
}
export const _postDel = (data)=>{
	return request({
		url: '/post/del',
		method: 'POST',
		data
	})
}

export const _postUpdGet = (data)=>{
	return request({
		url: '/post/upd/get',
		method: 'GET',
		data
	})
}

export const _getPostDetail = (data)=>{
	return request({
		url: '/post/detail',
		method: 'GET',
		data
	})
}

export const _getPostCategory = (data)=>{
	return request({
		url: '/post/category',
		method: 'GET',
		data
	})
}

export const _getPostComment = (data)=>{
	return request({
		url: '/post/comment',
		method: 'GET',
		data
	})
}

export const _getThumbList = (data)=>{
	return request({
		url: '/post/thumb',
		method: 'GET',
		data
	})
}
export const _thumbAdd = (data)=>{
	return request({
		url: '/post/thumb/add',
		method: 'POST',
		data
	})
}

export const _commentThumb = (data)=>{
	return request({
		url: '/post/comment/thumb',
		method: 'POST',
		data
	})
}

export const _commentAdd = (data)=>{
	return request({
		url: '/post/comment/add',
		method: 'POST',
		data
	})
}
export const _commentDel = (data)=>{
	return request({
		url: '/post/comment/del',
		method: 'POST',
		data
	})
}

export const _getFavourList = (data)=>{
	return request({
		url:'/post/favour',
		method:'GET',
		data
	})
}
export const _favourAdd = (data)=>{
	return request({
		url:'/post/favour/add',
		method:'POST',
		data
	})
}
export const _search = (data)=>{
	return request({
		url:'/post/search',
		method:'GET',
		data
	})
}
export const _tagList = (data)=>{
	return request({
		url:'/post/tag/list',
		method:'GET',
		data
	})
}