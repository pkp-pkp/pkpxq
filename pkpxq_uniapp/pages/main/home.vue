<template>
	<view>
		<uv-navbar title="首页" placeholder>
			<template #left>
				<view>
					<uv-avatar src="/static/img/logo.png"></uv-avatar>
				</view>
			</template>
			<template #center>
				<view class="nav-input" @click="toNav('/pages/search/search')">
					<uv-input class="input" placeholder="搜索帖子/用户" prefixIcon="search" disabled shape="circle" :customStyle="{ height: '30rpx' }" />
				</view>
			</template>
		</uv-navbar>
		<view class="notice" v-if="appConfig.notice" @click="toNav(appConfig.notice.path)">
			<uv-notice-bar :text="appConfig.notice.text"></uv-notice-bar>
		</view>
		<div class="swiper">
			<uv-swiper :list="formatPath" autoplay></uv-swiper>
		</div>
		<uv-sticky customNavHeight="64" zIndex="1" bgColor="#fff">
			<uv-tabs
				:list="tabs.list"
				:current="tabs.current"
				lineWidth="30"
				lineColor="#f56c6c"
				:activeStyle="tabsStyle.activeStyle" 
				:inactiveStyle="tabsStyle.inactiveStyle"
				itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
				@change="tabChange"
			></uv-tabs>
		</uv-sticky>
		<view style="height: 40rpx"></view>
		<p-post-list :list="list" :loadStatus="loadStatus"></p-post-list>
	</view>
</template>

<script setup>
import { onReachBottom,onPullDownRefresh } from '@dcloudio/uni-app';
import { ref, reactive, watch, onMounted, computed } from 'vue';
import usePostList from '@/hooks/usePostList.js';
import { _getPostCategory } from '@/api/post';
import { _getAppHome } from '@/api/app';
import { imgPath } from '../../utils';

const { list, loadStatus, listPage, getPostList, resetList } = usePostList();
const tabsStyle = reactive({
	activeStyle: {
		color: '#303133',
		fontWeight: 'bold',
		transform: 'scale(1.25)'
	},
	inactiveStyle: {
		color: '#606266',
		transform: 'scale(1)'
	}
});
const tabs = ref({
	list: [{ name: '最新' }, { name: '热门' }],
	current: 0
});
const appConfig = ref({});
onMounted(() => {
	getPostList();
	getCate();
	_getAppHome().then((res) => {
		appConfig.value = res.data;
	});
});
onReachBottom(() => {
	listPage.value.page++;
	getPostList();
});
onPullDownRefresh(()=>{
	listPage.value.page = 1;
	getPostList()
	uni.stopPullDownRefresh()
})
const formatPath = computed(()=>{
	return appConfig.value.banner && appConfig.value.banner.map(item=>imgPath(item))
})
const tabChange = (e) => {
	let { name, index, cateId } = e;
	tabs.value.current = index;

	resetList();
	if (cateId !== undefined) {
		listPage.value.cateId = e.cateId;
	} else {
		// 设置其排序内容
		let p_enum = {
			最新: ['createTime', 'DESC'],
			热门: ['viewNum', 'DESC']
		};
		if (p_enum[name]) {
			let [sortField, sortOrder] = p_enum[name];
			listPage.value.sortField = sortField;
			listPage.value.sortOrder = sortOrder;
		}
	}
	getPostList();
};
const getCate = async () => {
	const res = await _getPostCategory();
	const cateList = res.data.map((item) => {
		return {
			name: item.cateName,
			cateId: item.cateId
		};
	});
	tabs.value.list = tabs.value.list.concat(cateList);
};

const toNav = (url) => {
	uni.navigateTo({
		url
	});
};
</script>
<style lang="scss" scoped>
.nav-input {
	box-sizing: border-box;
	width: 500rpx;
	line-height: 500rpx;
	padding-right: 100rpx;
}
.swiper{
	padding:20rpx;
}
</style>
