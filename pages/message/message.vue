<template>
	<view class="p-lr30 list" v-if="list.length > 0">
		<view class="p-b20 list-item" 
			  v-for="item in list"
			  :key="item.id"
			  @tap="handleDetail(item.id)"
		>
			<view class="p-t20 msg-title">
				<view class="p-b20 title">
					<text class="m-r16 iconfont icon-chat1"></text>
					<text>{{ item.msg_type_text }}</text>
				</view>
				<view class="msg-time">{{ item.deliver_date }}</view>
			</view>
			<view class="p-t20 msg-content">
				<text>您在{{ item.content.deliver_date }}申请的{{ item.content.title }}已</text>
				<text :class="item.className">{{ item.txt }}</text>
			</view>
		</view>
	</view>
	<empty v-else></empty>
	<noMore v-if="list.length > 0 && page >= last_page"></noMore>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { MSG_DETAIL } from '@/common/path'
import { msgList } from '@/api/api'

const page = ref(1);
const list = ref([])
const last_page = ref(1)

onLoad(() => {
	getMsgList()
})

const getMsgList = async () => {
	// 消息类型:10=普通消息,20=应聘通知,30=意见回复
	await msgList({page: page.value, limit: 10}).then(res => {
		const { data } = res.data
		uni.stopPullDownRefresh()
		data.forEach(item => {
			const content = JSON.parse(item.content)
			item.content = content
			item.className = content.res == 'success' ? 'txt1' : 'txt2'
			item.txt = content.res == 'success' ? '被录取' : '被拒绝'
		})
		if (page.value == 1) list.value = data
		else msgList.value = list.value.concat(data)
		last_page.value = res.data.last_page
	})
}

const handleDetail = () => {
	uni.navigateTo({ url: MSG_DETAIL })
}

onReachBottom(() => {
	page.value = page.value + 1
	if (page.value > last_page.value) return
	getMsgList()
})

onPullDownRefresh(() => {
	page.value = 1
	getMsgList()
})
</script>

<style scoped lang="scss">
.list-item {
	min-height: 180rpx;
	border-bottom: 1rpx solid #eee;
	.msg-title {
		@include flex-box($justify-content: space-between);
		.title {
			font-size: 34rpx;
			color: #222;
		}
		.msg-time {
			font-size: 24rpx;
			color: #999;
		}
		.icon-chat1 {
			font-size: 42rpx;
			vertical-align: middle;
			color: #FFAA00;
		}
	}
	.msg-content {
		font-size: 28rpx;
		color: #666;
		.txt1 {
			color: $public-color;
		}
		.txt2 {
			color: #FF552E;
		}
	}
}
</style>