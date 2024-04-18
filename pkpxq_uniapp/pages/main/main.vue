<template>
	<view class="main">
		<Home v-if="pageCur == 'home'"></Home>
		<Myself v-if="pageCur == 'myself'"></Myself>
		<uv-tabbar :value="pageCur" iconSize="26" activeColor="#EA5149" inactiveColor="#000">
			<uv-tabbar-item name="home" text="首页" icon="home-fill" @click="navChange({ cur: 'home' })"></uv-tabbar-item>
			<uv-tabbar-item iconSize="34" icon="/static/tabbar/p_add.png" @click="showCard"></uv-tabbar-item>
			<uv-tabbar-item name="myself" text="我的" icon="account-fill" @click="navChange({ cur: 'myself' })"></uv-tabbar-item>
		</uv-tabbar>

		<uv-popup ref="popup" zIndex="10" mode="bottom">
			<view class="pup">
				<uv-grid :border="false" @click="onPupItem">
					<uv-grid-item name="/pages/post/add?type=2">
						<uv-icon :customStyle="{ paddingBottom: 20 + 'rpx' }" name="/static/img/a_post.png" :size="40"></uv-icon>
						<text class="grid-text">帖子</text>
					</uv-grid-item>
					<uv-grid-item name="/pages/post/add?type=1">
						<uv-icon :customStyle="{ paddingBottom: 20 + 'rpx' }" name="/static/img/a_notes.png" :size="40"></uv-icon>
						<text class="grid-text">笔记</text>
					</uv-grid-item>
					<uv-grid-item name="/pages/post/add?type=3">
						<uv-icon :customStyle="{ paddingBottom: 20 + 'rpx' }" name="/static/img/a_video.png" :size="40"></uv-icon>
						<text class="grid-text">视频</text>
					</uv-grid-item>
				</uv-grid>
			</view>
		</uv-popup>
	</view>
</template>

<script>
import Home from './home.vue';
import Myself from './myself.vue';
import { _userInfo } from '@/api/user.js';
import { storeToRefs } from 'pinia';
import { useUserStore, useAppStore } from '@/stores/index.js';
const store = useUserStore();
const store_app = useAppStore();
export default {
	data() {
		return {
			pageCur: 'home',
			bgColor: '#fff',
			bgColorList: {
				home: '#fff',
				myself: '#f5f5f5'
			}
		};
	},
	computed: {
		isLogin: () => store.isLogin,
		userInfo: () => store.userInfo,
	},
	components: {
		Home,
		Myself
	},
	onLoad(options) {
		const { pageCur } = options;
		if (pageCur) {
			this.navChange({ cur: pageCur });
		}
	},
	onShow() {
		// 重载页面
		if (store_app.reload[this.pageCur]) {
			store_app.reload[this.pageCur] = false;
			let cache = this.pageCur
			this.pageCur = ''
			this.$nextTick(()=>{
				this.pageCur = cache
			})
		}
		store.getUserInfo()
	},
	onHide() {},
	methods: {
		navChange({ cur }) {
			this.pageCur = cur;
			this.bgColor = this.bgColorList[cur];
		},
		showCard() {
			this.$refs.popup.open();
		},
		jump(url) {
			uni.navigateTo({
				url
			});
		},
		onPupItem(name) {
			this.$refs.popup.close()
			uni.navigateTo({
				url: name
			});
		}
	}
};
</script>

<style>
page {
	height: 100%;
}
</style>
<style scoped>
.main {
	height: 100%;
	background-color: v-bind(bgColor);
}
.pup {
	padding: 40px 20px 80px;
}
</style>
