import {
	baseUrl
} from './config.js'
import pinia from '@/stores'
import {
	useUserStore
} from '@/stores/user.js'
const store = useUserStore(pinia)

export function logout() {
	uni.removeStorageSync('token')
}
// 小程序登录 
export function login(data) {
	let header = {
		'Content-type': 'application/json;charset=utf-8'
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + '/user/wxLogin',
			data,
			header,
			method: 'POST',
			success(res) {
				try {
					if (res.data.code === 200) {
						store.setBan(false)
						resolve(res.data)
					} else if (res.data.code === 403) {
						store.setBan(true) // 处理用户被解决访问的逻辑
						logout()
						reject(res)
					} else {
						logout()
						reject(res)
					}
				} catch (e) {
					reject(e)
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

function checkTempTokenList(url) {
	const tempTokenList = ['/upload', '/user/update']
	return tempTokenList.some(item => url.indexOf(item) >= 0)
}

export function request(config) {
	let {
		url = '',
			method = 'GET',
			data = {},
			header = {},
			callback
	} = config
	header['Content-type'] = 'application/json;charset=utf-8'

	let token = uni.getStorageSync('token') || ''
	// 过滤指定请求排除token
	if (url.indexOf("/user/wxLogin") < 0) {
		header['Authorization'] = token
	}
	if (!token && checkTempTokenList(url)) {
		header['Authorization'] = store.tempToken
	}

	if (store.isBan) {
		uni.reLaunch({
			url: '/pages/error/error?text=你已被封禁，请联系管理员'
		})
		return Promise.reject('被封禁')
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			data,
			header,
			method,
			success(res) {
				if (callback) {
					return callback(res.data)
				}
				if (res.data.code === 401) {
					// 需要刷新token
					if (token && token !== '') {
						logout()
					}
					getNewToken().then(res => {
						// 获取token 并重新网络请求
						config.callback = resolve
						request(config)
					}).catch(e => {
						uni.showToast({
							title: '请先注册',
							icon: 'none'
						})
						reject('需要注册')
						uni.redirectTo({
							url: '/pages/login/login'
						})
					})
				} else if (res.data.code === 200) {
					// token有效返回
					resolve(res.data)
				} else {
					uni.showToast({
						title: res.data.msg || '你的请求被拒绝了',
						icon: 'none'
					})
					reject(res)
				}
			},
			fail(err) {
				uni.showToast({
					title: '请求失败',
					icon: 'none'
				})
			}
		})
	})
}
export function getCode() {
	return new Promise((resolve, reject) => {
		uni.login({
			async success(res) {
				resolve(res.code)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
export function getNewToken() {
	return new Promise(async (resolve, reject) => {
		try {
			let code = await getCode()
			let loginRes = await login({
				code
			})
			if (loginRes.data.token) {
				store.login(loginRes.data)
			}
			resolve(loginRes)
		} catch (e) {
			// 未注册，给予临时token，用于处理部分请求
			if (e.data.data.tempToken) {
				store.tempToken = e.data.data.tempToken
			}
			reject(e.data.msg)
		}
	})
}


export function uploadPath(config) {
	let {
		url,
		method = 'POST',
		header = {
			'content-type': 'multipart/form-data'
		},
		filePath,
		callback,
		name = 'file'
	} = config

	let token = uni.getStorageSync('token') || ''
	// 过滤指定请求排除token
	if (url.indexOf("/user/wxLogin") < 0) {
		header['Authorization'] = token
	}
	if (!token && checkTempTokenList(url)) {
		header['Authorization'] = store.tempToken
	}
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			//图片上传地址
			url: baseUrl + url,
			filePath,
			name,
			header,
			success: (res) => {
				res.data = JSON.parse(res.data)
				// 判断是否有回调
				if (callback) {
					return callback(res.data)
				}
				if (res.statusCode === 401 || res.data.code === 401) {
					// 需要刷新token
					if (token && token !== '') {
						logout()
					}
					getNewToken().then(res => {
						// 获取token 并重新网络请求
						config.callback = resolve
						uploadPath(config)
					})
				} else if (res.statusCode === 200 && res.data.code === 200) {
					// token有效返回
					resolve(res.data)
				} else {
					reject(res)
				}
			},
			fail(err) {
				reject(err)
			}
		});
	})
}