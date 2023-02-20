<template>
	<view class="m-lr30">
		<view class="p-lr30 member-url">
			<view class="member-url-item" @tap="handleDetail">
				<view>我的业绩</view>
				<view class="detail">
					<text>详情</text>
					<text class="iconfont icon-right"></text>
				</view>
			</view>
			<view class="m-t20 member-url-item1">
				<view class="m-r10 item">
					<view>
						<text>当月总推荐</text>
						<text class="unit">（人）</text>
					</view>
					<view class="number">0</view>
				</view>
				<view class="m-r10 item">
					<view>
						<text>月总业绩</text>
						<text class="unit">（元）</text>
					</view>
					<view class="number">0</view>
				</view>
				<view class="m-r10 item1">
					<view class="iconfont icon-code"></view>
					<view class="number">我的推广码</view>
				</view>
			</view>
			<!-- <view class="member-url-item" @tap="handleOpen">
				<view>成为业务员</view>
				<view class="iconfont icon-right"></view>
			</view> -->
		</view>
	</view>
</template>

<script setup>
import { PERFORMANCE } from '@/common/path'
const emit = defineEmits(['handleOpen'])
const handleOpen = () => {
	emit('handleOpen')
}

const handleDetail = () => {
	uni.navigateTo({ url: PERFORMANCE })
}
</script>

<style lang="scss" scoped>
.member-url {
	border-radius: 10rpx;
	background-color: #fff;
	margin-top: 24rpx;
	.member-url-item {
		height: 100rpx;
		font-size: 28rpx;
		@include flex-box($justify-content: space-between);
		color: #333;
		line-height: 1000rpx;
	}
	.member-url-item1 {
		height: 100rpx;
		@include flex-box($justify-content: space-between);
		padding-bottom: 20rpx;
		// border-bottom: 1rpx solid #eee;
	}
	.detail {
		font-size: 24rpx;
		color: #999;
		.icon-right {
			vertical-align: middle;
		}
	}
	.item {
		width: 33.33%;
		font-size: 24rpx;
		border-right: 1rpx solid #eee;
		height: 100%;
		@include flex-box($flex-direction: column,$align-items: flex-start,$justify-content: inherit);
		color: #222;
		.number {
			font-size: 30rpx;
			color: #333;
		}
		.unit {
			font-size: 20rpx;
			color: #999;
		}
		&:last-child {
			border-right: none;
		}
	}
	.item1 {
		font-size: 24rpx;
		color: #333;
		@include flex-box($flex-direction: column);
		.icon-code {
			font-size: 50rpx;
			color: #C4C4C4;
		}
	}
}
</style>