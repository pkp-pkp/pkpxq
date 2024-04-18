import request from '@/utils/request'
import {getToken} from "@/utils/auth";

// 查询数据
export function _upload(formData){
  return request({
    url: '/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      // token
      'Authorization': getToken()
    },
    data:formData
  })
}
