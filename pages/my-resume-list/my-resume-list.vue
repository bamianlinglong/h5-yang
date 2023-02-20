<template>
	<Tabs v-model:active="active" sticky @click-tab="onClickTab">
	  <Tab v-for="item in tabList" :title="item.text" />
	</Tabs>
	<view class="list" v-if="list.length > 0">
		<view class="p-lr30 list-item" v-for="item in list" :key="item.id">
			<view class="p-b20 p-t30 item-title">
				<view>{{ item.posts.title }}</view>
				<view class="item-dy">{{ item.posts.salary_figure }}{{ item.posts.salary_type_text }}</view>
			</view>
			<view class="item-info">
				<image class="m-r16 info-img" :src="item.resume.avatar"></image>
				<view>
					<view class="info-text">{{ item.resume.title }}</view>
					<view class="p-t10 info">信用分:{{ item.resume.score }}</view>
				</view>
			</view>
			<view class="p-b40 p-t30 oneself_describe">{{ item.resume.oneself_describe }}</view>
			<view :class="['iconfont position-icon', item.audit_status == 'succeed' ? 'icon-success' : 'icon-filed']"></view>
		</view>
	</view>
	<empty v-else></empty>
	<noMore v-if='query.page >= last_page.value'></noMore>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { Tab, Tabs } from 'vant'
import { resumeList } from '@/api/api'
import { MY_RESUME } from '@/common/path'


const list = ref([])
const last_page = ref(1)
const active = ref(0)
const iconClass = ref('icon-filed')
const query = reactive({
	page: 1,
	limit: 10,
	type: ''
})
const tabList = [{
	code: 'all',
	text: '全部'
},{
	code: 'underway',
	text: '报名中'
},{
	code: 'succeed',
	text: '已录取'
},{
	code: 'failure',
	text: '已拒绝'
}]

onLoad(() => {
	getResume()
})

const getResume = async () => {
	await resumeList(query).then(res => {
		uni.stopPullDownRefresh()
		if (query.page == 1) list.value = res.data.data
		else list.value = list.value.concat(res.data.data)
		last_page.value = query.page
	})
}

const handleTap = (id) => {
	uni.navigateTo({ url: `${MY_RESUME}?id=${id}` })
}

const onClickTab = (event) => {
	const index = event.name
	query.type = tabList[index].code
	getResume()
}

onPullDownRefresh(() => {
	query.page = 1
	getResume()
})

onReachBottom(() => {
	query.page = query.page + 1
	if (query.page > last_page.value) return
	getResume()
})

</script>

<style scoped lang="scss">
.list-item {
	position: relative;
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
	.oneself_describe {
		font-size: 28rpx;
		color: #333;
	}
	.position-icon {
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 80rpx;
		&.icon-filed {
			color: #ddd;
		}
		&.icon-success {
			color: $public-color;
		}
	}
}
</style>