<template>
	<view>
		<uv-empty mode="permission" :text="text"></uv-empty>
	</view>
</template>

<script>
export default {
	data() {
		return {
			text: ''
		};
	},
	onLoad(options) {
		const { text = '被拒绝了请求' } = options;
		this.text = text;
	}
};
</script>

<style lang="scss"></style>
