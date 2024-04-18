import {request} from '../utils/request.js'

export const _getPhoneNumber = (data)=>{
	return request({
		url:'/wx/getPhoneNumber',
		method:'POST',
		data
	})
}