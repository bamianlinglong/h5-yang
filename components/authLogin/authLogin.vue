<template>
	
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { LOGIN } from '@/common/path'

onLoad(() => {
	const storage = uni.getStorageSync('token')
	console.log('tonken', storage)
	if (!storage) {
		uni.navigateTo({ url: LOGIN })
	}
})
</script>

<style>
</style>