<template>
	<view class="p-lr30 my-top">
		<view class="my-avatar">
			<view class="avatar">
				<image class="m-r30 avatar-img" :src="userinfo.avatar"></image>
				<view>
					<view class="avatar-name">{{ userinfo.username }}</view>
					<view class="m-t20 member">
						<text class="m-r10">月度会员</text>
						<text class="m-r10">信用分:{{ userinfo.score }}</text>
					</view>
				</view>
			</view>
			<!-- <view class="iconfont icon-shezhi"></view> -->
		</view>
		<!-- <view class="p-lr20 member-box">
			<text class="m-r10 iconfont icon-member"></text>
			<text class="m-r10 icon-text">升级或购买会员和加油包，享更多权益</text>
			<text class="m-r10 icon-see">去看看</text>
		</view> -->
	</view>
	<!-- <Menu @handleOpen='handleOpen' /> -->
	<MenuItem :list='list' />
	<MenuItem :list='list1' />
	
	<uni-popup ref="popup" type="bottom">
		<view class="p40 sale-dialog">
			<view class="sale-title">
				<text>成为业务员</text>
				<text class="iconfont icon-error" @tap="closePupop"></text>
			</view>
			<view class="p-t10 sale-des">请填写以下信息，以便后台更快的进行审核</view>
		</view>
		<view class="p40">
			<uni-forms label-width='50'>
				<uni-forms-item label="姓名">
					<uni-easyinput placeholder="请输入" />
				</uni-forms-item>
				<uni-forms-item label="电话">
					<uni-easyinput placeholder="请输入" />
				</uni-forms-item>
				<uni-forms-item label="年龄">
					<uni-easyinput placeholder="请输入" />
				</uni-forms-item>
				<uni-forms-item label="经历">
					<uni-easyinput type="textarea" placeholder="简单描述您的个人经历" />
				</uni-forms-item>
				<uni-forms-item label=" ">
					<view class="form-btn" @tap="closePupop">确定</view>
				</uni-forms-item>
			</uni-forms>
		</view>
	</uni-popup>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import MenuItem from './components/menuItem'
import Menu from './components/menu'
import { 
	MESSAGE, 
	FEEDBACK, 
	EVALUATE_RECORD, 
	EMPLOYMENT_RECORD, 
	MY_RESUME_LIST,
	MY_RESUME, 
	WANT_RECRUITMENT, 
	RECRUITMENT,
	LOGIN
} from '@/common/path'

const userinfo = ref({})
const popup = ref(null)

const list = [
	{
		icon: '/static/icon/introduce.png',
		name: '我的简历',
		url: MY_RESUME
	}, {
		icon: '/static/icon/record.png',
		name: '应聘记录',
		url: EMPLOYMENT_RECORD
	}, {
		icon: '/static/icon/task.png',
		name: '查看简历',
		url: MY_RESUME_LIST
	},
]

const list1 = [
	{
		icon: '/static/icon/recruit.png',
		name: '我要招人',
		url: WANT_RECRUITMENT
	},{
		icon: '/static/icon/recruit.png',
		name: '我的招聘',
		url: RECRUITMENT
	},{
		icon: '/static/icon/recruit.png',
		name: '评价记录',
		url: EVALUATE_RECORD
	},{
		icon: '/static/icon/recruit.png',
		name: '退出登录',
		url: 'logout'
	}
]


onShow(() => {
	userinfo.value = uni.getStorageSync('userinfo')
	if (!userinfo.value) {
		uni.showToast({
			title: '请先登录获取用户信息',
			mask: true,
			icon: 'none'
		})
		setTimeout(() => {
			uni.navigateTo({ url: LOGIN })
		}, 1500)
		return
	}
})

const handleOpen = () => {
	// console.log('dsadad')
	popup.value.open()
}

const closePupop = () => {
	popup.value.close()
}
</script>

<style lang="scss" scoped>
page {
	background-color: #F4F6F8;
}
.my-top {
	height: 246rpx;
	@include flex-box($flex-direction: column,$align-items: flex-start);
	background-color: $public-color;
	.my-avatar {
		width: 100%;
		@include flex-box($justify-content: space-between);
		.avatar-img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
		.avatar {
			@include flex-box($justify-content: flex-start);
			.avatar-name {
				font-size: 36rpx;
				color: #fff;
			}
			.member {
				font-size: 24rpx;
				color: #BE6916;
				text {
					border: 1rpx solid #BE6916;
					border-radius: 10rpx;
					padding: 2rpx 8rpx;
					background-color: #fff;
				}
			}
		}
		.icon-shezhi {
			font-size: 40rpx;
			color: #fff;
		}
	}
	.member-box {
		width: 100%;
		height: 100rpx;
		margin-top: 50rpx;
		border-radius: 10rpx 10rpx 0 0;
		background: linear-gradient(90deg, #5B5B5B 0%, #2B2B2B 100%);
		color: #F0DCB9;
		box-sizing: border-box;
		.icon-member {
			font-size: 46rpx;
			color: #E8C894;
			line-height: 100rpx;
		}
		.icon-text {
			font-size: 26rpx;
		}
		.icon-see {
			font-size: 24rpx;
			padding: 10rpx 22rpx;
			border-radius: 100rpx;
			color: #2C2C2C;
			background-color: #F0DCB9;
		}
	}
}
:deep(.uni-popup__wrapper) {
	background-color: #fff !important;
	padding-bottom: calc(80rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(80rpx + env(safe-area-inset-bottom));
}
.sale-dialog {
	border-radius: 10rpx 10rpx 0 0;
	background-color: #fff;
	.sale-title {
		font-size: 36rpx;
		@include flex-box($justify-content: space-between);
		color: #333;
		.icon-error {
			font-size: 40rpx;
			color: #313233;
		}
	}
	.sale-des {
		font-size: 24rpx;
		color: #999;
	}
}
.form-btn {
	width: 100%;
	height: 80rpx;
	font-size: 30rpx;
	text-align: center;
	border-radius: 10rpx;
	color: #fff;
	background-color: $public-color;
	line-height: 80rpx;
}
</style>