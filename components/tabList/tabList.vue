<template>
	<view class="p-lr30 tabs">
		<view :class="['tab-item', { 'active': item.code == tabCode }]" 
			  v-for="item in tabs" 
		      :key="item.code"
			  @tap="handle(item.code)"
		>{{ item.name }}</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const tabCode = ref('all')

const { tabs } = defineProps({ tabs: Array })
const emits = defineEmits(['handleCode'])

const handle = code => {
	tabCode.value = code
	emits('handleCode', code) 
}
</script>

<style scoped lang="scss">
.tabs {
	height: 100rpx;
	font-size: 30rpx;
	box-shadow: 0px 5px 10px rgba(70,74,84,0.05);
	@include flex-box($justify-content: space-between);
	color: #666;
	.tab-item {
		&.active {
			position: relative;
			color: #333;
			&::before {
				position: absolute;
				left: 0;
				right: 0;
				bottom: -29rpx;
				content: '';
				width: 100%;
				height: 5rpx;
				border-radius: 10rpx;
				background-color: $public-color;
			}
		}
	}
}
</style>