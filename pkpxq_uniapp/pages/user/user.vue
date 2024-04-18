<template>
	<view>
		<view>
			<uv-navbar @leftClick="onBack" bgColor="unset" placeholder></uv-navbar>
		</view>
		<view class="con-c" v-if="userInfo">
			<view class="user-info">
				<image class="avatar" mode="aspectFill" :src="imgPath(userInfo.avatar)"></image>
				<view class="user-c">
					<view class="username">
						<text>{{ userInfo.nickname }}</text>
					</view>
					<view class="num-box">
						<text>
							{{ userInfo.followeeNum }}
							<text class="txt">关注</text>
						</text>
						<text>
							{{ userInfo.followerNum }}
							<text class="txt">粉丝</text>
						</text>
						<text>
							{{ userInfo.postNum }}
							<text class="txt">帖子</text>
						</text>
					</view>
					<view v-if="userId!=userInfo.id" class="btn-box" @click="onFollow">
						<view v-if="!userInfo.isFollow" class="follow-btn">
							<uv-icon name="plus" color="#fff"></uv-icon>
							<text class="text">关注</text>
						</view>
						<view v-else-if="userInfo.isFollow && userInfo.isFans" class="follow-btn" style="background-color: #eee">
							<text class="text">互相关注</text>
						</view>
					</view>
				</view>
			</view>
			<!-- tab -->
			<view class="tab-box">
				<uv-tabs keyName="tab_name" lineColor="#f56c6c" :list="tabs.list" :is-scroll="false" :current="tabs.current" @change="tabChange"></uv-tabs>
			</view>
			<!-- 主页 -->
			<view v-show="tabs.current === 0">
				<!-- 基本信息 -->
				<view class="f-wrap uv-skeleton-fillet">
					<view class="title">基本信息</view>
					<view class="info-c">
						<text v-if="userInfo.sex">性别：{{ userInfo.sex == '1' ? '男' : '女' }}</text>
						<text v-if="userInfo.age">年龄：{{ userInfo.age }}岁</text>
						<text>个人简介：{{ userInfo.brief || '这个人很懒，没留下什么' }}</text>
					</view>
				</view>
			</view>
			<!-- 帖子 -->
			<view v-show="tabs.current === 1" class="post">
				<p-post-list :list="postList" :loadStatus="loadStatus" tips="快去发布帖子吧!"></p-post-list>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { _userInfoById, _follow } from '@/api/user';
import { useUserStore } from '@/stores/user';
import usePostList from '@/hooks/usePostList.js';
const store = useUserStore();
const { list: postList, loadStatus, listPage, getPostList,resetList } = usePostList();

const userId = ref(null);
const userInfo = ref(null);
const tabs = ref({
	list: [{ tab_name: '主页' }, { tab_name: '帖子' }],
	current: 0
});
onLoad((options) => {
	let { userId: id, current = 0 } = options;
	userId.value = id ? +id : store.userInfo.id;

	getUserInfo({ userId: userId.value });
	tabChange(+current);
});
onReachBottom(() => {
	if (tabs.value.current == 1) {
		listPage.value.page++;
		getPostList({ userId: userId.value });
	}
});
const onBack = () => uni.navigateBack();
const tabChange = (e) => {
	let { tab_name, index } = e;
	if (typeof e === 'number') {
		tab_name = tabs.value.list[e].tab_name;
		index = e;
	}

	tabs.value.current = index;
	if (tab_name === '帖子') {
		resetList()
		getPostList({ userId: userId.value });
	}
};
const getUserInfo = async () => {
	const res = await _userInfoById({ id: userId.value });
	userInfo.value = res.data;
};
// 关注
const onFollow = async () => {
	const res = await _follow({ followeeId: userId.value });
	if (res.code === 200) {
		userInfo.value.isFollow = !!res.data;
	}
};
</script>
<style>
page {
	background-color: #f5f5f5;
}
</style>
<style lang="scss" scoped>
.con-c {
	padding: 30rpx;
	position: relative;
}

.user-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	height: 400rpx;

	.user-c {
		background-color: #ffffff;
		border-radius: 30rpx;
		padding: 20rpx;
		position: absolute;
		top: 65rpx;
		left: 0;
		right: 0;
		box-shadow: 5rpx 10rpx 20rpx #e6e6e6;
		display: flex;
		flex-direction: column;
		align-items: center;

		.username {
			font-size: 40rpx;
			font-weight: bold;
			margin-top: 70rpx;
		}

		.num-box {
			font-size: 24rpx;
			margin: 20rpx 0;
			text-align: center;

			.txt {
				color: #999;
				margin-left: 5rpx;
			}

			text {
				margin-right: 30rpx;
			}
		}

		.desc {
			font-size: 22rpx;
			color: #999;
		}

		.btn-box {
			display: flex;
			margin-top: 20rpx;
		}
	}
}

.tab-box {
	margin-top: 30rpx;
	margin-bottom: 30rpx;
}

.info-c {
	display: flex;
	flex-direction: column;
}

.info-c > text {
	margin-bottom: 20rpx;
	color: #999;
}

/* 标签 */
.tag-box {
}

.tag-box .tag {
	padding: 10rpx 20rpx;
	border-radius: 20rpx;
	font-size: 24rpx;
	display: inline-block;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
	background-color: #ffebe5;
}

.tag-box .tag:nth-child(2n) {
	background-color: #ecf9f2;
}

.tag-box .tag:nth-child(3n) {
	background-color: #fff7e5;
}

.tag-box .tag:nth-child(5n) {
	background-color: #b3e0ff;
}

.follow-btn {
	color: #fff;
	background-color: deepskyblue;
	font-size: 28rpx;
	border-radius: 100rpx;
	padding: 10rpx 30rpx;
	display: flex;
	align-items: center;
	white-space: nowrap;

	.text {
		margin-left: 10rpx;
	}
}

.avatar {
	width: 130rpx;
	height: 130rpx;
	border-radius: 200rpx;
	background-color: #999;
	z-index: 999;
}
.f-wrap {
	padding: 20rpx;
	border-radius: 10rpx;
	box-shadow: 5rpx 5rpx 20rpx #e6e6e6;
	background-color: #ffffff;
	margin-bottom: 20rpx;
}

.f-wrap > .title {
	font-weight: bold;
	margin-bottom: 20rpx;
}
.post {
	border-radius: 10rpx;
	overflow: hidden;
}
</style>
