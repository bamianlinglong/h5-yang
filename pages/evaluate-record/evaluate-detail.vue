<template>
	<view class="m-lr30">
		<view class="info-top">
			<image class="m-r16 info-top-img" src="/static/icon/icon_boy.png"></image>
			<view class="info-top-text">
				<view>活动策划</view>
				<view class="info-top-time">2020年8月1日报名</view>
			</view>
		</view>
		<view class="m-t40">
			<view class="m-t10 info-title">请为该职位进行评分</view>
			<view class="m-t30 info-start" @tap="handleStart">
				<uni-rate :touchable="false" :value="5" @change="onChange" />
			</view>
		</view>
		<view class="m-t40">
			<uni-easyinput maxlength='200' type="textarea" placeholder="请写下您对这份工作的评价"></uni-easyinput>
		</view>
		<view class="form-btns">提交</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const code = ref(Number)

const onChange = event => {
	// const { index } = event.target.dataset
	// if (!index) return
	// code.value = index
}
</script>

<style lang="scss" scoped>
.info-top {
	height: 116rpx;
	border-bottom: 1rpx solid #eee;
	@include flex-box($justify-content: flex-start);
	&-img {
		width: 88rpx;
		height: 88rpx;
	}
	&-text {
		font-size: 32rpx;
		color: #444;
	}
	&-time {
		font-size: 24rpx;
		color: #999;
		line-height: 50rpx;
	}
}
.info-title {
	font-size: 30rpx;
	color: #444;
}
.info-start {
	@include flex-box($justify-content: flex-start);
	.icon-collect_full {
		font-size: 48rpx;
		color: #CCC;
		&.active {
			color: #FBCB4A;
		}
	}
}
:deep(.is-input-border) {
	height: 300rpx;
	background-color: #F4F6F8 !important;
}
:deep(.uni-easyinput__content-textarea) {
	height: 270rpx;
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