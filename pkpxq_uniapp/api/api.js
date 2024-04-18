import {request,uploadPath} from '../utils/request.js'

export const _uploadPath = (filePath,type)=>{
	return uploadPath({
		url:'/upload?type='+type,
		filePath
	})
}
export const _uploadDel = (data)=>{
	return request({
		url:'/upload/del',
		method:'POST',
		data
	})
}
