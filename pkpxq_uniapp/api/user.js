import {
	request, uploadPath
} from '../utils/request.js'
export const _userInfo = (data) => {
	return request({
		url: '/user/info',
		method: 'POST',
		data
	})
}
export const _getUsertList = (data)=>{
	return request({
		url: '/user/list',
		method: 'GET',
		data
	})
}
export const _userInfoById = (data) => {
	return request({
		url: '/user/infoById',
		method: 'POST',
		data
	})
}

export const _updateInfo = (data) => {
	return request({
		url: '/user/update',
		method: 'POST',
		data
	})
}
export const _follow = (data) => {
	return request({
		url: '/user/follow',
		method: 'POST',
		data
	})
}

export const _getPhone = (data) =>{
	return request({
		url:'/user/getPhone',
		method:'POST',
		data
	})
}

export const _getPhoneNumber = (data)=>{
	return request({
		url:'/wx/getPhoneNumber',
		method:'POST',
		data
	})
}

export const _getFollowList = (data)=>{
	return request({
		url:'/user/list/follow',
		method:'GET',
		data
	})
}

export const _getFansList = (data)=>{
	return request({
		url:'/user/list/fans',
		method:'GET',
		data
	})
}

export const _updateAvatar = (filePath)=>{
	return uploadPath({
		url:'/user/avatar',
		method:'post',
		name:'avatar',
		filePath
	})
}