<template>
	<tabList :tabs='tabs' @handleCode='handleCode'></tabList>
	<stepItem :type='0'
			  v-for="item in list"
			  :key="item.id"
			  :item='item'
	></stepItem>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { applyList } from '@/api/api'

const list = ref([])
const query = reactive({
	page: 1,
	limit: 10,
	type: 'all'
})

const tabs = [
	{
		code: 'all',
		name: '全部',
	}, {
		code: 'underway',
		name: '已报名',
	}, {
		code: 'succeed',
		name: '被录取',
	}, {
		code: 'failure',
		name: '被拒绝',
	}
]
const list2 = [{
	title: '周末派单员',
	desc: '天河智慧城 | 派单'
}, {
	title: '已报名',
	desc: '报名时间：2020年8月1日'
}]

onLoad(() => {
	getApplyList()
})

const getApplyList = async () => {
	await applyList(query).then(res => {
		uni.stopPullDownRefresh()
		if (query.page == 1) list.value = res.data.data
		else list.value = list.value.concat(res.data.data)
	})
}

const handleCode = code => {
	query.type = code
	getApplyList()
}

onPullDownRefresh(() => {
	query.page = 1
	getApplyList()
})

onReachBottom(() => {
	getApplyList()
})

</script>

<style lang="scss" scoped>


.step-dest {
	
}
</style>