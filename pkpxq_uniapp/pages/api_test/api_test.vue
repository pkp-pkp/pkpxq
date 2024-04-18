<template>
	<view>
		<uni-collapse ref="collapse" v-model="value">
			<uni-collapse-item name="login" title="登录">
				<Login/>
			</uni-collapse-item>
			<uni-collapse-item name="upload" title="上传">
				<Upload/>
			</uni-collapse-item>
			<uni-collapse-item name="controller" title="管理">
				<Controller @update="update"/>
			</uni-collapse-item>
			<uni-collapse-item name="post" title="帖子">
				<Post/>
			</uni-collapse-item>
			<button @click="update">更新</button>
		</uni-collapse> 
	</view>
</template>

<script setup>
	import { ref,getCurrentInstance,nextTick } from 'vue';
	import Login from'./components/login.vue'
	import Upload from './components/upload.vue'
	import Controller from './components/controller.vue'
	import Post from './components/post.vue'
	const value = ref(['post'])
	const collapse = ref(null)
	const update = ()=>nextTick(()=>collapse.value.resize())
</script>

<style lang="scss">
	button{
		display: inline-block;
		width: 300rpx;
		font-size: 26rpx;
	}
</style>
