<template>
	<view class="userinfo">
		<view class="field">
			<text>头像</text>
			<view class="avatar">
				<button class="btn-avatar uv-reset-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<uv-image class="avatar" :src="$utils.imgPath(form.avatar)" shape="circle" width="55px" height="55px" mode="scaleToFill"></uv-image>
				</button>
			</view>
		</view>
		<div class="field">
			<text>昵称</text>
			<view class="field-b">
				<input :value="form.nickname" class="input" placeholder="请输入昵称" disabled @click="showModal('nickname', '昵称')" />
				<uv-icon color="#afafaf" name="arrow-right" size="18"></uv-icon>
			</view>
		</div>
		<div class="field">
			<text>性别</text>
			<view class="field-b" @click="showSexSelect">
				<input :value="form.sex == 0 ? '保密' : form.sex == 1 ? '男' : '女'" class="input" disabled placeholder="请选择性别" />
				<uv-icon color="#afafaf" name="arrow-right" size="18"></uv-icon>
			</view>
		</div>
		<div class="field">
			<text>年龄</text>
			<view class="field-b">
				<input :value="form.age" class="input" type="number" placeholder="请输入年龄" @blur="ageSelect" />
				<uv-icon color="#afafaf" name="arrow-right" size="18"></uv-icon>
			</view>
		</div>
		<div class="field">
			<text>手机号</text>
			<view class="field-b">
				<button class="uv-reset-button input" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
					<text v-if="form.mobile">{{ form.mobile }}</text>
					<text v-else>授权手机号</text>
				</button>
				<uv-icon color="#afafaf" name="arrow-right" size="18"></uv-icon>
			</view>
		</div>
		<div class="field">
			<text>简介</text>
			<view class="field-b">
				<input :value="form.brief" class="input" placeholder="请填写简介" disabled @click="showModal('brief', '简介')" />
				<uv-icon color="#afafaf" name="arrow-right" size="18"></uv-icon>
			</view>
		</div>
		<uv-modal ref="modal" :title="title" @confirm="confirm">
			<uv-input placeholder="请输入内容" border="surround" v-model="value" :type="type" @blur="onChangeNickName"></uv-input>
		</uv-modal>
		<uv-action-sheet ref="sexSelect" :actions="actions" title="请选择性别" @select="sexSelect"></uv-action-sheet>
	</view>
</template>

<script>
import { getCode } from '@/utils/request';
import { _getPhoneNumber, _updateInfo,_updateAvatar } from '@/api/user';
import { _uploadPath } from '@/api/api';
import { useUserStore } from '@/stores/user.js';
const store = useUserStore();
export default {
	data() {
		return {
			form: {
				avatar: '',
				nickname: ''
			},
			type: '',
			value: '',
			title: '',
			actions: [
				{ key: 1, name: '男' },
				{ key: 2, name: '女' },
				{ key: 0, name: '保密' }
			]
		};
	},
	computed: {
		userInfo() {
			return store.userInfo;
		}
	},
	async onLoad() {
		await store.getUserInfo();
		this.form = this.userInfo;
	},
	methods: {
		showModal(type, title) {
			this.type = type;
			this.title = title;
			this.$refs.modal.open();
		},
		showSexSelect() {
			this.$refs.sexSelect.open();
		},
		async submit(field, value) {
			let res = await _updateInfo({
				[field]: value
			});
			return res;
		},
		sexSelect(e) {
			this.form.sex = e.key;
			this.submit('sex', e.key);
		},
		ageSelect(e) {
			this.submit('age', e.detail.value);
		},
		async confirm() {
			const res = await this.submit(this.type, this.value);

			if (res.code == 200) {
				this.form[this.type] = this.value;
				this.value = '';
				this.$refs.modal.close();
			}
		},
		async onChooseAvatar(e) {
			let res = await _updateAvatar(e.detail.avatarUrl);
			if (res.code == 200) {
				this.form.avatar = res.data.filePath;
			}
		},
		onChangeNickName(e) {
			// 开发者工具有bug会有问题，真机无此bug
			this.value = e;
			console.log(e);
		},
		async getPhoneNumber(e) {
			console.log(e);
			let { errMsg, encryptedData, iv } = e.detail;
			if (errMsg === 'getPhoneNumber:ok') {
				let code = await getCode();
				let res = await _getPhoneNumber({ encryptedData, iv, code });
				if (res.code === 200) {
					this.submit('mobile', res.data.phoneNumber);
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.userinfo {
	padding: 0 10rpx;
}
.field {
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
	border-bottom: 1px solid #f5f5f5;
	background-color: #ffffff;

	&-b {
		display: flex;

		.input {
			text-align: right;
			color:#afafaf;
			margin-right:10rpx;
		}
	}
}
.avatar {
}
.nickname {
}
</style>
