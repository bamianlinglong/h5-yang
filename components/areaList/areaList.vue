<template>
	<Area title="标题" :area-list="list" @confirm="handleConfirm" @cancel='handleCancel' />
</template>

<script setup>
import { Area } from 'vant'
import { areaList } from '@vant/area-data'
const list = areaList
const emits = defineEmits(['confirm', 'cancel'])

const handleConfirm = (event) => {
	let address = ''
	const values = event.selectedValues.join(',')
	event.selectedOptions.forEach(item => {
		address += item.text
	})
	emits('confirm', { address, values })
}

const handleCancel = () => {
	emits('cancel')
}
</script>
