<template>
	<view v-if="list" class="post">
		<block v-for="(item, index) in list" :key="index">
			<view @click="jump(item)">
				<view class="post-item">
					<view class="post-item-top-user">
						<view @click.stop="toUcenter(item.userInfo.id)">
							<uv-avatar class="avatar" :customStyle="{ marginRight: '20rpx' }" :src="imgPath(item.userInfo.avatar)"></uv-avatar>
						</view>
						<view @click.stop="toUcenter(item.userInfo.id)" class="center">
							<view style="display: flex; align-items: center"> 
								<text class="username" v-if="item.userInfo">{{ item.userInfo.nickname.substring(0, 12) }}</text>
								<!--  -->
								<span class="tiptag" v-if="item.userInfo.id===topic_info.userId">
									<uv-tags text="圈主" size="mini"></uv-tags>
								</span>
								<div class="tiptag" v-if="item.isTop">
									<uv-tags text="置顶" size="mini" bgColor="#3C9CFF" borderColor="#3C9CFF"></uv-tags>
								</div>
							</view>
							<view>
								<text class="time">{{ formatFromTime(item.createTime) }}</text>
							</view>
						</view>
						<view class="right">
							<uv-icon :size="20" @tap.stop="onActive(item, index)" class="arrow-down" name="more-dot-fill"></uv-icon>
						</view>
					</view>
					<view class="post-content">
						<view class="post-content-wrap uv-line-5">
							<!-- <ua-markdown v-if="item.type == '1'" :source="item.content" :showLine="false"></ua-markdown> -->
							<!--  为了美观，笔记仅展示原内容 -->
							<text v-if="item.type == 1">{{ item.title }}</text>
							<text v-else>{{ item.content }}</text>
						</view>
						<!-- 帖子类型 -->
						<block v-if="item.type == 2">
							<!--一张图片-->
							<block v-if="item.media.length == 1">
								<image
									:lazy-load="true"
									mode="aspectFill"
									class="img-style-1"
									:src="$utils.imgPath(item.media[0])"
									@tap.stop="previewImage(item.media[0], item.media)"
								></image>
							</block>
							<!--二张图片-->
							<block v-if="item.media.length == 2">
								<view class="img-style-2">
									<image
										:lazy-load="true"
										v-for="(mediaItem, index2) in item.media"
										:key="index2"
										@tap.stop="previewImage(mediaItem, item.media)"
										mode="aspectFill"
										:src="$utils.imgPath(mediaItem)"
									></image>
								</view>
							</block>
							<!--三张以上图片-->
							<block v-if="item.media.length > 2">
								<view class="img-style-3">
									<image
										:lazy-load="true"
										v-for="(mediaItem, index2) in item.media"
										:key="index2"
										@tap.stop="previewImage(mediaItem, item.media)"
										mode="aspectFill"
										:src="$utils.imgPath(mediaItem)"
									></image>
								</view>
							</block>
						</block>
					</view>
					<scroll-view scroll-x style="margin-top: 40rpx">
						<view class="p-tags">
							<view class="p-tags-item" v-for="tag in item.tags" :key="tag">
								<uv-tags :text="'#' + tag" plain size="mini" shape="circle" borderColor="#efefef" color="#000"></uv-tags>
							</view>
						</view>
					</scroll-view>
					<!-- 底部 -->
					<view class="p-footer">
						<view class="p-item">
							<uv-icon name="eye"></uv-icon>
							<text class="count">{{ item.viewNum }}</text>
						</view>
						<view class="p-item">
							<uv-icon name="chat"></uv-icon>
							<text class="count">{{ item.commentNum }}</text>
						</view>
						<view v-show="item.hasThumb" class="p-item" @click.stop="changeThumb(item.postId, index)">
							<uv-icon name="thumb-up-fill" color="#cc0000"></uv-icon>
							<text class="count">{{ item.thumbNum }}</text>
						</view>
						<view v-show="!item.hasThumb" class="p-item" @click.stop="changeThumb(item.postId, index)">
							<uv-icon name="thumb-up"></uv-icon>
							<text class="count">{{ item.thumbNum }}</text>
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- 操作弹窗 -->
		<uv-action-sheet ref="actionSheet" :actions="actionList" @select="actionSelect" cancelText="取消"></uv-action-sheet>
	</view>
	<!-- 加载状态 -->
	<view>
		<block v-if="list.length === 0 && loadStatus == 'nomore'">
			<uv-empty :text="tips ? tips : '暂无帖子'" mode="list"></uv-empty>
		</block>
		<block v-else>
			<view style="padding: 30rpx 0">
				<uv-load-more :status="loadStatus" />
			</view>
		</block>
	</view>
</template>

<script>
import { _thumbAdd, _favourAdd, _postDel } from '@/api/post';
import { _follow } from '@/api/user';
import { _addTop, _deleteTop } from '@/api/topic';
import moment from 'moment';
import { useUserStore } from '../../stores';

