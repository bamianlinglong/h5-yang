<template>
	<navbar @input='handleSearch' />
	<view class="index-top"></view>
	<view class="index-img">
		<image src="/static/icon/banner.jpg"></image>
	</view>
	<view class="p-lr30 m-t40 index-tab">
		<view class="index-tab-menu" v-for="item in menuList" :key="item.code" @tap="handleMenu(item.url)">
			<image :src="item.imgurl" mode="aspectFit"></image>
			<view>{{ item.name }}</view>
		</view>
	</view>
	<view class="m-lr30">
		<scroll-view scroll-x :show-scrollbar='false' class="p-t30 index-job">
			<view class="m-r16 p-lr20 index-job-item" v-for="item in recommend" :key="item.id" @tap="handleDetail(item.id)">
				<image class="job-img" :src="item.company_info.logo_image_text"></image>
				<view>
					<view class="job-name">{{ item.company_info.title }}</view>
					<view class="job-price">
						<text>{{ item.salary_figure }}</text>
						<text class="job-data">{{ item.salary_type_text }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
	<view class="p-lr30 m-t30">
		<view class="job-tab">
			<dropdown-menu>
				<dropdown-item v-model="tab" :options="typeOptions" @change="changeMenu" />
			</dropdown-menu>
			<view class="job-tab-item" 
				  v-for="item in tabOptions" 
				  :key="item.value" 
				   @tap="handleOption(item)"
			>
				<view>{{ item.text }}</view>
				<view :class="['iconfont', { 'icon-down': item.type == 'desc', 'icon-up': item.type == 'asc' }]"></view>
			</view>
		</view>
	</view>
	<jobItem v-if="potos.length > 0" :list='potos' :showMore="!no_more"></jobItem>
	<empty v-else></empty>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad, onReachBottom, onReady } from '@dcloudio/uni-app'
import { DropdownMenu, DropdownItem } from 'vant'
import { getPotos } from '@/api/api'
import { JOB_LIST, JOB_DETAIL } from '@/common/path'
import { tabs, typeList } from '@/utils/emnu'
import { getLocalAddress } from '@/utils/index'

const potos = ref([])
const recommend = ref([])
const no_more = ref(false)
const tab = ref('')
const tabOptions = ref(tabs)
const typeOptions = typeList
const query = reactive({
	limit: 10,
	page: 1,
	flag: '',
	seek_title: '',
	lon_lat: '',
	type: '',
	order_by: {
		price: 'desc',
		distance: 'asc'
	}
})


const menuList = [
	{
		code: 1,
		name: '短期兼职',
		imgurl: '/static/icon/short.png',
		url: JOB_LIST + '?type=10'
	},{
		code: 2,
		name: '长期兼职',
		imgurl: '/static/icon/long.png',
		url: JOB_LIST + '?type=20'
	},{
		code: 3,
		name: '全职信息',
		imgurl: '/static/icon/full.png',
		url: JOB_LIST + '?type=30'
	},{
		code: 4,
		name: '我的简历',
		imgurl: '/static/icon/resume.png',
	}
]


onLoad(() => {
	getPotosList()
	getRecommend('recommend')
})

const getPotosList = async () => {
	query.flag = ''
	await getPotos(query).then(res => {
		uni.stopPullDownRefresh()
		const { data, has_more, current_page } = res.data
		if (query.page == 1) potos.value = data
		else potos.value = potos.value.concat(data)
		no_more.value = has_more
	}) 
}

const getRecommend = async (name) => {
	query.flag = name
	await getPotos(query).then(res => {
		recommend.value = res.data.data
	})
}

const handleMenu = url => {
	uni.navigateTo({
		url: url
	})
}

const handleOption = event => {
	const { value, type } = event
	query.page = 1
	query.order_by[value] = type == 'desc' ? 'asc' : 'desc'
	const item = tabOptions.value.find(item => item.value == value)
	item.type = type == 'desc' ? 'asc' : 'desc'
	getPotosList()
}

const handleDetail = id => {
	uni.navigateTo({
		url: JOB_DETAIL + '?id=' + id
	})
}

const changeMenu = event => {
	query.type = event
	query.page = 1
	getPotosList()
}

const handleSearch = val => {
	query.seek_title = val
	getPotosList()
}

onReachBottom(() => {
	query.page = query.page + 1
	if (!no_more.value) return
	getPotosList()
})

</script>

<style lang="scss" scoped>
.index-top {
	height: 217rpx;
	background-color: $public-color;
	border-radius: 0 0 2000% 2000%;
}
.index-img {
	width: 690rpx;
	height: 280rpx;
	background-color: #fff;
	margin: -180rpx auto 0 auto;
	
	image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
}
.index-tab {
	@include flex-box();
	&-menu {
		flex: 1;
		font-size: 24rpx;
		text-align: center;
		color: #666;
		image {
			width: 88rpx;
			height: 86rpx;
		}
	}
}
.index-job {
	:deep(.uni-scroll-view-content) {
		@include flex-box($justify-content: flex-start);
	}
	&-item {
		width: 300rpx;
		height: 144rpx;
		flex-shrink: 0;
		background: linear-gradient(24deg, #FCEAE6 0%, #FFF5F2 100%);
		border-radius: 10rpx;
		box-sizing: border-box;
		@include flex-box($justify-content: space-between);
		.job-img {
			width: 80rpx;
			height: 80rpx;
		}
		.job-name {
			font-size: 26rpx;
			color: #444;
		}
		.job-price {
			font-size: 30rpx;
			color: #FF552E;
			padding-top: 4rpx;
		}
		.job-data {
			font-size: 20rpx;
			padding-left: 4rpx;
		}
	}
}
.job-tab {
	height: 90rpx;
	@include flex-box();
	&-item {
		flex: 1;
		height: 100%;
		font-size: 26rpx;
		text-align: center;
		color: #333;
		@include flex-box();
		.icon-down, .icon-up {
			transform: scale(.3);
			color: #ddd;
		}
		.icon-filter {
			font-size: 24rpx;
			color: #333;
		}
	}
	:deep(.van-dropdown-menu__bar) {
		box-shadow: none;
	}
	:deep(.van-dropdown-menu) {
		flex: 1;
	}
}
</style>
