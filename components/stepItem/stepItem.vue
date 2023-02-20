<template>
	<view class="p-lr30 list-item" v-if="type == 0">
		<view class="p-b40 step-title">
			<view class="p-lr30">
				<view>{{ item.posts.title }}</view>
				<view class="step-desc">{{ item.posts.job_address }} | {{ item.posts.classify_text }}</view>
			</view>
			<view class="step-see" v-if="item.audit_status == 'succeed'" @tap="seeMsg(item)">查看留言</view>
			<!-- <view class="step-time" v-if="type == 1">
				<text class="m-r5">{{ item.posts.salary_figure }}</text>
				<text class="price">{{ item.posts.salary_type_text }}</text>
			</view> -->
		</view>
		<view :class="['step-opera', item.audit_status == 'succeed' ? 'active' : item.audit_status == 'underway' ? 'active1' : 'active2']">
			<view class="p-lr30">{{ findTypeName(posts_type, item.audit_status) }}</view>
			<view class="step-opera-text">报名时间：{{ item.deliver_at_text }}</view>
			<!-- <view class="step-opera-btn" v-if="type == 1">
				<view class="m-r13 opera-btn" @tap="mod">修改</view>
			</view> -->
		</view>
	</view>
	
	<view class="p-lr30 list-item" v-if="type == 1">
		<view class="p-b40 step-title">
			<view class="p-lr30">
				<view>{{ item.title }}</view>
				<view class="step-desc">{{ item.job_address }} | {{ item.classify_text }}</view>
			</view>
			<view class="step-time">
				<text class="m-r5">{{ item.salary_figure }}</text>
				<text class="price">{{ item.salary_type_text }}</text>
			</view>
		</view>
		<view :class="['step-opera', item.audit_status == 'succeed' ? 'active' : item.audit_status == 'underway' ? 'active1' : 'active2']">
			<view class="p-lr30">{{ findTypeName(posts_type, item.audit_status) }}</view>
			<view class="step-opera-btn" v-if="['succeed', 'failure'].indexOf(item.audit_status) != -1">
				<view class="m-r13 opera-btn active1" @tap="mod(item.id)">修改</view>
				<view class="m-r13 opera-btn active3" v-if="item.audit_status == 'succeed'" @tap='offTap(item.id)'>下架</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { MSG_DETAIL } from '@/common/path'
import { posts_type_1, posts_type } from '@/utils/emnu'
import { findTypeName } from '@/utils/index'

/**
 * type: 表示从哪个页面进来，显示不同的内容
 * 0   应聘记录
 * 1   我要招人/我的招聘
 * succeed  被录取可以查看留言
 * */
// const myList = posts_type
const { type, item } = defineProps({ type: Number, item: Object })
const emits = defineEmits(['modify', 'off'])
const mod = (id) => emits('modify', id)
const offTap = id => emits('off', id)

// const filterType = (audit_status) => {
// 	return audit_status == 'succeed' && '被录取'
// 		   || audit_status == 'underway' && '已报名'
// 		   || audit_status == 'failure' && '被拒绝'
// }


const seeMsg = (item) => {
	const data = {
		hr_phone: item.hr_phone,
		hr_wechat: item.hr_wechat,
		remark: item.remark,
		company: [{...item.company, ...item.posts}]
	}
	uni.navigateTo({
		url: `${MSG_DETAIL}?param=${JSON.stringify(data)}`
	})
}
</script>

<style lang="scss" scoped>
.list-item {
	height: 225rpx;
	border-bottom: 10rpx solid #F4F6F5;
	@include flex-box($flex-direction: column, $align-items: flex-start);
	position: relative;
	.step-title {
		position: relative;
		width: 100%;
		font-size: 32rpx;
		border-left: 1rpx solid #eee;
		@include flex-box($justify-content: space-between);
		color: #333;
		
		&::after {
			position: absolute;
			left: -8rpx;
			top: 0;
			content: '';
			width: 14rpx;
			height: 14rpx;
			border-radius: 50%;
			background-color: #ccc;
			box-shadow: 0rpx 0rpx 5rpx 5rpx #eee;
			border: 1rpx solid #eee;
		}
		
		.step-desc {
			font-size: 24rpx;
			padding-top: 12rpx;
			color: #666;
		}
		.step-see {
			padding: 4rpx 14rpx;
			font-size: 28rpx;
			border: 1rpx solid $public-color;
			border-radius: 4rpx;
			color: $public-color;
		}
		.step-time {
			font-size: 36rpx;
			color: $public-color;
			.price {
				font-size: 24rpx;
				vertical-align: middle;
			}
		}
	}
	.step-opera {
		position: relative;
		width: 100%;
		font-size: 28rpx;
		@include flex-box($justify-content: space-between);
		color: #5CB0F1;
		
		&::after {
			position: absolute;
			left: -8rpx;
			top: 0;
			content: '';
			width: 14rpx;
			height: 14rpx;
			border-radius: 50%;
		}
		
		&-text {
			color: #999;
		}
		
		&.active {
			&::after {
				background-color: #5CB0F1;
				box-shadow: 0rpx 0rpx 5rpx 5rpx rgba(92, 176, 241, .2);
				border: 1rpx solid #5CB0F1;
			}
			&-text {
				color: #999;
			}
		}
		&.active1 {
			color: $public-color;
			&::after {
				background-color: $public-color;
				box-shadow: 0rpx 0rpx 5rpx 5rpx rgba(207, 244, 231, 1);
				border: 1rpx solid $public-color;
			}
		}
		&.active2 {
			color: #FF552E;
			&::after {
				background-color: #FF552E;
				box-shadow: 0rpx 0rpx 5rpx 5rpx rgba(255, 230, 224, 1);
				border: 1rpx solid #FF552E;
			}
		}
		.step-opera-btn {
			@include flex-box($justify-content: space-between);
			.opera-btn {
				font-size: 24rpx;
				text-align: center;
				border-radius: 200rpx;
				border: 1rpx solid #ddd;
				padding: 8rpx 16rpx;
				color: #666;
				&.active1 {
					border-color: #5CB0F1;
					background-color: #5CB0F1;
					color: #fff;
				}
				&.active2 {
					border-color: $public-color;
					background-color: $public-color;
					color: #fff;
				}
				&.active3	 {
					border-color: #FF552E;
					background-color: #FF552E;
					color: #fff;
				}
			}
		}
	}
}
</style>