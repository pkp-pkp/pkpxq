<template>
	<view>
		<view class="tab-box">
			<uv-tabs :list="tabs.list" :is-scroll="false" :current="tabs.current" @change="tabChange"></uv-tabs>
		</view>
		<view class="tag">
			<button @click="$refs.treePicker._show()">显示</button>
			<tki-tree ref="treePicker" :range="localdata" multiple :maxCount="6" @confirm="tagSelect"></tki-tree>
		</view>
	</view>
</template>

<script>
import { _tagList } from '../../api/post';
export default {
	data() {
		return {
			tabs: {
				list: [{ name: '全部' }],
				current: 0
			},
			localdata: [],
			tagCate: {},
			nowTag: [],
			selectTag:[]
			
		};
	},
	created() {
		this.getData();
	},
	methods: {
		async getData() {
			const res = await _tagList();
			const { all, tags } = res.data;
			// this.tag = tags.
			let localdata = []
			let keys = Object.keys(tags)
			keys.forEach(key=>{
				localdata.push({
					id:key,
					label:key,
					children:tags[key].map(item=>({id:key,label:item}))
				})
			})
			this.localdata = localdata
		},
		tagSelect(...a) {
			console.log(a);
		},
		tabChange(e) {
			let { name, index } = e;
			this.nowTag = this.tagCate[name]

			tabs.value.current = index;
			if (tab_name === '帖子') {
				resetList();
				getPostList({ userId: userId.value });
			}
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
