<template>
	<uni-forms class='m-t30 p-lr30' labelPosition="top" labelWidth="200rpx">
		<uni-forms-item label="问题和意见">
			<uni-easyinput type="textarea" placeholder="请简要描述您所遇到的问题或留下宝贵的意见"></uni-easyinput>
		</uni-forms-item>
		<uni-forms-item label="联系方式">
			<uni-easyinput type="phone" placeholder="选填，便于我们与您联系"></uni-easyinput>
		</uni-forms-item>
	</uni-forms>
	<view class="form-btns">提交</view>
</template>

<script>
</script>

<style lang="scss" scoped>
:deep(.is-input-border) {
	background-color: #F4F6F8 !important;
}
.form-btns {
	position: absolute;
	bottom: 120rpx;
	left: 30rpx;
	right: 30rpx;
	height: 72rpx;
	font-size: 30rpx;
	text-align: center;
	border-radius: 10rpx;
	color: #fff;
	background-color: $public-color;
	line-height: 72rpx;
}
</style>