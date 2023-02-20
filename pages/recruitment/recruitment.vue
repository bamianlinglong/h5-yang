<template>
	<tabList :tabs='tabs' @handleCode='handleCode'></tabList>
	<stepItem :type='1' 
			  v-for="item in myList" 
			  :key="item.id" 
			  :item='item'
			  @modify='modify'
			  @off='offPosts'
	></stepItem>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad, onShow, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { myMeList, changeMeList } from '@/api/api'
import { my_tabs } from '@/utils/emnu'
import { WANT_RECRUITMENT } from '@/common/path'

const tabs = my_tabs
const myList = ref([])
const last_page = ref(1)
const query = reactive({
	page: 1,
	type: 'all',
	limit: 10
})



onShow(() => {
	getMyList()
})

const getMyList = async () => {
	await myMeList(query).then(res => {
		uni.stopPullDownRefresh()
		if (query.page == 1) myList.value = res.data.data
		else myList.value = myList.value.concat(res.data.data)
		last_page.value = res.data.last_page
		// console.log(myList.value)
	})
}

const handleCode = code => {
	query.type = code 
	query.page = 1
	getMyList()
}


const modify = (id) => {
	uni.showModal({
		content: '修改之后信息将被重新审核您确定要修改吗？',
		success(res) {
			if (res.confirm) {
				uni.navigateTo({ url: WANT_RECRUITMENT  + '?id=' + id })
			}
		}
	})
}

const offPosts = (id) => {
	uni.showModal({
		content: '你确定要下架该条招聘信息吗？',
		success: async (res) => {
			if (res.confirm) {
				await changeMeList({ id }).then(res => {
					uni.showToast({ title: '操作成功', icon: 'none', mask: true })
					setTimeout(() => {
						query.page = 1
						getMyList()
					},1500)
				})
			}
		}
	})
}

onReachBottom(() => {
	query.page = 1
	getMyList()
})

onReachBottom(() => {
	query.page = query.page + 1
	if (query.page > last_page.value) return
	getMyList()
})
</script>

<style>
</style>