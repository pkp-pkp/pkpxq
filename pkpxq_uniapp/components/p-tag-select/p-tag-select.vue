<template>
	<view>
		<view class="tag">
			<tki-tree ref="treePicker" :range="tagList" title="标签" rangeKey="name" multiple :maxCount="6" @confirm="tagSelect"></tki-tree>
		</view>
	</view>
</template>

<script>
import { _tagList } from '@/api/post';
export default {
	name:'p-tag-select',
	emits:['confirm'],
	data() {
		return {
			tagList: []
		};
	},
	created() {
		this.getData();
	},
	methods: {
		async getData() {
			const res = await _tagList();
			const { all, tags } = res.data;
			let tagList = []
			let keys = Object.keys(tags)
			// 处理数据
			keys.forEach(key=>{
				tagList.push({
					id:key,
					name:key,
					children:tags[key].map(item=>({id:key,name:item}))
				})
			})
			console.log(tagList,111);
			this.tagList = tagList
		},
		tagSelect(result) {
			const d = result.map(item=>item.name)
			this.$emit('confirm',d)
		},
		_show(){
			this.$refs.treePicker._show()
		}
	}
};
</script>

<style lang="scss" scoped>
.tag{
	display: flex;
	flex-wrap: wrap;
	.tag-item {
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
}
</style>
