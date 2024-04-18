<template>
	<button @click="toLogin" v-if="!token">登录</button>
	<button @click="logout" v-else>退出登录</button>
	<button @click="getUserInfo">获取用户信息</button>
	<button open-type="getPhoneNumber" @getphonenumber="getPhone">获取手机号</button>
	<br />
	<view class="">
		<image class="avatar" :src="avatarUrl"></image>
		<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">修改头像</button>
		<input type="nickname" placeholder="请输入昵称" @change="onChooseName" />
		<button @click="saveInfo">保存</button>
	</view>
</template>

<script setup>
import { _userInfo, _updateInfo } from '@/api/user.js';
import { _uploadPath } from '@/api/api.js';
import { getNewToken } from '@/utils/request.js';
import { ref } from 'vue';
let token = ref(uni.getStorageSync('token'));
// 登录
const toLogin = async () => {
	const res = await getNewToken();
	token.value = uni.getStorageSync('token');
};
// 退出登录
const logout = () => {
	uni.removeStorageSync('token');
	token.value = '';
	console.log(token);
};

const getUserInfo = async () => {
	const data = await _userInfo();
	console.log(data);
};
const avatarUrl = ref('https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0');
const nickName = ref('');
const onChooseAvatar = async (e) => {
	const res = await _uploadPath(e.detail.avatarUrl,'avatar');
	avatarUrl.value = res.data.path;
};
const onChooseName = (e) => {
	nickName.value = e.detail.value;
};
const saveInfo = async () => {
	const { code, msg } = await _updateInfo({ avatar: avatarUrl.value, nickName: nickName.value });
	if (code === 200) {
		uni.showToast({
			title: msg
		});
	}
}
// 获取手机号码
const getPhone = (e) =>{
	console.log(e);
}
</script>

<style lang="scss" scoped>
image {
	width: 100rpx;
	height: 100rpx;
}
</style>
