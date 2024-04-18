<template>
	
	<uv-sticky>
		<view class="search">
			<uv-search :showAction="true" placeholder="搜索帖子/用户" shape="square" v-model="keyword" @custom="onSearch" @search="onSearch"></uv-search>
		</view>
	</uv-sticky>
	<view class="container">
		<div class="result">
			<view class="suggest" v-if="!form.keyword">
				<view class="title">
					<text>搜索记录</text>
					<view class="title-icon" @click="clearHistory">
						<uv-icon name="trash" size="26"></uv-icon>
					</view>
				</view>
				<view class="tag">
					<view class="tag-item" v-for="(item, index) in history" :key="index" @click="tagClick(item)">
						{{ item }}
					</view>
				</view>
			</view>
			<view class="record" v-else>
				<uv-tabs :list="tabs.list" :current="tabs.current" lineWidth="30" lineColor="#f56c6c" @change="tabChange"></uv-tabs>
				<div style="height: 10px"></div>
				<Post v-if="type == 'post'" :form="form" />
				<User v-if="type == 'user'" :form="form" />
			</view>
		</div>
	</view>
</template>

<script>
import { _search } from '@/api/post';
import Post from './components/post.vue';
import User from './components/user.vue';
export default {
	data() {
		return {
			keyword: '',
			history: uni.getStorageSync('search') || [],
			type: 'post',
			form: {
				keyword: ''
			},
			tabs: {
				current: 0,
				list: [
					{ key: 'post', name: '帖子' },
					{ key: 'user', name: '用户' }
				]
			}
		};
	},
	components: { Post, User },
	methods: {
		getData() {
			if (this.type == 'post') {
				this.getPostList();
			}
		},
		onSearch() {
			if (this.keyword == '') {
				uni.showToast({
					title: '请输入内容',
					icon:'none'
					
				});
				return;
			}
			let h = this.history.filter((item) => item != this.keyword);
			h.unshift(this.keyword);
			this.history = h;
			uni.setStorageSync('search', h);
			this.form.keyword = this.keyword;
		},
		clearHistory() {
			uni.showModal({
				title: '确认删除',
				content: '你确定要清空历史记录吗？',
				success: function (res) {
					if (res.confirm) {
						this.history = [];
						uni.removeStorageSync('search');
					} else if (res.cancel) {
						// console.log('用户点击了取消按钮');
					}
				}
			});
		},
		async tagClick(item, v) {
			this.type = 'post';
			this.keyword = item;
			this.form.keyword = item;
		},
		tabChange(item) {
			this.type = item.key;
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 0 30rpx 30rpx;
}
.search{
	background-color: #fff;
	position: sticky;
	top: 0;
	padding: 10rpx 30rpx; 
}
.result {
	margin-top: 20rpx;
}
.suggest {
	margin: 0 -10rpx;
	.title {
		position: relative;
		margin: 20rpx 10rpx;
		&-icon {
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
		}
	}

	.tag {
		display: flex;
		flex-wrap: wrap;
		&-item {
			background-color: #f5f5f5;
			margin: 0 10rpx 20rpx;
			padding: 10rpx 25rpx;
			border-radius: 15rpx;
			color: #aeaeae;
			font-size: 26rpx;
		}
	}
}
</style>
