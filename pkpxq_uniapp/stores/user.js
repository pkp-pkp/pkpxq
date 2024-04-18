import {
	defineStore
} from 'pinia'
import {
	_userInfo
} from '@/api/user.js'
import { _getTopicInfo } from '../api/topic'
export const useUserStore = defineStore('user', {
	state: () => {
		return {
			token: uni.getStorageSync('token'),
			userInfo: uni.getStorageSync('userInfo'),
			isBan: false,
			topic_info:{},
			tempToken:null
		}
	},
	getters: {
		isLogin: (state) => {
			let {
				nickname,
				avatar
			} = state.userInfo
			return !!nickname && !!avatar
		},
		isTopicAdmin:(state)=>{
			return state.topic_info.userId===state.userInfo.id
		}
	},
	actions: {
		async getUserInfo() {
			if(!this.token) return
			const res = await _userInfo()
			if (res.code == 200) {
				this.userInfo = res.data
			} else {
				this.logout()
			}
		},
		async getTopicInfo(){
			const res = await _getTopicInfo(1)
			this.topic_info = res.data
		},
		login(v) {
			let {
				userInfo,
				token
			} = v
			this.userInfo = userInfo
			this.token = token
			uni.setStorageSync('userInfo', userInfo)
			uni.setStorageSync('token', token)
		},
		logout() {
			this.$reset()
			uni.removeStorageSync('userInfo')
			uni.removeStorageSync('token')
		},
		setBan(v) {
			this.isBan = v
			if (v) {
				uni.reLaunch({
					url: '/pages/error/error?text=你已被封禁，请联系管理员'
				})
			}
		}
	}
})