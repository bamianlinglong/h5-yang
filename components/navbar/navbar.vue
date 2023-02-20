<template>
    <view class="p-lr30 input-view">
		<view class="display">
			<view class="m-r5 iconfont icon-address"></view>
			<view class="m-r10 text-overflow navbar-address">北京</view>
		</view>
		<uni-easyinput prefixIcon="search" 
					   v-model="inputVal" 
					   placeholder="请输入内容" 
					   placeholderStyle="color: #fff" 
					   color="#fff" 
                       @input="handleInput"
					   @iconClick="tabInput"
                       :clearable="false"
					   style="color: #fff;"
					   class="m-r16"
		></uni-easyinput>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { debounce } from '@/utils/index'
import { Button } from 'vant';

const inputVal = ref('')
const emits = defineEmits(['input'])

const handleInput = debounce(function(event) {
    inputVal.value = event
}, 300)


const tabInput = event => {
	// console.log(event)
	emits('input', inputVal.value)
}

</script>

<style lang="scss" scoped>
$searchColor: #fff;
.input-view {
	height: 88rpx;
	@include flex-box($justify-content: flex-start);
	background-color: $public-color;
	.display {
		@include flex-box($justify-content: flex-start);
	}
	
	:deep(.is-input-border) {
		border-radius: 100rpx;
		background-color: transparent !important;
		border-color: $searchColor !important;
	}
	:deep(.uniui-search) {
		font-size: 34rpx !important;
		color: $searchColor !important;
	}
	:deep(.uni-easyinput__content-input) {
		height: 64rpx !important;
	}
	:deep(.uni-easyinput__content) {
		// width: 100rpx;
	}
	.icon-address {
		font-size: 34rpx;
		color: $searchColor;
	}
	.navbar-address {
		width: 100rpx;
		font-size: 26rpx;
		color: $searchColor;
	}
}
</style>