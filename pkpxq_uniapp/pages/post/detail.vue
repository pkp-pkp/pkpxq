<template>
	<view class="container" v-if="post">
		<!-- 用户信息 -->
		<view class="usercard" @click="toUcenter(post.userInfo.id)">
			<uv-avatar :src="imgPath(post.userInfo.avatar)" size="45"></uv-avatar>
			<view class="usercard-box">
				<text class="nickname uv-line-1">{{ post.userInfo.nickname }}</text>
				<text class="brief uv-line-1">{{ post.userInfo.brief }}</text>
			</view>
			<view class="btn-gz" @click.stop="onFollow(post.userInfo.id)">
				<uv-button v-if="post.isFollow" text="已关注" shape="circle" :customStyle="{ width: '150rpx', height: '60rpx' }"></uv-button>
				<uv-button v-else text="关注" shape="circle" type="primary" :customStyle="{ width: '150rpx', height: '60rpx' }"></uv-button>
			</view>
		</view>
		<!-- 帖子图片 -->
		<view class="swiper" v-if="post.media.length">
			<block v-if="post.type!==3">
				<uv-swiper
					:list="solveImgPath(post.media)"
					height="800rpx"
					autoplay
					indicatorStyle="right: 20px"
					@click.stop="previewImage(post.media[currentImg], post.media)"
					@change="(e) => (currentImg = e.current)"
				>
					<template v-slot:indicator>
						<view class="indicator-num">
							<text class="indicator-num__text">{{ currentImg + 1 }}/{{ post.media.length }}</text>
						</view>
					</template>
				</uv-swiper>
			</block>
			<block v-else>
				<uv-swiper
					:list="solveImgPath(post.media)"
					height="800rpx"
				>
				</uv-swiper>
			</block>
			<uv-divider></uv-divider>
		</view>
		<!-- 帖子内容 -->
		<view class="p">
			<view class="p-title">
				{{ post.title }}
			</view>
			<view class="p-content">
				<zero-markdown-view v-if="post.type == '1'" :markdown="post.content" themeColor="#ea5149"></zero-markdown-view>
				<text v-else @longpress="onCopy">{{ post.content }}</text>
			</view>

			<view class="p-footer">
				<!-- 点赞 -->
				<view v-if="post.hasThumb" class="p-item" @click.stop="changeThumb(post.postId, index)">
					<uv-icon name="thumb-up-fill" size="22" color="#cc0000"></uv-icon>
					<text class="count">{{ post.thumbNum }}</text>
				</view>
				<view v-else class="p-item" @click.stop="changeThumb(post.postId, index)">
					<uv-icon name="thumb-up" size="22"></uv-icon>
					<text class="count">{{ post.thumbNum }}</text>
				</view>
				<!-- 收藏 -->
				<view class="p-item" @click.stop="changeFavour(post.postId, index)">
					<uv-icon :name="post.hasFavour ? 'star-fill' : 'star'" :color="post.hasFavour ? '#cc0000' : '#606266'" size="22"></uv-icon>
					<text class="count">{{ post.favourNum }}</text>
				</view>
				<view class="p-item" @click="ref_action.open()">
					<uv-icon name="share" size="22"></uv-icon>
					<text class="count">分享</text>
				</view>
			</view>

			<view class="p-footer-view">
				<text class="count">阅读量：{{ post.viewNum }}</text>
			</view>
		</view>
		<!-- 评论内容 -->
		<view class="comment-box" v-if="cm">
			<view class="title">评论（{{ cmPage.total }}）</view>
			<view style="margin-bottom: 40rpx" v-for="(item, index) in cm" :key="item.commentId">
				<view class="comment-item" @longpress="delComment(item, index)">
					<uv-avatar @click="jumpUser(item.userInfo.id)" :src="imgPath(item.userInfo.avatar)" size="35"></uv-avatar>
					<view class="c-content" @tap="onReply(item)">
						<view class="user">
							<!-- 用户卡片 -->
							<view class="userinfo">
								<text>{{ item.userInfo.nickname }}</text>
								<text class="time">{{ formatFromTime(item.createTime) }}</text>
							</view>
							<!-- 点赞 -->
							<block v-if="item.hasThumb">
								<view @click.stop="changeCommentThumb(item.commentId, index)" class="thumbs">
									<text class="num">{{ item.thumbNum }}</text>
									<uv-icon class="icon" size="45rpx" name="thumb-up-fill" color="#e62e00"></uv-icon>
								</view>
							</block>
							<block v-else>
								<view @click.stop="changeCommentThumb(item.commentId, index)" class="thumbs">
									<text class="num">{{ item.thumbNum }}</text>
									<uv-icon class="icon" size="45rpx" name="thumb-up" color="#bfbfbf"></uv-icon>
								</view>
							</block>
						</view>
						<text class="c-txt">{{ item.content }}</text>
					</view>
				</view>
				<!-- 子评论 -->
				<view class="sub-comment-item" v-if="item.children.length > 0">
					<view v-for="(item2, index2) in item.children" :key="item2.id" @longpress="delComment(item2, index, index2)" @tap="onReply(item2)" style="margin-bottom: 10rpx">
						<view class="user">
							<uv-avatar @click="jumpUser(item2.userInfo.id)" :customStyle="{ marginRight: '10rpx' }" :size="20" :src="imgPath(item2.userInfo.avatar)"></uv-avatar>
							<view class="uv-head">
								<text class="nickname">{{ item2.userInfo.nickname }}</text>
								<block v-if="item2.hasThumb">
									<view class="thumbs" @click.stop="changeCommentThumb(item2.commentId, index, index2)">
										<text class="num">{{ item2.thumbNum }}</text>
										<uv-icon class="icon" size="45rpx" name="thumb-up-fill" color="#e62e00"></uv-icon>
									</view>
								</block>
								<block v-else>
									<view class="thumbs" @click.stop="changeCommentThumb(item2.commentId, index, index2)">
										<text class="num">{{ item2.thumbNum }}</text>
										<uv-icon class="icon" size="45rpx" name="thumb-up" color="#bfbfbf"></uv-icon>
									</view>
								</block>
							</view>
						</view>
						<view class="reply">
							<text v-if="item2.to_user">
								<text>回复</text>
								<text class="reply-at" @click.stop="jumpUser(item2.userInfo.id)">@{{ item2.to_user.nickname }}</text>
								<text>：</text>
							</text>
							<text style="color: #616161">{{ item2.content }}</text>
							<view class="time">{{ formatFromTime(item2.createTime) }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 加载状态 -->
			<block v-if="cm.length > 0">
				<view style="margin: 30rpx">
					<uv-load-more :status="loadStatus" />
				</view>
			</block>
			<block v-else>
				<uv-empty text="暂无评论" mode="message"></uv-empty>
			</block>
		</view>
		<view style="height: 100rpx"></view>
		<!-- 评论输入框 -->
		<view class="comment-tool">
			<textarea
				:placeholder="cmInput.placeholder"
				@blur="onBlur"
				:focus="cmInput.focus"
				fixed="true"
				cursor-spacing="10"
				v-model="cmInputForm.content"
				auto-height="true"
				placeholder-class="txt-placeholder"
			></textarea>
			<uv-button type="primary" :customStyle="{ marginLeft: '10rpx', width: '120rpx' }" @click="addComment" :disabled="cmInput.isSubmit">发布</uv-button>
		</view>
		<!-- 分享弹窗 -->
		<uv-action-sheet ref="ref_action" :actions="shareList" :round="10" cancelText="取消" @select="onShareItem"></uv-action-sheet>
	</view>
</template>

<script setup>
import { onLoad, onShareAppMessage, onShareTimeline, onReachBottom } from '@dcloudio/uni-app';
import { _getPostDetail, _getPostComment, _thumbAdd, _commentThumb, _commentAdd, _commentDel, _favourAdd } from '@/api/post.js';
import { _follow } from '@/api/user';
import { ref, reactive, computed, getCurrentInstance } from 'vue';
import moment from 'moment';
import { useUserStore } from '@/stores/user.js';
import { storeToRefs } from 'pinia';
const { proxy } = getCurrentInstance();
const store = useUserStore();
const { userInfo } = storeToRefs(store);

const post = ref(null);
const postId = ref(null);
const cm = ref([]);
const currentImg = ref(0);
const ref_action = ref(null);
const loadStatus = ref('loadmore');
// 分享action
const shareList = ref([
	{
		key: 'wechat',
		name: '发给微信好友',
		openType: 'share'
	}
]);
// 评论输入框
const cmInput = ref({
	placeholder: '',
	focus: false,
	isSubmit: false
});
// 评论表单
const cmInputForm = ref({
	content: '',
	parentId: 0,
	reply_user_id: null,
	reply_comment_id: null
});
// 评论页码
const cmPage = ref({
	page: 1,
	pageSize: 10,
	total: 0
});
// 分享
onShareAppMessage((res) => {
	let imageUrl;
	let { media, title, postId } = post.value;
	if (media.length > 0) {
		imageUrl = media[0];
	}
	return {
		title,
		path: '/pages/post/detail?id=' + postId,
		imageUrl
	};
});
onShareTimeline(() => {
	let { media, title, postId } = post.value;
	let imageUrl = media[0];
	return {
		title,
		imageUrl,
		query: 'id=' + postId
	};
});
onReachBottom(() => {
	cmPage.value.page++;
	getCommentList();
});
const getCommentList = async (isReAdd) => {
	loadStatus.value = 'loading';

	const cm_res = await _getPostComment({
		postId: postId.value,
		...cmPage.value
	});
	let { records, total } = cm_res.data;
	// 改变加载状态
	if (records.length === 0 && total > 0) {
		loadStatus.value = 'nomore';
	} else {
		loadStatus.value = 'loadmore';
	}
	cm.value = isReAdd ? records : cm.value.concat(records);
	cmPage.value.total = total;
};

onLoad(async (options) => {
	let { id } = options;
	postId.value = id;
	// 文章
	const res = await _getPostDetail({
		postId: id
	});
	// 处理图片
	post.value = res.data;
	// 评论
	await getCommentList();

	// 分享
	uni.showShareMenu({
		withShareTicket: true,
		menus: ['shareAppMessage', 'shareTimeline']
	});
});
const toUcenter = (id) => {
	uni.navigateTo({
		url: '/pages/user/user?userId=' + id
	});
};
const solveImgPath = computed(() => (urls) => urls.map((url) => proxy.$utils.imgPath(url)));
const previewImage = (url, urls) => {
	let imgList = [];
	urls.forEach((item) => {
		imgList.push(proxy.$utils.imgPath(item));
	});

	uni.previewImage({
		current: proxy.$utils.imgPath(url), // 当前显示图片的http链接
		urls: imgList // 需要预览的图片http链接列表
	});
};
const formatFromTime = (time) => moment(time).fromNow();
// 帖子点赞
const changeThumb = async (postId, index) => {
	const { data } = await _thumbAdd({
		postId
	});
	if (data === 1) {
		post.value.hasThumb = 1;
		post.value.thumbNum++;
	} else {
		post.value.hasThumb = 0;
		post.value.thumbNum--;
	}
};
// 帖子收藏
const changeFavour = async (postId, index) => {
	const { data } = await _favourAdd({ postId });
	if (data === 1) {
		post.value.hasFavour = 1;
		post.value.favourNum++;
	} else {
		post.value.hasFavour = 0;
		post.value.favourNum--;
	}
};
// 评论点赞
const changeCommentThumb = async (commentId, index, index2) => {
	const { data } = await _commentThumb({
		commentId
	});
	if (data === 1) {
		if (index2 !== undefined) {
			cm.value[index].children[index2].hasThumb = 1;
			cm.value[index].children[index2].thumbNum++;
		} else {
			cm.value[index].hasThumb = 1;
			cm.value[index].thumbNum++;
		}
	} else {
		if (index2 !== undefined) {
			cm.value[index].children[index2].hasThumb = 0;
			cm.value[index].children[index2].thumbNum--;
		} else {
			cm.value[index].hasThumb = 0;
			cm.value[index].thumbNum--;
		}
	}
};
// 分享按钮
const onShareItem = (e) => {
	let key = e.key;
};
// 长按复制
const onCopy = () => {
	uni.setClipboardData({
		data: post.value.content,
		success: function () {
			uni.showToast({
				title: '复制成功',
				icon:'none'
			});
		}
	});
};
// 关注按钮
const onFollow = (followeeId) => {
	_follow({ followeeId }).then((res) => {
		if (res.code === 200) {
			post.value.isFollow = !!res.data;
		}
	});
};
// 评论事件
const onBlur = () => {
	cmInput.value.focus = false;
	cmInput.value.placeholder = '说点什么';
	cmInput.value.parentId = 0; //切换为没有回复的状态
};
// 回复评论
const onReply = (item) => {
	let { parentId, commentId, userInfo } = item;

	cmInput.value.focus = true;
	cmInput.value.placeholder = '回复：' + userInfo.nickname;
	if (parentId === 0) {
		// 一级评论下回复
		cmInputForm.value.parentId = commentId;
		cmInputForm.value.reply_user_id = cmInputForm.value.reply_comment_id = null;
	} else {
		// 一级评论下 @人 回复
		cmInputForm.value.parentId = parentId; // 子评论的parentId就是父评论的commentId
		cmInputForm.value.reply_user_id = userInfo.id; // 回复的人的id
		cmInputForm.value.reply_comment_id = commentId;
	}
};
const addComment = () => {
	cmInput.value.isSubmit = true; // 禁用按钮防止重复提交
	if (cmInputForm.value.content === '') {
		uni.showToast({
			title: '评论不能为空',
			icon:'none'
		});
		cmInput.value.isSubmit = false;
		return;
	}

	uni.showLoading({
		mask: true,
		title: '发布中'
	});
	// 发起评论
	_commentAdd({ ...cmInputForm.value, postId: postId.value }).then((res) => {
		if (res.code === 200) {
			cmInputForm.value.content = '';
			uni.showToast({
				title: '评论成功',
				icon:'none'
			});

			cmPage.value.page = 1;
			getCommentList(true);
		}
		cmInput.value.isSubmit = false;
		uni.hideLoading();
	});
};
// 删除评论
const delComment = (item, index, index2) => {
	if (item.userInfo.id !== userInfo.value.id) {
		return;
	}
	console.log(item.commentId);
	uni.showModal({
		title: '提示',
		content: '确定删除该评论？',
		success: function (res) {
			if (res.confirm) {
				_commentDel({ commentId: item.commentId }).then((res2) => {
					if (res2.code === 200) {
						if (index2 !== undefined) {
							cm.value[index].children.splice(index2, 1);
						} else {
							cm.value.splice(index, 1);
						}
					}
				});
			} else if (res.cancel) {
				// console.log('用户点击取消');
			}
		}
	});
};
</script>

<style lang="scss" scoped>
.usercard {
	position: relative;
	background-color: #f5f5f5;
	display: flex;
	margin: 20rpx 0;
	padding: 20rpx;
	border-radius: 10rpx;

	&-box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 400rpx;
		overflow: hidden;
		margin-left: 10rpx;
		.brief {
			color: #a2a2a2;
			font-size: 24rpx;
		}
	}
	.btn-gz {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 20rpx;
	}
}
.p {
	&-title {
		margin: 30rpx 0;
		font-weight: bolder;
		font-size: 42rpx;
	}
	&-content {
	}
	&-footer {
		display: flex;
		justify-content: space-between;
		margin: 40rpx 0 10rpx;
		padding: 0 20rpx;
		.p-item {
			display: flex;
			.count {
				font-size: 28rpx;
			}
		}
		&-view {
			font-size: 22rpx;
			color: #bfbfbf;
			margin-top: 16rpx;
			text-align: right;
		}
	}
}
.indicator {
	display: flex;
	justify-content: center;
	&__dot {
		height: 6px;
		width: 6px;
		border-radius: 100px;
		background-color: rgba(255, 255, 255, 0.35);
		margin: 0 5px;
		transition: background-color 0.3s;
		&--active {
			background-color: #ffffff;
		}
	}
}
.indicator-num {
	padding: 2px 0;
	background-color: rgba(0, 0, 0, 0.35);
	border-radius: 100px;
	width: 35px;
	display: flex;
	justify-content: center;
	&__text {
		color: #ffffff;
		font-size: 12px;
	}
}

