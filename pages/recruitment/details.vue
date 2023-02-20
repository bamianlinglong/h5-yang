<template>
	<view class='p-t30'>
		<CellGroup inset>
			<Cell title="招聘标题" :value="detail.title"></Cell>
			<Cell title="招聘类别" :value="detail.type_text"></Cell>
			<Cell title="招聘岗位" :value="detail.classify_text"></Cell>
			<Cell title="工作内容" :value="detail.job_details"></Cell>
			<Cell title="工作地点" :value="detail.job_place_redundancy"></Cell>
			<Cell title="详细地址" :value="detail.job_address"></Cell>
			<Cell title="工作时间" :value="detail.job_time"></Cell>
			<Cell title="薪资待遇" :value="detail.salary_figure + ' ' + detail.salary_type_text"></Cell>
			<Cell title="工作福利" :value="detail.job_welfare"></Cell>
			<Cell title="工作要求" :value="detail.job_require"></Cell>
		</CellGroup>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { Cell, CellGroup } from 'vant';

const detail = ref({})

onLoad((options) => {
	detail.value = JSON.parse(decodeURIComponent(options.content))
	console.log(detail.value)
})

const getDetails = async (id) => {
	
}
</script>

<style scoped lang="scss">
page {
	background-color: #F4F8F8;
}
</style>