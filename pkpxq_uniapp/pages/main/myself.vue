<template>
	<view>
		<uv-navbar title="我的" placeholder leftIcon=""></uv-navbar>
		<view class="head">
			<block v-if="store.isLogin">
				<view class="userinfo" @click="toNav('/pages/user/user')">
					<uv-avatar :customStyle="{ marginRight: '20rpx' }" :src="imgPath(userInfo.avatar)"></uv-avatar>
					<view class="username">
						<text>{{ userInfo.nickname }}</text>
					</view>
					<view class="arrow-right" @click.stop="toNav('/pages/user/edit')">
						<uv-icon name="arrow-right"></uv-icon>
					</view>
				</view>
			</block>
			<block v-else>
				<view class="btn-login">
					<uv-button plain type="primary" shape="circle" @click="toLogin">点我登录</uv-button>
				</view>
			</block>
			<uv-grid v-if="userInfo" :col="4" :border="false" style="margin: 20rpx 0" @click="toNav">
				<uv-grid-item :name="'/pages/user/fans?userId='+userInfo.id">
					<text>{{ userInfo.followerNum }}</text>
					<view class="grid-text">粉丝</view>
				</uv-grid-item>
				<uv-grid-item :name="'/pages/user/follow?userId='+userInfo.id">
					<text>{{ userInfo.followeeNum }}</text>
					<view class="grid-text">关注</view>
				</uv-grid-item>
				<uv-grid-item :name="'/pages/user/user?current=1&userId='+userInfo.id">
					<text>{{ userInfo.postNum }}</text>
					<view class="grid-text">帖子</view>
				</uv-grid-item>
				<uv-grid-item :name="'/pages/user/post_favour?userId='+userInfo.id">
					<text>{{ userInfo.favourNum }}</text>
					<view class="grid-text">收藏</view>
				</uv-grid-item>
			</uv-grid>
		</view>
		<!-- 服务中心 -->
		<view class="block-wrap">
			<view class="block-title">服务中心</view>
			<uv-grid :col="4" :border="false" style="margin: 20rpx 0" @click="toNav">
				<uv-grid-item name="/pages/user/user?current=1">
					<image class="gn-icon" src="/static/img/p.png"></image>
					<view class="grid-text">我的帖子</view>
				</uv-grid-item>

				<uv-grid-item name="/pages/user/post_favour">
					<image class="gn-icon" src="/static/img/p_favour.png"></image>
					<view class="grid-text">收藏的帖子</view>
				</uv-grid-item>
			</uv-grid>
		</view>
		<!-- 帮助 -->
		<view class="block-wrap">
			<view class="block-title">帮助</view>
			<view class="grid-wrap">
				<view class="grid-item">
					<view class="grid-item" @click="showCode">
						<image class="gn-icon" style="margin-bottom: unset" src="/static/img/qrcode.png"></image>
						<view class="grid-text">分享二维码</view>
					</view>
				</view>
				<view class="grid-item">
					<button open-type="contact" class="uv-reset-button">
						<image class="gn-icon" style="margin-bottom: unset" src="/static/img/help.png"></image>
						<view class="grid-text">帮助与反馈</view>
					</button>
				</view>
				<view class="grid-item">
					<button @click="onClear" class="uv-reset-button">
						<image class="gn-icon" style="margin-bottom: unset" src="/static/img/clear.png"></image>
						<view class="grid-text">清除缓存</view>
					</button>
				</view>
			</view>
		</view>
		<uv-modal ref="ref_modal" title="分享二维码">
			<uv-image :src="shareQRCode" width="160rpx" height="160rpx"></uv-image>
		</uv-modal>
	</view>
</template>

<script setup>
import { computed,ref,onBeforeMount,defineProps,watch } from 'vue';
import { useUserStore } from '@/stores/user.js';
import {storeToRefs} from 'pinia'

const store = useUserStore();
const {userInfo} =storeToRefs(store)

const shareQRCode = ref('')
const ref_modal = ref(null)
onBeforeMount(()=>{
	store.getUserInfo();
})
const toLogin = () => {
	uni.navigateTo({
		url: '/pages/login/login'
	});
};
const onClear = () => {
	uni.showModal({
		title: '提示',
		content: '是否清除登录信息以及数据缓存?',
		success: function (res) {
			if (res.confirm) {
				uni.clearStorageSync();
				store.logout();
			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}
	});
};
const toNav = (name) => {
	uni.navigateTo({
		url: name
	});
};
const showCode = ()=>{
	// ref_modal.value.open()
	uni.showShareImageMenu({ 
		path:'/static/share_code.jpg'
	})
}
</script>

<style lang="scss" scoped>
.head {
	margin-bottom: 20rpx;
	padding: 0 20px 20px;
	background-color: #fff;
	.userinfo {
		display: flex;
		align-items: center;
		padding: 20rpx;

		.arrow-right {
			margin-left: auto;
		}
	}
}
.grid-text {
	color: #999;
	font-size: 12px;
	margin-bottom: 20rpx;
}

.btn-login {
	padding-top:40rpx;
}

.gn-icon {
	width: 60rpx;
	height: 60rpx;
	margin-bottom: 20rpx;
}

.block-wrap {
	background-color: #fff;
	border-radius: 20rpx;
	margin: 20rpx;
	overflow: hidden;

	.block-title {
		background-color: #fff;
		padding: 20rpx;
	}
}

.grid-wrap {
	display: grid;
	grid-template-columns: repeat(4, 1fr);

	.grid-item {
		text-align: center;
		position: relative;

		.grid-text {
			color: #999;
			font-size: 12px;
			margin-bottom: 20rpx;
		}

		.message-num {
			position: absolute;
			right: 20rpx;
			top: 0;
			padding: 5rpx;
			width: 35rpx;
			height: 35rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			background-color: red;
			color: #fff;
			font-size: 24rpx;
		}
	}
}
</style>
<style>

</style>
