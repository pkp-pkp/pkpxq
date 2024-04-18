import {request} from '../utils/request.js'

export const _getAppHome = (data)=>{
	return request({
		url:'/app/home',
		method:'GET',
		data
	})
}