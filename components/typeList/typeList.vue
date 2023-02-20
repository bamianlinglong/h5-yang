<template>
	<Picker
	  :title="title"
	  :columns="columns"
	  :columns-field-names="customFieldName"
	  @cancel="handleCancel"
	  @confirm='handleConfirm'
	/>
</template>

<script setup>
import { ref } from 'vue'
import { Picker } from 'vant'

const emits = defineEmits(['confirm', 'cancel'])
const customFieldName = { text: 'title', value: 'id' }
const { columns, title } = defineProps({ 
	columns: Array, 
	title: String,
})

const handleConfirm = (event) => {
	emits('confirm', event)
}

const handleCancel = () => {
	emits('cancel')
}
</script>

<style>
</style>