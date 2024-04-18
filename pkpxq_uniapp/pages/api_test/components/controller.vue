<template>
	<button @click="getAvatarFile">获取头像文件</button>
	<view class="img">
		<view v-for="(item,index) in imgList" :key="item">
			<image class="img-item" :src="item" alt=""></image>
			<text @click="delFile(item,index)">删除</text>
		</view>
	</view>
</template>

<script setup>
import { _getUploadDir,_delFile } from '@/api/controller.js';
import { ref ,defineEmits} from 'vue';
const imgList = ref([]);
const emits = defineEmits(['update'])

const getAvatarFile = async () => {
	const res = await _getUploadDir({
		type:'avatar'
	});
	let arr = [];
	res.records.forEach((item) => {
		arr.push(res.baseUrl + '/' + item);
	});
	imgList.value = arr
	emits('update')
};
const delFile = async (item,index)=>{
	const a = item.split('/')
	imgList.value.splice(index,1) 
	const res = await _delFile({
		type:'avatar',
		filename:a[a.length-1]
	})
	
}
</script>

<style lang="scss" scoped>
	.img{
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 5px;
		&-item{
			width: 100rpx;
			height: 100rpx;
		}
	}
</style>
