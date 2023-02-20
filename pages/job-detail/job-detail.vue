<template>
	<view>
		<view class="p-lr30" style="background-color: #fff;">
			<view class="job-avatar">
				<view class="m-r13 avatar">
					<image :src="company.logo_image_text"></image>
				</view>
				<view class="job-avatar-center">
					<view class="name">
						<view class="name-display">
							<view class="m-r10">{{ posts.title }}</view>
							<view class="tips tips-1">{{ posts.type_text }}</view>
						</view>
						<view>
							<text class="name-price">{{ posts.salary_figure }}</text>
							<text class="name-text">{{ posts.salary_type_text }}</text>
						</view>
					</view>
					<view class="m-t10 name-desc">{{ posts.job_address }} | {{ posts.title }}</view>
					<view class="m-t10 name-time">{{ posts.job_time }}</view>
				</view>
			</view>
		</view>
		<view class="job-number">
			<view class="job-number-item">
				<view>{{ statistics.collection }}</view>
				<view class="m-t10 item-num">招聘人数</view>
			</view>
			<view class="job-number-item">
				<view>{{ statistics.apply }}</view>
				<view class="m-t10 item-num">已报名</view>
			</view>
			<view class="job-number-item">
				<view>{{ statistics.view }}</view>
				<view class="m-t10 item-num">浏览量</view>
			</view>
		</view>
		<view class="m-t10 p-t10">
			<view class="p-lr30 job-tab" @tap="handleTap">
				<view :class="['job-tab-item', { 'active': code == 0 }]" :data-index='0'>招聘详情</view>
				<view :class="['job-tab-item', { 'active': code == 1 }]" :data-index='1'>职后评价{{ total > 0 ? `（${total}条）` : '' }}</view>
			</view>
		</view>
		<!-- 招聘详情 -->
		<view v-if="code == 0">
			<view class="job-detail">
				<view class="p-lr30 p-t20">
					<view class="title">工作内容</view>
					<view>{{ posts.job_details }}</view>
				</view>
				<view class="p-lr30 p-t20">
					<view class="title">应聘要求</view>
					<view>{{ posts.job_require }}</view>
				</view>
				<view class="p-lr30 p-t20">
					<view class="title title-1">工作时间</view>
					<view>{{ posts.job_time }}</view>
				</view>
				<view class="p-lr30 p-t20 disclaimer">
					<view>
						<text class="m-r10 iconfont icon-jinggao"></text>
						<text class="disclaimer-title">免责声明</text>
					</view>
					<view class="m-t20 p-lr20 disclaimer-content">
						<view>1.本平台为招聘及求职信息发布平台，信息的准确性，完整性，合法性或真实性引起的任何损失均由提供材料者独立承担法律责任；</view>
						<view>2.若商家线下要求收取任何费用的现象均有诈骗嫌疑，请广大应聘者小心谨慎；造成经济损失，本小程序平台概不负责；</view>
						<view>3.工作过程中，请您注意人身安全，保管好自己的财物。祝工作愉快！</view>
					</view>
				</view>
				<view class="p-lr30 p-t30">
					<view class="title title-2">
						<view>工作地址</view>
						<view class="map">点我导航</view>
					</view>
					<view class="p-t20">
						<!-- <map style="width: 100%; height: 300rpx;" 
							 :latitude="posts.job_place_lat" 
							 :longitude="posts.job_place_lon"
							 :markers='covers'
						></map> -->
					</view>
				</view>
				<view class="p-lr30 p-t30">
					<view class="title title-1">招聘方</view>
					<view class="job-company">
						<image class="m-r16 company-image" :src="company.logo_image_text"></image>
						<view class="company-name">
							<view>{{ company.title }}</view>
							<view class="m-t10 company-tips">
								<view class="company-tips-item m-r10" v-if="company.vip_level">年度会员</view>
								<view class="company-tips-item m-r10" v-if="company.is_autonym">实名认证</view>
								<view class="company-tips-item m-r10" v-if="company.score">{{ '信用分' + company.score }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 职后评价 -->
		<view class="p-lr30 job-evaluation" v-else>
			<view class="job-evaluation-item" v-for="item in evaluateList" :key="item.id">
				<view class="item-top">
					<image class="m-r16 item-img" :src="item.user.avatar"></image>
					<view style="flex: 1;">
						<view class="item-name">{{ item.user.nickname }}</view>
						<view class="p-t10 item-time">
							<text>信用分：{{ item.user.score }}</text>
							<text>{{ item.time }}</text>
						</view>
					</view>
				</view>
				<view class="m-t10 item-bottom">{{ item.details }}</view>
			</view>
		</view>
		<empty v-if="evaluateList.length == 0"></empty>
		
		<view class="p-lr30 job-bottom">
			<view style="text-align: center;" @tap="collectPotos">
				<view :class="['iconfont', !details.is_collect ? 'icon-collect' : 'icon-collect_full']"></view>
				<text class="p-t10">收藏</text>
			</view>
			<view style="text-align: center;">
				<view class="iconfont icon-share"></view>
				<text class="p-t10">分享</text>
			</view>
			<view class="job-btn" @tap="upDriver">{{ details.is_deliver ? '已报名' : '立即报名' }}</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { getPotosDetail, getEvaluate, setCollect, deliverName } from '@/api/api'
import { formatTime } from '@/utils/index'
import { showConfirmDialog } from 'vant'

const covers = ref([])
const id = ref(null)
const details = ref({})
const company = ref({})
const posts = ref({})
const statistics = ref({})
const code = ref(0)
const page = ref(1)
const evaluateList = ref([])
const last_page = ref(1)
const total = ref(0)

onLoad((options) => {
	id.value = options.id
	getDetail()
})

const getDetail = async () => {
	await getPotosDetail({ id: id.value }).then(res => {
		details.value = res.data
		company.value = res.data.company
		posts.value = res.data.posts
		statistics.value = res.data.statistics
		covers.value = [{ latitude: statistics.job_place_lat, longitude: statistics.job_place_lon }]
	})
}

// 评价列表
const getList = async () => {
	const data = { page: page.value, posts_id: id.value, limit: 10 }
	await getEvaluate(data).then(res => {
		res.data.data.forEach(item => {
			item.time = formatTime(item.evaluate_at, 'mm-dd hh:mm')
		})
		if (data.page == 1) evaluateList.value = res.data.data
		else evaluateList.value = evaluateList.value.concat(res.data.data)
		if (data.page == res.data.last_page) last_page.value = data.page
		total.value = res.data.total
	})
}

// 取消、收藏职位
const collectPotos = async () => {
	await setCollect({ id: id.value }).then(res => {
		getDetail()
		uni.showToast({
			title: !details.value.is_collect ? '收藏成功' : '已取消收藏',
			mask: true,
			icon: 'none'
		})
	})
}

// 投递职位
const upDriver = async () => {
	if (details.value.is_deliver) return
	showConfirmDialog({
		title: '报名不可取消',
		message: '您是否已确认好报名该职位？',
		confirmButtonText: '报名',
		cancelButtonText: '再看看'
	}).then(async () => {
		await deliverName({ id: id.value }).then(res => {
			uni.showToast({ title: '报名成功', icon: 'none', mask: true })
			getDetail()
		})
	})
}

const handleTap = event => {
	const { index } = event.target.dataset
	code.value = index
	if (index == 1) getList()
}

onReachBottom(() => {
	page.value = page.value + 1
	if (page.value > last_page.value) return
	getList()
})
</script>

<style lang="scss" scoped>
page {
	background-color: #F4F6F8;
	padding-bottom: 98rpx;
}
.job-avatar {
	height: 205rpx;
	border-bottom: 1rpx solid #eee;
	@include flex-box($justify-content: flex-start);
	.avatar {
		width: 131rpx;
		height: 131rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	&-center {
		flex: 1;
		.name {
			font-size: 36rpx;
			@include flex-box($justify-content: space-between);
			color: #333;
			&-display {
				@include flex-box($justify-content: flex-start);
			}
		}
		.name-desc {
			font-size: 28rpx;
			color: #666;
		}
		.name-time {
			font-size: 24rpx;
			color: #999;
		}
		.name-price {
			font-size: 36rpx;
			color: $public-color;
		}
		.name-text {
			color: $public-color;
			font-size: 24rpx;
		}
	}
}
.job-number {
	height: 135rpx;
	background-color: #fff;
	@include flex-box();
	&-item {
		flex: 1;
		font-size: 30rpx;
		text-align: center;
		color: #333;
		.item-num {
			color: #666;
			font-size: 24rpx;
		}
	}
}
.job-tab {
	height: 90rpx;
	border-bottom: 1rpx solid #eee;
	background-color: #fff;
	@include flex-box($justify-content: flex-start);
	&-item {
		flex: 1;
		font-size: 30rpx;
		text-align: center;
		color: #999;
		&.active {
			position: relative;
			color: #333;
			&::before {
				content: '';
				position: absolute;
				left: 50%;
				bottom: -23rpx;
				transform: translateX(-50%);
				width: 50rpx;
				height: 4rpx;
				border-radius: 20rpx;
				background-color: $public-color;
			}
		}
	}
}
.job-detail {
	font-size: 28rpx;
	color: #666;
	line-height: 52rpx;
	background-color: #fff;
	.title {
		font-size: 30rpx;
		color: #333;
		&.title-1 {
			font-size: 32rpx;
			font-weight: 600;
			color: #222;
		}
		&.title-2 {
			@include flex-box($justify-content: space-between);
			.map {
				color: $public-color;
			}
		}
	}
}
.disclaimer {
	font-size: 24rpx;
	color: #F03737;
	.icon-jinggao {
		font-size: 34rpx;
	}
	.disclaimer-title {
		font-size: 30rpx;
	}
	.disclaimer-content {
		line-height: 42rpx;
		border: 1rpx solid #F03737;
	}
}
.job-company {
	@include flex-box($justify-content: flex-start);
	.company-image {
		width: 120rpx;
		height: 120rpx;
	}
	.company-name {
		color: #333;
		font-size: 30rpx;
	}
	.company-tips {
		font-size: 20rpx;
		color: #666;
		@include flex-box($justify-content: flex-start);
		&-item {
			height: 30rpx;
			padding: 0 5rpx;
			border: 1rpx solid #666;
			border-radius: 4rpx;
			line-height: 30rpx;
		}
	}
}
.job-bottom {
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	height: 98rpx;
	font-size: 20rpx;
	border-top: 1rpx solid #E9EBF1;
	color: #333;
	background-color: #fff;
	@include flex-box($justify-content: space-between);
	.icon-collect, .icon-collect_full {
		font-size: 46rpx;
	}
	.icon-collect_full {
		color: #FFAA00;
	}
	.icon-share {
		font-size: 38rpx;
	}
	.job-btn {
		width: 500rpx;
		height: 72rpx;
		font-size: 30rpx;
		text-align: center;
		border-radius: 10rpx;
		color: #fff;
		background-color: $public-color;
		line-height: 72rpx;
	}
}
.job-evaluation {
	background-color: #fff;
	&-item {
		flex: 1;
		min-height: 265rpx;
		border-bottom: 1rpx solid #eee;
		@include flex-box($flex-direction: column, $align-items: inherit);
		.item-top {
			@include flex-box($justify-content: flex-start);
			.item-img {
				width: 80rpx;
				height: 80rpx;
			}
			.item-name {
				font-size: 32rpx;
				color: #333;
			}
			.item-time {
				font-size: 24rpx;
				color: #666;
				@include flex-box($justify-content: space-between);
			}
		}
		.item-bottom {
			font-size: 28rpx;
			color: #666;
			line-height: 42rpx;
		}
	}
}
</style>