<template>
	<view>
		<p-post-list :list="list" :loadStatus="loadStatus"></p-post-list>
	</view>
</template>

<script setup>
import { onReachBottom } from '@dcloudio/uni-app';
import { watch } from 'vue';
import usePostList from '@/hooks/usePostList.js';

const props = defineProps(['form']);
const { list, listPage, resetList, loadStatus, toSearchPost } = usePostList();
watch(
	() => props.form,
	() => {
		resetList()
		toSearchPost(props.form);
	},
	{ immediate: true, deep: true }
);
onReachBottom(() => {
	listPage.value.page++;
	toSearchPost(props.form);
});
</script>

<style></style>
