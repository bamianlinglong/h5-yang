<template>
	<view :class="['m-b20 evaluate-top', { 'top': index == 1 }]" @tap="handleTap">
		<view class='top-item active' :data-index='0'>我的评价</view>
		<view class="top-item" :data-index='1'>对我的评价</view>
	</view>
	<view class="m-lr30 list-item" @tap="handleLink(item)" v-for="item in list" :key="item.id">
		<view class="left">
			<view class="left">
				<image class="m-r16 item-img" src="/static/icon/icon_clock.png"></image>
				<view class="item-info">
					<view>{{ item.company.title }}</view>
					<view class="info-time">{{ index == 0 ? item.deliver_at_text + '报名' : item.evaluate_at_text }}</view>
				</view>
			</view>
			<view :class="['right', { 'right1': item.is_evaluate }]" v-if="index == 0"> {{ item.is_evaluate ? '已评价' : '去评价'}} </view>
		</view>
		<view class="p-t10 p-b20 item-content">{{ index == 0 ? item.candidate_evaluate_info.details : item.details }}</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { EVALUATE_DETAIL } from '@/common/path'
import { meList, toMeList } from '@/api/api'

const index = ref(0)
const list = ref([])
const page = ref(1)
const last_page = ref(1)

onLoad(() => {
	getMeList()
})

const handleTap = event => {
	page.value = 1
	index.value = event.target.dataset.index
	index.value == 0 ? getMeList() : getToMeList()
}

const getMeList = async () => {
	await meList({ page: page.value, limit: 10, type: 'all' }).then(res => {
		uni.stopPullDownRefresh()
		if (page.value == 1) list.value = res.data.data
		else list.value = list.value.concat(res.data.data)
		res.data.last_page = page.value
	})
}

const getToMeList = async () => {
	await toMeList({ page: page.value, limit: 10, type: 'all' }).then(res => {
		uni.stopPullDownRefresh()
		if (page.value == 1) list.value = res.data.data
		else list.value = list.value.concat(res.data.data)
		res.data.last_page = page.value
	})
}

const handleLink = (item) => {
	if (item.is_evaluate) return
	uni.navigateTo({ url: EVALUATE_DETAIL })
}

onPullDownRefresh(() => {
	page.value = 1
	index.value == 0 ? getMeList() : getToMeList()
})

onReachBottom(() => {
	page.value = page.value + 1
	if (page.value > last_page.value) return
	index.value == 0 ? getMeList() : getToMeList()
})
</script>

<style lang="scss" scoped>
.evaluate-top {
	position: relative;
	height: 100rpx;
	font-size: 30rpx;
	color: #666;
	border-bottom: 1rpx solid #eee;
	@include flex-box($justify-content: space-between);
	
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 23%;
		transform: translateX(calc(-23%));
		width: 50rpx;
		height: 5rpx;
		background-color: $public-color;
		border-radius: 10rpx;
		transition: .3s all;
	}
	&.top {
		&::after {
			left: 76%;
			transform: translateX(-76%);
		}
	}
	
	.top-item {
		flex: 1;
		text-align: center;
		&.active {
			color: #333;
		}
	}
}
.list-item {
	min-height: 148rpx;
	border-bottom: 1rpx solid #eee;
	// .display {
	// 	@include flex-box($justify-content: space-between);
	// }
	.left {
		@include flex-box($justify-content: space-between);
	}
	.item-img {
		width: 88rpx;
		height: 88rpx;
	}
	.item-info {
		font-size: 32rpx;
		color: #444;
		.info-time {
			font-size: 24rpx;
			color: #999;
			line-height: 50rpx;
		}
	}
	.right, .right1 {
		font-size: 28rpx;
		color: $public-color;
		padding: 10rpx 30rpx;
		border: 1rpx solid $public-color;
		border-radius: 100rpx;
	}
	.right1 {
		color: #FBCB4A;
		border-color: transparent;
	}
	.item-content {
		font-size: 28rpx;
		color: #666;
	}
}
</style>