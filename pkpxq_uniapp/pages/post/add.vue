<template>
	<view class="container">
		<view class="t">
			<view class="title">标题</view>
			<input v-model="form.title" class="t-input" placeholder="起个标题~" />
		</view>
		<view class="c">
			<view class="title">内容</view>
			<textarea class="c-input" placeholder="说些什么叭..." :auto-height="true" maxlength="-1" v-model="form.content"></textarea>
		</view>
		<!-- 上传图片 -->
		<block v-if="form.type == 2">
			<uv-upload :fileList="fileList" name="image" :size-type="['original']" :max-count="9" multiple @afterRead="afterRead" @delete="delFile"></uv-upload>
		</block>
		<!-- 上传视频 -->
		<block v-if="form.type == 3">
			<uv-upload :fileList="fileList" name="video" accept="video" :max-count="1" multiple @afterRead="afterRead" @delete="delFile"></uv-upload>
		</block>
		<uv-line></uv-line>
		<!-- 分类 -->
		<view class="cate">
			<view class="title">选择发布的类型</view>
			<view class="cate-tag">
				<view class="cate-item" v-for="(item, index) in cateList" :key="item.cateId">
					<uv-tags
						:text="item.cateName"
						:name="item.cateId"
						shape="circle"
						:bgColor="item.checked ? '#fff' : '#F4F4F4'"
						:borderColor="item.checked ? 'var(--theme-color)' : '#F4F4F4'"
						:color="item.checked ? 'var(--theme-color)' : '#000'"
						@click="radioClick"
					></uv-tags>
				</view>
			</view>
		</view>
		<!-- 标签 -->
		<view class="tag" v-if="form.type == 1">
			<view class="title">选择标签</view>
			<uv-button v-if="form.tags.length == 0" @click="openSelectTag">选择标签</uv-button>
			<view class="p-tag">
				<view class="p-tag-item" v-for="item in form.tags" :key="item">
					<uv-tags :text="item" plain @click="openSelectTag"></uv-tags>
				</view>
			</view>
			<p-tag-select ref="tagSelect" @confirm="selectTag"></p-tag-select>
		</view>
		<view style="height: 160rpx"></view>
		<view class="footer">
			<view class="footer-left"></view>
			<view class="footer-btn">
				<uv-button @click="release" type="primary" shape="circle">{{ postId ? '编辑' : '发布' }}</uv-button>
			</view>
		</view>
	</view>
</template>

<script>
import { _getPostCategory, _getPostDetail, _postAdd, _postUpd, _postUpdGet } from '@/api/post';
import { _uploadPath, _uploadDel } from '@/api/api.js';
import { useAppStore } from '../../stores';
const store_app = useAppStore()
export default {
	data() {
		return {
			postId: null,
			form: {
				title: '',
				content: '',
				type: 2,
				cateId: '',
				media: [],
				tags:[]
			},
			cateList: [],
			fileList: [],
		};
	},
	async onLoad(options) {
		let { postId, type } = options;
		if (postId !== undefined) {
			this.postId = postId = +postId;
			uni.setNavigationBarTitle({
				title: '编辑'
			});
			const res = await _postUpdGet({
				postId
			});
			if (res.code == 200) {
				let { title, content, cateId, type, media,tags } = res.data;

				this.form = {
					...this.form,
					title,
					content,
					cateId,
					type,
					media,
					tags
				};
				this.fileList = media.map((item) => ({
					status: 'success',
					url: this.$utils.imgPath(item),
					filePath: item
				}));
			}
		}

		if (type !== undefined) {
			this.form.type = type;
		}
		this.getCate();
	},
	methods: {
		radioClick(name) {
			this.cateList.map((item, index) => {
				item.checked = item.cateId === name ? true : false;
			});
		},
		openSelectTag() {
			this.$refs.tagSelect._show();
		},
		selectTag(tags) {
			this.form.tags = tags;
		},
		async getCate() {
			const res = await _getPostCategory();
			this.cateList = res.data.map((item) => {
				item.checked = false;
				return item;
			});
			this.cateList[0].checked = true;
		},
		async afterRead(info) {
			let { file, name } = info;
			console.log(info, 'after');
			let fileStatus = file.map((item) => {
				return {
					status: 'uploading',
					url: item.url
				};
			});
			this.fileList = this.fileList.concat(fileStatus);
			for (let index in file) {
				let item = file[index];
				let res = await _uploadPath(item.url, 'post');
				if (res.code == 200) {
					this.fileList[index] = {
						status: 'success',
						url: res.data.path,
						filePath: res.data.filePath
					};
				} else {
					this.fileList[index].status = 'failed';
				}
			}
		},
		async delFile(e) {
			let { file, index } = e;
			this.fileList.splice(index, 1);
			await _uploadDel({ path: file.filePath });
		},
		async release() {
			// 处理数据
			let cate = this.cateList.find((item) => item.checked);
			this.form.cateId = cate.cateId;
			this.form.media = this.fileList.map((item) => item.filePath);
			if(!this.form.title){
				uni.showToast({
					title:'标题不能为空',
					icon:'none'
				})
				return
			}
			if(!this.form.content){
				uni.showToast({
					title:'内容不能为空',
					icon:'none'
				})
				return
			}
			
			// 请求
			if (this.postId) {
				// 编辑
				const res = await _postUpd({ ...this.form, postId: this.postId });
				if (res.code === 200) {
					uni.showToast({
						title: res.msg
					});
				}
			} else {
				// 发布
				const res = await _postAdd(this.form);
				if (res.code === 200) {
					uni.showToast({
						title: res.msg
					});
				}
			}
			
			uni.navigateBack();
			store_app.reload.home = true // 更新首页
		}
	}
};
</script>
<style lang="scss">
.uv-page__tag-item {
	margin-right: 20px;
}
</style>
<style lang="scss" scoped>
.container {
	padding: 30rpx;
	--theme-color: #{$theme-color};
}
.title {
	margin: 8rpx 0;
}
.t {
	margin-bottom: 40rpx;
	border-bottom: 1px solid #d6d7d9;
	&-input {
		padding: 20rpx 0;
	}
}
.c {
	margin-bottom: 40rpx;
	&-input {
		width: 100%;
		padding: 20rpx 0;
		min-height: 300rpx;
	}
}
.cate {
	margin-top: 20rpx;
	&-tag {
		display: flex;
		flex-wrap: wrap;
	}
	&-item {
		margin: 5rpx 10rpx;
	}
}
.tag {
	margin-top: 20rpx;
	.p-tag {
		display: flex;
		flex-wrap: wrap;
		&-item {
			margin: 5rpx 10rpx;
		}
	}
}

.footer {
	background-color: #fff;
	z-index: 99;
	position: fixed;
	left: 0;
	bottom: 0;
	height: 120rpx;
	width: 100%;
	box-shadow: 0 -2px 10px -5px rgba(0, 0, 0, 0.5);
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 40rpx;

	&-btn {
		width: 100%;
	}
}
</style>
