<template>
	<view>
		<block v-for="(item, index) in list" :key="item.id">
			<view class="user-item">
				<uv-avatar
					@click="jump('/pages/user/user?userId=' + item.id)"
					class="avatar"
					:customStyle="{ marginRight: '20rpx' }"
					:src="imgPath(item.avatar)"
					mode="aspectFill"
				></uv-avatar>
				<view @click="jump('/pages/user/user?userId=' + item.id)" class="user">
					<text class="name">{{ item.nickname }}</text>
					<text v-if="item.sex === 1" class="iconfont icon-xingbienan"></text>
					<text v-if="item.sex === 2" class="iconfont icon-xingbienv"></text>
				</view>
				<view class="btn-box" @click.stop="onFollow(item.id, index)">
					<view v-if="!item.isFollow" class="follow-btn">
						<uv-icon name="plus" color="#fff"></uv-icon>
						<text class="text">{{item.isFans?'回关':'关注'}}</text>
					</view>
					<view v-else-if="item.isFollow && item.isFans" class="follow-btn none-follow-btn">
						<text class="text">互相关注</text>
					</view>
					<view v-else class="follow-btn none-follow-btn">
						<text class="text">已关注</text>
					</view>
				</view>
			</view>
		</block>
		<!-- 加载状态 -->
		<block v-if="loadStatus != 'none'">
			<block v-if="list.length === 0 && loadStatus == 'nomore'">
				<uv-empty :text="tips ? tips : '暂无用户'" mode="list"></uv-empty>
			</block>
			<block v-else>
				<uv-load-more margin-bottom="50" margin-top="50" :status="loadStatus" loadingIcon="semicircle" />
			</block>
		</block>
	</view>
</template>

<script>
import { _follow } from '@/api/user';
export default {
	name: 'p-user-list',
	props: {
		list: Array,
		loadStatus: String,
		tips: String
	},
	data() {
		return {};
	},
	methods: {
		jump(url) {
			uni.navigateTo({
				url
			});
		},
		async onFollow(userId, index) {
			const res = await _follow({ followeeId: userId });
			if (res.code === 200) {
				this.list[index].isFollow = res.data;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.user-item {
	position: relative;
	display: flex;
	align-items: center;
	padding: 20rpx;
	border-bottom: 1px solid #f5f5f5;
	background-color: #ffffff;

	&:last-child {
		border-bottom: 0;
	}
	.icon-xingbienv {
		color: #ff4d94;
	}
	.icon-xingbienan {
		color: #0091ff;
	}
	.user {
		.name {
			margin-right: 10rpx;
		}
		.iconfont {
			font-size: 16px;
		}
	}
}

.btn-box {
	position: absolute;
	right: 20rpx;
	.follow-btn {
		display: flex;
		background-color: $theme-color;
		font-size: 28rpx;
		padding: 5rpx 20rpx;
		border-radius: 100px;
		white-space: nowrap;
		color: #fff;
	}
	.none-follow-btn {
		background-color: #eee;
	}
}
</style>
