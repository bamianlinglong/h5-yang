<template>
	<view class="m-lr30 p-t20 title">您已被录取！</view>
	<view class="m-lr30 p-t10 p-b40 online">请根据以下信息尽快联系招聘方</view>
	<view class="m-lr30 info-item">
		<view class="text">
			<view>微信：</view>
			<view class="wei">{{ data.hr_wechat }}</view>
		</view>
		<view class="copy" @tap="handleCopy(data.hr_wechat)">复制</view>
	</view>
	<view class="m-lr30 info-item">
		<view class="text">
			<view>电话：</view>
			<view class="wei">{{ data.hr_phone }}</view>
		</view>
		<view class="copy" @tap="handleCopy(data.hr_phone)">复制</view>
	</view>
	<view class="m-lr30 info-item">
		<view class="text">
			<view>备注：</view>
			<view class="wei">{{ data.remark }}</view>
		</view>
	</view>
	<view class="m-t40 p-lr30">
		<view class="p-t20 job">职位信息:</view>
		<view class="m-t30 job-item">
			<jobItem :list='data.company'></jobItem>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const data = ref({})

onLoad((options) => {
	data.value = JSON.parse(options.param)
})

const handleCopy = (str) => {
	uni.setClipboardData({
		data: str,
		success() {
			uni.showToast({ title: '复制成功' })
		}
	})
}
</script>

<style lang="scss" scoped>
.title {
	font-size: 40rpx;
	color: #222;
}
.online {
	font-size: 28rpx;
	color: #666;
}
.info-item {
	height: 109rpx;
	font-size: 30rpx;
	border-bottom: 1rpx solid #eee;
	@include flex-box($justify-content: space-between);
	.text {
		@include flex-box($justify-content: space-between);
	}
	.wei {
		color: #666;
	}
	.copy {
		color: $public-color;
	}
}
.job {
	font-size: 30rpx;
	color: #444;
}
.job-item {
	height: 254rpx;
	border: 1rpx solid #eee;
	border-radius: 10rpx;
}
</style>