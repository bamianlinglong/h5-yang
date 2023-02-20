<template>
	<view class="tabs">
		<view class="tabs-item" @tap="handleType">
			<text>求职类型</text>
			<view class="iconfont icon-down"></view>
		</view>
		<view class="tabs-item" @tap='handleSalary'>
			<text>薪资要求</text>
			<view class="iconfont icon-down"></view>
		</view>
		<view class="tabs-item" @tap="handleSex">
			<text>性别</text>
			<view class="iconfont icon-down"></view>
		</view>
	</view>
	<view class="m-t20 list" v-if="list.length > 0">
		<view class="p-lr30 list-item" v-for="item in list" :key="item.id" @tap="handleResume(item.id)">
			<view class="p-b20 p-t30 item-title">
				<view>{{ item.title }}</view>
				<view class="item-dy">{{ item.salary_figure }}{{ item.salary_type_text }}</view>
			</view>
			<view class="item-info">
				<image class="m-r16 info-img" src="/static/icon/icon_gril.png"></image>
				<view>
					<view class="info-text">{{ item.user_info.xingming }}求职简历</view>
					<view class="p-t10 info">{{ item.user_info.sex_text }} | {{ item.user_info.age }}岁 | 信用分:{{ item.user_info.score }}</view>
				</view>
			</view>
		</view>
	</view>
	<empty v-else></empty>
	<noMore v-if='!has_more && list.length > 0'></noMore>
	<Popup v-model:show="showP" position='bottom'>
		<typeList :columns='classifyList' title='选择求职类型' @confirm='confirmType' @cancel='showP = false' />
	</Popup>
	<Popup v-model:show="showSex" position='bottom'>
		<typeList :columns='sexList' title='选择性别' @confirm='confirmSex' @cancel='showSex = false' />
	</Popup>
	<Popup v-model:show="showSalary" position='bottom'>
		<typeList :columns='salaryList' title='选择薪资' @confirm='confirmSalary' @cancel='showSalary = false' />
	</Popup>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { searchResume, classify } from '@/api/api'
import { MY_RESUME } from '@/common/path'
import { Popup } from 'vant'
import { sex, salary } from '@/utils/emnu'

const list = ref([])
const classifyList = ref([])
const has_more = ref(false)
const showP = ref(false)
const showSex = ref(false)
const showSalary = ref(false)
const query = reactive({
	page: 1,
	limit: 10,
	posts_id: null,
	salary_month_upper: null, // 月薪上限
	salary_month_floor: null,    //下限
	sex: '',
	seek_title: '',
	order_by: ''
})
const sexList = []
const salaryList = []
sex.forEach(item => {
	sexList.push({ id: item.value, title: item.text })
})
salary.forEach(item => {
	salaryList.push({ id: item.value, title: item.text })
})

onLoad(() => {
	getResume()
	getClassify()
})

const getResume = async () => {
	await searchResume(query).then(res => {
		uni.stopPullDownRefresh()
		if (query.page == 1) list.value = res.data.data
		else list.value = list.value.concat(res.data.data)
		has_more.value = res.data.has_more
	})
}

// 求职类型
const getClassify = async () => {
	await classify({ limit: 100 }).then(res => {
		classifyList.value = res.data.data
	})  
}

const handleResume = (id) => {
	uni.navigateTo({ url: `${MY_RESUME}?id=${id}` })
}

const handleType = () => {
	showP.value = true
}

const handleSex = () => {
	showSex.value = true
}

const handleSalary = () => {
	showSalary.value = true
}

const confirmType = (event) => {
	const item = event.selectedOptions[0]
	query.posts_id = item.id
	showP.value = false
	getResume()
}

const confirmSex = (event) => {
	const item = event.selectedOptions[0]
	query.sex = item.id
	showSex.value = false
	getResume()
}

const confirmSalary = (event) => {
	const item = event.selectedOptions[0]
	const arr = item.title.split('~')
	const index= arr[0].indexOf('以上')
	const str = arr[0].substring(0, index)
	query.salary_month_upper = arr.length == 2 ? arr[0] : str
	query.salary_month_floor = arr.length == 2 ? arr[1] : ''
	showSalary.value = false
	getResume()
}

onPullDownRefresh(() => {
	query.page = 1
	getResume()
})

onReachBottom(() => {
	query.page = query.page + 1
	if (!has_more.value) return
	getResume()
})

</script>

<style scoped lang="scss">
.tabs {
	height: 90rpx;
	box-shadow: 0px 3px 6px rgba(0,0,0,0.03);
	@include flex-box($justify-content: space-between);
	.tabs-item {
		flex: 1;
		font-size: 26rpx;
		color: #333;
		text-align: center;
		@include flex-box();
		.icon-down {
			transform: scale(.4);
			color: #999;
		}
	}
}
.list-item {
	min-height: 209rpx;
	border-bottom: 10rpx solid #eee;
	// @include flex-box($flex-direction: column, $align-items: flex-start);
	.item-title {
		font-size: 32rpx;
		color: #333;
		@include flex-box($justify-content: space-between);
		.item-dy {
			font-size: 28rpx;
			color: $public-color;
		}
	}
	.item-info {
		@include flex-box($justify-content: flex-start);
		.info-img {
			width: 66rpx;
			height: 66rpx;
			border-radius: 50%;
		}
		.info-text {
			font-size: 24rpx;
			color: #333;
		}
		.info {
			font-size: 20rpx;
			color: #666;
		}
	}
}
</style>