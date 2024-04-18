import {
	request
} from '../utils/request.js'

export const _avatarFile = async (data)=>{
	return request({
		url:'/controller/avatarFile',
		method:'POST',
		data
	})
}

export const _getUploadDir = async (data)=>{
	return request({
		url:'/controller/getUploadDir',
		method:'POST',
		data
	})
}
export const _delFile = async (data)=>{
	return request({
		url:'/controller/delUploadFile',
		method:'POST',
		data
	})
}