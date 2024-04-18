<template>
	<view class="">
		<button open-type="getPhoneNumber" @getphonenumber="getPhone">获取手机号</button>
	</view>
</template>

<script setup>
	import {_getPhoneNumber} from '@/api/wx.js'
	// 获取手机号
	const getPhone =async (e) =>{
		const {encryptedData,iv} = e.detail
		const {code} = await wx.login()
		const res = await _getPhoneNumber({encryptedData,iv,code})
	}
</script>

<style lang="scss">
	button{
		display: inline-block;
		width: 300rpx;
		font-size: 26rpx;
	}
</style>