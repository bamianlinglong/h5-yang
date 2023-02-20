<template>
	<view class="m-lr30">
		<view class="p-lr30 member-url">
			<view :class="['member-url-item', {'border': (index + 1) != list.length}]" 
				  v-for="(item, index) in list" 
				  :key="item.name"
				  @tap="handleItem(item)"
			>
				<view class="img-url">
					<image class="m-r10 item-img" :src="item.icon"></image>
					<text>{{ item.name }}</text>
				</view>
				<view class="iconfont icon-right"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { LOGIN } from '@/common/path'
const { list } = defineProps({ list: Array })

const handleItem = item => {
	if (!item.url) {
		uni.showToast({ title: '功能升级中', mask: true, mask: true })
		return
	}
	if (item.url == 'logout') {
		uni.showModal({
			content: '确定要登出吗？',
			success(res) {
				if (res.confirm) {
					uni.clearStorageSync()
					uni.navigateTo({ url: LOGIN })
				}
			}
		})
		return
	}
	uni.navigateTo({ url: item.url })
}
</script>

<style lang="scss" scoped>
.member-url {
	border-radius: 10rpx;
	background-color: #fff;
	margin-top: 24rpx;
	.member-url-item {
		height: 100rpx;
		font-size: 28rpx;
		@include flex-box($justify-content: space-between);
		color: #333;
		line-height: 100rpx;
		&.border {
			border-bottom: 1rpx solid #eee;
		}
	}
	.item {
		width: 33.33%;
		font-size: 24rpx;
		border-right: 1rpx solid #eee;
		height: 100%;
		@include flex-box($flex-direction: column,$align-items: flex-start,$justify-content: inherit);
		color: #222;
		&:last-child {
			border-right: none;
		}
	}
	.item-img {
		width: 40rpx;
		height: 40rpx;
	}
	.img-url {
		@include flex-box();
	}
}
</style>