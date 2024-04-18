<template>
	<view>
		<uni-collapse ref="collapse" v-model="value">
			<uni-collapse-item name="phone" title="手机号">
				<Phone />
			</uni-collapse-item>
			<uni-collapse-item name="share" title="分享">
				<Share />
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import Phone from './components/Phone.vue';
import Share from './components/Share.vue';
import useShare from '@/utils/useShare.js'
const value = ref(['share']);
// 需要导入其页面的声明周期,才能生效
const {share,onShareAppMessage,onShareTimeline} = useShare()
</script>

<style lang="scss"></style>
