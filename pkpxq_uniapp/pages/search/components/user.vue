<template>
	<view>
		<p-user-list :list="list" :loadStatus="loadStatus"></p-user-list>
	</view>
</template>

<script setup>
import { onReachBottom } from '@dcloudio/uni-app';
import { watch,onBeforeMount } from 'vue';
import useUserList from '@/hooks/useUserList.js';

const props = defineProps(['form']);
const { list, listPage, resetList, loadStatus, getUserList } = useUserList();
watch(
	() => props.form,
	() => {
		resetList()
		getUserList(props.form);
	},
	{immediate:true,deep: true }
);

onReachBottom(() => {
	listPage.value.page++;
	getUserList(props.form);
});
</script>

<style></style>
