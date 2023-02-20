<template>
	<view >
		<navbar @input='handleSearch' />
		<jobItem v-if="potos.length > 0" :list='potos' :showMore="!no_more"></jobItem>
		<empty v-else></empty>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { getPotos } from '@/api/api'

const potos = ref([])
const no_more = ref(false)
const query = reactive({
	limit: 10,
	page: 1,
	flag: '',
	seek_title: '',
	lon_lat: '',
	type: 10,
	order_by: {
		price: 'desc',
		distance: 'asc'
	}
})

onLoad(options => {
	query.type = options.type
	getPotosList()
})

const getPotosList = async () => {
	await getPotos(query).then(res => {
		uni.stopPullDownRefresh()
		const { data, has_more } = res.data
		if (query.page == 1) potos.value = data
		else potos.value = potos.value.concat(data)
		no_more.value = has_more
	}) 
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

<style>
</style>