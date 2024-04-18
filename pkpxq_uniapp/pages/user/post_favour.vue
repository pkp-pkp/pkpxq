<template>
	<view>
		<p-post-list :list="list" :loadStatus="loadStatus" @selectAction="selectAction"></p-post-list>
	</view>
</template>

<script setup>
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { ref } from 'vue';
import usePostList from '@/hooks/usePostList.js';
import {useUserStore} from '@/stores/user'
const store =useUserStore()
const userId = ref(null);
const { list, getFavourPost, loadStatus } = usePostList();
onLoad((options) => {
	let { userId: id } = options;
	userId.value = id ? +id : store.userInfo.id;
	getFavourPost({ userId: userId.value });
	console.log(list);
});
onPullDownRefresh(() => {
	list.value = [];
	getFavourPost({ userId: userId.value }).then((res) => uni.stopPullDownRefresh());
});
const selectAction = (e) => {
	// 收藏后重新获取数据
	if (e.key === 'favour') {
		list.value = [];
		getFavourPost({ userId: userId.value });
	}
};
</script>

<style lang="scss"></style>
