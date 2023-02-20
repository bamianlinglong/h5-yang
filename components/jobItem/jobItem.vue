<template>
	<view class="index-list">
		<view class="p-lr30 p-t30 index-list-item" 
			  v-for='item in list'
			  :key="item.id"
			  @click="goJobDetail(item.id)"
		>
			<view class="item-top">
				<view class="item-top-left">
					<view class="m-r10">{{ item.title }}</view>
					<view class="m-r10 tips" v-if="item.is_hot">热门</view>
					<view class="m-r10 tips" v-if="item.is_index">首页</view>
					<view class="m-r10 tips" v-if="item.is_recommend">推荐</view>
					<view :class="['m-r10 tips', { 'tips-1': item.type_text }]" v-if="item.type_text">{{ item.type_text }}</view>
				</view>
				<view class="item-date">{{ item.salary_figure }}{{ item.salary_type_text }}</view>
			</view>
			<view class="m-t20 item-time">
				<view class="m-r10 item-time-item" v-if="item.job_time">{{ item.job_time }}</view>
				<view class="m-r10 item-time-item" v-if="item.job_classify">{{ item.job_classify }}</view>
			</view>
			<view class="m-t30 item-company">
				<view class="item-company-left">
					<image v-if="item.company_info" :src="baseUrl + item.company_info.logo_image"></image>
					<image v-else :src="item.logo_image_text"></image>
					<view class="p-lr20 item-text">
						<view>{{ item.company_info ? item.company_info.title : item.title }}</view>
						<view class="m-t10 item-text-fen" v-if='item.company_info'>信用分:{{ item.company_info.score }}</view>
					</view>
				</view>
				<view class="item-compay-right item-text">
					<view>
						<text class="iconfont icon-address m-r5"></text>
						<text>{{ item.job_address }}</text>
					</view>
					<view class="m-t10 item-text-fen" v-if="item.distance">{{ formatKm(item.distance) }}</view>
				</view>
			</view>
		</view>
	</view>
	<noMore v-if="showMore"></noMore>
</template>

<script setup>
import { baseUrl } from '@/utils/config'
import { formatKm } from '@/utils/index'
import { JOB_DETAIL } from '@/common/path'
const props = defineProps({
	list: {
		type: Array,
		default: []
	},
	showMore: {
		type: Boolean,
		default: false
	}
})

const imgUrl = baseUrl
const goJobDetail = id => {
	uni.navigateTo({ url: JOB_DETAIL + '?id=' + id })
}
</script>

<style lang="scss" scoped>
.index-list {
	&-item {
		height: 233rpx;
		border-bottom: 1rpx solid #F8F8F8;
		.item-top {
			@include flex-box($justify-content: space-between);
		}
		.item-top-left {
			font-size: 32rpx;
			color: #333;
			@include flex-box($justify-content: space-between);
		}
		.item-date {
			font-size: 28rpx;
			color: #2CC998;
		}
		.item-time {
			@include flex-box($justify-content: flex-start);
		}
		.item-time-item {
			font-size: 24rpx;
			color: #333;
			background-color: #F8F8F8;
			padding: 6rpx 8rpx;
			border-radius: 4rpx;
		}
		.item-company {
			@include flex-box($justify-content: space-between);
			.item-company-left {
				@include flex-box($justify-content: space-between);
				image {
					width: 64rpx;
					height: 64rpx;
				}
			}
		}
		.item-text {
			font-size: 24rpx;
			color: #666;
			.item-text-fen {
				font-size: 20rpx;
			}
		}
		.item-compay-right {
			text-align: right;
			.icon-address {
				vertical-align: text-bottom;
			}
		}
	}
}
</style>