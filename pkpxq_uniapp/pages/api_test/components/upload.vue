<template>
	<uni-file-picker
		file-mediatype="image"
		mode="grid"
		file-extname="png,jpg"
		:limit="1"
		@select="select"
		ref="files"
		:auto-upload="false"
	/>
	<button @click="upload">上传</button>
	<view>上传成功：路径：{{imageUrl}}</view>
</template>

<script setup>
import { ref } from 'vue';
import { _uploadPath } from '@/api/api.js';
const filePath = ref('');
const imageUrl = ref('')
const files = ref(null);
const select = (e) => {
	filePath.value = e.tempFilePaths[0]
	 
};
const upload = async ()=>{
	const res = await _uploadPath(filePath.value,'avatar')
	imageUrl.value = res.data.path
	console.log(res.data.path);
}
</script>

<style></style>
