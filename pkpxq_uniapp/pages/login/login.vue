<template>
	<view>
		<uv-cell-group>
			<uv-cell title="社交头像" isLink>
				<template v-slot:value>
					<view>
						<button class="uv-reset-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
							<uv-image class="avatar" :src="form.avatar" shape="circle" width="55px" height="55px" mode="scaleToFill"></uv-image>
						</button>
					</view>
				</template>
			</uv-cell>
			<uv-cell title="用户昵称" isLink>
				<template v-slot:value>
					<view class="btn-input">
						<input v-model="form.nickname" class="nickname-input" type="nickname" placeholder="请输入昵称" @blur="onChangeNickName" />
					</view>
				</template>
			</uv-cell>
		</uv-cell-group>
		<view class="btn-login">
			<uv-button type="primary" text="授权手机号并登录" class="btn-login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></uv-button>
		</view>
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import { ref } from 'vue';
import { getCode } from '@/utils/request';
import { _getPhoneNumber, _updateInfo } from '@/api/user';
import { _uploadPath } from '@/api/api';
import { useUserStore } from '@/stores/user';
const store = useUserStore();
const nameRef = ref(null);
const form = ref({
	avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
	nickname: ''
});
let isCheckAvatar = false;

onLoad(async()=>{
	await store.getUserInfo()
	if(store.isLogin){
		uni.showToast({
			title:'请直接登录',
			icon:'error'
		})
		uni.redirectTo({
			url:'/pages/main/main?pageCur=myself'
		})
	}
})

const onChooseAvatar = (e) => {
	isCheckAvatar = true;
	form.value.avatar = e.detail.avatarUrl;
};
const onChangeNickName = async (e) => {
	form.value.nickname = e.detail.value;
};
const getPhoneNumber = async (e) => {
	let phone = '';
	if (e.errMsg != 'getPhoneNumber:ok') {
		uni.showToast({
			title:'请授权手机号登录哦',
			icon:'none'
		})
		return
	}
	// 手机号
	let code = await getCode();
	let { encryptedData, iv } = e;
	let res = await _getPhoneNumber({ encryptedData, iv, code });
	if (res.code === 200) {
		phone = res.data.phoneNumber;
	}
	// 逻辑
	let res_upload = await _uploadPath(form.value.avatar, 'avatar');
	form.value.avatar = res_upload.data.filePath;
	// 请求更新信息
	let res_update = await _updateInfo({
		...form.value,
		mobile: phone
	});
	if (res_update.code === 200) {
		store.login({ userInfo: res_update.data, token: store.token });
		uni.navigateBack();

		uni.showToast({
			title: '登录成功！' 
		});
	}
};
</script>

<style lang="scss" scoped>
.btn-input {
	text-align: right;
}
.btn-login {
	position: fixed;
	width: 100%;
	box-sizing: border-box;
	bottom: 60rpx;
	padding: 0 20rpx;
}
</style>
