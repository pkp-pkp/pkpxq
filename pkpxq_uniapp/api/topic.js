import {request} from '../utils/request.js'

export const _getTopicInfo = (id)=>{
	return request({
		url:'/topic/'+id,
		method:'GET'
	})
}
export const _addTop = (data)=>{
	return request({
		url:'/topic/top',
		method:'POST',
		data
	})
}
export const _deleteTop = (topic_id,postId)=>{
	return request({
		url:`/topic/top/${topic_id}/${postId}`,
		method:'DELETE'
	})
}
