<template>
	<collectItem :list='list' :showMore='false'></collectItem>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { getCollectList } from '@/api/api'

const page = ref(1)
const list = ref([])
const last_page = ref(1)

onLoad(() => {
	getList()
})

const getList = async () => {
	await getCollectList({ page: page.value, limit: 10 }).then(res => {
		uni.stopPullDownRefresh()
		if (page.value == 1) list.value = res.data.data
		else list.value = list.value.concat(res.data.data)
		last_page.value = page.value
	})
}

onReachBottom(() => {
	page.value = page.value + 1
	if (page.value > last_page.value) return
	getList()
})

onPullDownRefresh(() => {
	page.value = 1
	getList()
})
</script> 

<style lang="scss" scoped>
.collect-nav {
	height: 88rpx;
	color: #666;
	font-size: 30rpx;
	@include flex-box($justify-content: flex-start);
	& > view {
		width: 140rpx;
		text-align: center;
	}
	.active {
		font-size: 38rpx;
		color: #333;
	}
}
</style>