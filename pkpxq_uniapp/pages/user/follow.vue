<template>
	<view>
		<p-user-list :list="list" :loadStatus="loadStatus" tips="还没有关注的人哦!"></p-user-list>
	</view>
</template>

<script setup>
import useUserList from '@/hooks/useUserList.js';
import { ref } from 'vue';
import { onLoad,onPullDownRefresh } from '@dcloudio/uni-app';
const userId = ref(null);
const { list,loadStatus, getFollowList,resetList } = useUserList();

onLoad((options) => {
	let { userId: id } = options;
	userId.value = id;
	getFollowList({ userId: userId.value });
});
onPullDownRefresh(()=>{
	resetList()
	getFollowList({ userId: userId.value });
})
</script>

<style lang="scss"></style>
