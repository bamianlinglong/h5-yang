<template>
	<view class="m-lr30">
		<view class="p-b40 info-box">
			<view class="info-avatar">
				<image :src="detail.avatar_image_text"></image>
				<view class='m-t20 vip'>
					<text class="m-r10">月度会员</text>
					<text>信用分:100</text>
				</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">简历标题</view>
				<view class="info-right">{{ detail.title }}</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">性别</view>
				<view class="info-right">{{ detail.sex_text }}</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">身高</view>
				<view class="info-right">{{ detail.height }}cm</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">出生年月</view>
				<view class="info-right">{{ detail.birthday }}</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">现住地址</view>
				<view class="info-right">{{ detail.home_place_redundancy }}</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">求职类型</view>
				<view class="info-right">{{ detail.posts_ids_redundancy }}</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">期望薪资</view>
				<view class="info-right">{{ detail.salary_figure }}{{ detail.salary_type_text }}</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">手机号码</view>
				<view class="info-right">{{ detail.phone }}</view>
			</view>
			<!-- <view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">微信号</view>
				<view class="info-right">ycs7251</view>
			</view> -->
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">是否展示简历</view>
				<view class="info-right">{{ detail.status == 'normal' ? '展示' : '隐藏' }}</view>
			</view>
			<view class="p-lr30 m-t40 info info1">
				<view class="m-r10 info-left">个人简介</view>
				<view class="p-t20 info-right">{{ detail.oneself_describe }}</view>
			</view>
			<view class="p-lr30 m-t40 info info1">
				<view class="m-r10 m-b20 info-left">照片上传</view>
				<Uploader :disabled='true' :deletable='false' v-model="fileList" :max-count="3" />
			</view>
		</view>
	</view>
	<view class="p-lr30 blue-btn" v-if="detail.user_id == userInfo.id">
		<view class="left">{{ detail.status == 'normal' ? '展示中' : '已隐藏' }}</view>
		<view class="right" @tap="handleDetail(detail.id)">修改简历</view>
	</view>
	<view class="p-lr30 blue-btn" v-else>
		<view class="left" @tap="refuse">拒绝</view>
		<view class="right" @tap="pass">录取</view>
	</view>
	
	<Popup v-model:show="showCenter" round closeable close-icon="close" position='bottom'>
		<view class="p-lr30">
			<view class="p-t30 p-title">联系方式</view>
			<view class="p-t10 p-desz">请填写以下信息方便求职者与您联系</view>
		</view>
		<cell-group inset>
		  <Field label="微信" v-model="user.hr_wechat" placeholder="请输入" />
		  <Field label="电话" v-model="user.hr_phone" type='tel' placeholder="请输入" />
		  <Field label="备注" v-model="user.remark" type='textarea' maxlength='20' placeholder="请输入20字以内的备注" />
		</cell-group>
		<view class="p-b40 p-t30">
			<view class="user-btn" @tap="confirmPass">确定</view>
		</view>
	</Popup>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onReachBottom } from '@dcloudio/uni-app'
import { Uploader, Popup, Icon,CellGroup, Field } from 'vant'
import { EDIT_RESUME } from '@/common/path'
import { resumeDetails, preview, refuseResume, passResume, getInfo } from '@/api/api'

const detail = ref({})
const userInfo = uni.getStorageSync('userinfo')
const fileList = ref([])
const id = ref(null)
const showCenter = ref(false)
const user = ref({})

onLoad((options) => {
	options.id ? id.value = options.id : ''
})

onShow(() => {
	id.value ? getDetails(id.value) : previewResume()
})

const getDetails = async (id) => {
	await resumeDetails({ id, type: 'resume' }).then(res => {
		fileList.value = []
		res.data.self_images_text.split(',').forEach(item => {
			fileList.value.push({ url: item })
		})
		detail.value = res.data
	})
}

// 预览自己的简历
const previewResume = async () => {
	await preview().then(res => {
		fileList.value = []
		res.data.self_images_text.split(',').forEach(item => {
			fileList.value.push({ url: item })
		})
		detail.value = res.data
	})
}

const refuse = async () => {
	await refuseResume({ id: id.value }).then(res => {
		uni.showToast({ title: '拒绝成功', icon: 'none', mask: true })
		getDetails(id.value)
	})
}

const getUserInfo = async () => {
	await getInfo().then(res => {
		
	})
}

const pass = () => {
	showCenter.value = true
}

const confirmPass = async () => {
	const param = { 
		id: detail.value.id,
		...user.value
	}
	await passResume(param).then(res => {
		showCenter.value = false
		user.value = {}
		getDetails(detail.value.id)
	}).catch(() => {
		showCenter.value = false
		user.value = {}
	})
}

const handleDetail = (id) => {
	uni.navigateTo({ url: `${EDIT_RESUME}?id=${id}` })
}
</script>

<style lang="scss" scoped>
page {
	background-color: #F4F6F8;
}
.info-box {
	margin-top: 94rpx;
	background-color: #fff;
	border-radius: 10rpx;
	.info-avatar {
		width: 100%;
		height: 152rpx;
		border-radius: 50%;
		text-align: center;
		image {
			width: 152rpx;
			height: 100%;
			margin-top: -65rpx;
		}
		.vip {
			font-size: 20rpx;
			color: #BE6916;
			text {
				border: 1rpx solid #BE6916;
				border-radius: 10rpx;
				padding: 4rpx 10rpx;
			}
		}
	}
}
.info {
	font-size: 28rpx;
	@include flex-box($justify-content: flex-start);
	color: #333;
	&.info1 {
		@include flex-box($flex-direction: column,$align-items: flex-start,$justify-content: flex-end);
	}
	.info-left {
		width: 180rpx;
		flex-shrink: 0;
	}
	.info-right {
		color: #666;
		&.upload {
			width: 160rpx;
			height: 100rpx;
			font-size: 24rpx;
			text-align: center;
			line-height: 100rpx;
			border: 1rpx solid #E7EAF0;
			background-color: #F4F6F8;
			color: #99A6B6;
		}
	}
}
.p-title {
	font-size: 36rpx;
	color: #333;
}
.p-desz {
	font-size: 24rpx;
	color: #999;
}
.user-btn {
	width: 480rpx;
	height: 88rpx;
	font-size: 28rpx;
	text-align: center;
	background-color: $public-color;
	border-radius: 10rpx;
	color: #fff;
	line-height: 88rpx;
	margin: 0 auto;
}
:deep(.van-cell) {
	padding-left: 0;
	padding-right: 0;
}
</style>