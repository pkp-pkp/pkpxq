<template>
	<input type="text" placeholder="请输入帖子id" v-model="postId" />
	<button @click="getPostList">获取帖子</button>
	<button @click="getPostComment">获取评论</button>
</template>

<script setup>
import { _getPostList, _getPostComment } from '@/api/post.js';
import { ref } from 'vue';
const postId = ref('');
const getPostList = async () => {
	const res = await _getPostList({
		page: 1,
		pageSize: 10,
		postId:postId.value
	});
};
const getPostComment = async () => {
	const res = await _getPostComment({
		postId:postId.value
	});
};
</script>

<style></style>