/*评论列表*/
.comment-box {
	background-color: #ffffff;
	margin-top: 60rpx;
}

.comment-box > .title {
	margin-bottom: 20rpx;
}

.comment-item {
	display: flex;
	&:active {
		background-color: #f5f5f5;
	}

	.c-content {
		display: flex;
		flex-direction: column;
		flex: 1;
		margin-left: 14rpx;
		.userinfo {
			display: flex;
			flex-direction: column;
			font-size: 28rpx;
			.time {
				color: #999;
				font-size: 22rpx;
			}
		}
		.c-txt {
			margin-top: 16rpx;
			font-size: 32rpx;
		}

		.user {
			display: flex;

			.thumbs {
				margin-left: auto;
				display: flex;
				align-items: center;
				color: #bfbfbf;

				.num {
					margin-right: 10rpx;
				}
			}
		}
	}
}

.sub-comment-item {
	margin-left: 90rpx;
	padding: 20rpx;
	border-radius: 10rpx;
	background-color: #f5f5f5;

	&:active {
		background-color: #f5f5f5;
	}

	.user {
		display: flex;
		align-items: center;

		.name {
			color: #616161;
		}

		.uv-head {
			flex: 1;
			display: flex;

			.thumbs {
				margin-left: auto;
				display: flex;
				align-items: center;
				color: #bfbfbf;

				.num {
					margin-right: 10rpx;
				}
			}
			.nickname {
				font-size: 26rpx;
			}
		}
	}

	.reply {
		font-size: 26rpx;

		.time {
			margin-left: auto;
			font-size: 20rpx;
			color: #999;
		}
		&-at {
			color: #2b85e4;
			font-weight: 600;
		}
	}
}
/* 评论tool */
.comment-tool {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx;
	background-color: #fff;
	display: flex;
	z-index: 999;
}

.comment-tool textarea {
	background-color: #f5f5f5;
	padding: 20rpx;
	border-radius: 10rpx;
	min-height: 40rpx;
}

.comment-tool .u-btn {
	margin-left: 10rpx;
}
</style>