const store = useUserStore();
export default {
	name: 'p-post-list',
	props: {
		list: Array,
		loadStatus: String,
		tips: String
	},
	emits: ['selectAction'],
	data() {
		return {
			showAction: false,
			actionList: [],
			choosePost: '',
			chooseIndex: ''
		};
	},
	computed: {
		userInfo: () => store.userInfo,
		topic_info:()=>store.topic_info
	},
	mounted() {},
	methods: {
		async changeThumb(id, index) {
			const { data } = await _thumbAdd({
				postId: id
			});
			if (data === 1) {
				this.list[index].hasThumb = 1;
				this.list[index].thumbNum++;
			} else {
				this.list[index].hasThumb = 0;
				this.list[index].thumbNum--;
			}

			this.$emit('selectAction', e);
		},
		jump(e) {
			uni.navigateTo({
				url: '/pages/post/detail?id=' + e.postId
			});
		},
		formatFromTime(time) {
			return moment(time).fromNow();
		},
		toUcenter(id) {
			uni.navigateTo({
				url: '/pages/user/user?userId=' + id
			});
		},
		onActive(post, index) {
			this.showAction = true;
			this.choosePost = post;
			this.chooseIndex = index;

			this.actionList = [];
			if (post.userInfo.id !== this.userInfo.id) {
				// 添加关注按钮
				this.actionList.push({
					name: post.isFollow ? '取消关注' : '关注TA',
					key: 'follow'
				});

				// 添加收藏按钮
				this.actionList.push({
					name: post.hasFavour ? '取消收藏' : '收藏',
					key: 'favour'
				});
			} else {
				this.actionList.push({
					name: '编辑',
					key: 'update'
				});
				this.actionList.push({
					name: '删除',
					color: 'red',
					key: 'delete'
				});
			}
			if (store.isTopicAdmin) {
				this.actionList.unshift({
					name: post.isTop ? '取消置顶' : '置顶',
					key: post.isTop ? 'cancel_topic' : 'topic'
				});
			}
			this.$refs.actionSheet.open();
		},
		async onFollow() {
			const res = await _follow({ followeeId: this.choosePost.userInfo.id });
			uni.showToast({icon:'none',title: res.data ? '已关注！' : '已取关！'});
			this.list.forEach(item=>{
				if(item.userInfo.id===this.choosePost.userInfo.id){
					item.isFollow = res.data;
				}
			})
		},
		async onFavour() {
			const res = await _favourAdd({ postId: this.choosePost.postId });
			uni.showToast({icon:'none',title: res.data ? '收藏成功！' : '取消收藏'});
			this.choosePost.hasFavour = res.data;
		},
		async postDel() {
			const res = await _postDel({ postId: this.choosePost.postId });
			uni.showToast({icon:'none',title: "删除成功"});
			this.list.splice(this.chooseIndex, 1);
		},
		async actionSelect(e) {
			let key = e.key;

			if (key === 'follow') {
				await this.onFollow();
			}
			if (key === 'favour') {
				await this.onFavour();
			}
			if (key == 'delete') {
				await this.postDel();
			}
			if (key == 'update') {
				uni.navigateTo({
					url: '/pages/post/add?postId=' + this.choosePost.postId
				});
			}
			if (key === 'topic') {
				const json = {
					postId: this.choosePost.postId,
					topic_id: store.topic_info.id
				};
				await _addTop(json);
				uni.showToast({icon:'none',title: "置顶成功"});
				this.choosePost.isTop = 1
			}
			if (key === 'cancel_topic') {
				await _deleteTop(store.topic_info.id, this.choosePost.postId);
				uni.showToast({icon:'none',title: "取消置顶成功"});
				this.choosePost.isTop = 0
			}
			this.$emit('selectAction', e);
		},
		previewImage(url, urls) {
			let imgList = [];
			urls.forEach((item) => {
				imgList.push(this.$utils.imgPath(item));
			});

			uni.previewImage({
				current: this.$utils.imgPath(url), // 当前显示图片的http链接
				urls: imgList // 需要预览的图片http链接列表
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.post {
	background-color: #f5f5f5;
}
.post-item {
	background: #fff;
	margin-bottom: 10rpx;
	padding: 20rpx;
	// border-bottom: 1px solid #f5f5f5;

	.post-content {
		margin-top: 20rpx;

		.img-style-1 {
			display: block;
			width: 50%;
			max-height: 600rpx;
			border-radius: 5px;
			overflow: hidden;
		}

		.img-style-2 {
			display: flex;

			image {
				margin: 5rpx;
				border-radius: 5px;
				width: 100%;
				height: 294rpx;
			}
		}

		.img-style-3 {
			display: flex;
			flex-wrap: wrap;

			image {
				width: 31.3%;
				height: 200rpx;
				margin: 1%;
				border-radius: 5px;
			}
		}
	}

	.address {
		display: inline-flex;
		font-size: 20rpx;
		background-color: #f5f5f5;
		border-radius: 20rpx;
		padding: 5rpx 20rpx;
		margin: 20rpx 0;

		.text {
			margin-left: 5rpx;
		}
	}
}

.post-item-top-user {
	display: flex;
	align-items: center;
	.tiptag{
		margin-left: 20rpx;
	}

	.avatar {
		width: 85rpx;
		height: 85rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.center {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: 24rpx;
		color: #999;

		.username {
			font-size: 32rpx;
			font-weight: 600;
			color: #616161;
		}

		.official {
			display: inline-block;
			font-size: 20rpx;
			color: #fff;
			background-color: #ffffff;
			padding: 5rpx 10rpx;
			border-radius: 10rpx;
			margin-right: 10rpx;
		}
	}

	.right {
		height: 85rpx;

		.arrow-down {
			color: #999;
		}
	}
}
.p-tags {
	display: flex;
	flex-wrap: nowrap;
	gap: 15rpx;
	&-item {
		flex-shrink: 0;
	}
}
.p-footer {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 20rpx;

	.p-item {
		margin-left: 30rpx;
		color: #616161;
		display: flex;
		align-items: center;

		.count {
			margin-left: 10rpx;
			font-size: 28rpx;
		}
	}

	.p-item[hidden] {
		display: none !important;
	}
}

.comment-wrap {
	font-size: 28rpx;
	padding-top: 20rpx;
	border-top: 1px solid #f5f5f5;

	.item {
		.name {
			color: #000;
			font-weight: 600;
		}
	}
}

.post-content-wrap {
	.discuss-item {
		display: inline-block;
		color: #2b85e4;
		margin-right: 20rpx;
	}
}
</style>
