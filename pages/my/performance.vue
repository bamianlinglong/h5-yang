<template>
	<view class="m-lr30">
		<view class="m-t24 p-lr30 content-item">
			<view class="item-detail">
				<view>人员情况</view>
				<view class="item-text">
					<text>我的业务员</text>
					<text class="iconfont icon-right"></text>
				</view>
			</view>
			<view class="p-t30 p-b40 item-status">
				<view class="m-r16 status">
					<view class="mouth">
						<text>当月总推荐</text>
						<text class="color">（人）</text>
					</view>
					<view class="number">76</view>
					<view class="bi">
						<text>100%</text>
						<text>同比上月</text>
					</view>
				</view>
				<view class="status">
					<view class="mouth">
						<text>我的推荐</text>
						<text class="color">（人）</text>
					</view>
					<view class="number">76</view>
					<view class="bi">
						<text>100%</text>
						<text>同比上月</text>
					</view>
				</view>
				<view class="status">
					<view class="mouth">
						<text>业务员推荐</text>
						<text class="color">（人）</text>
					</view>
					<view class="number">76</view>
					<view class="bi">
						<text>100%</text>
						<text>同比上月</text>
					</view>
				</view>
			</view>
		</view>
		<view class="m-t24 p-lr30 content-item">
			<view class="item-detail">
				<view>业绩情况</view>
				<view class="item-text">
					<text>更多</text>
					<text class="iconfont icon-right"></text>
				</view>
			</view>
			<view class="center">
				<view class="center-item">
					<text class="m-r10 iconfont icon-chart"></text>
					<view>
						<view class="txt">
							<text>月总业绩</text>
							<text class="color">（元）</text>
						</view>
						<view class="p-t10 price">6300.00</view>
					</view>
				</view>
				<view class="center-item" style="padding-left: 20rpx;">
					<text class="m-r10 iconfont icon-user"></text>
					<view>
						<view class="txt">
							<text>月推广人数</text>
							<text class="color">（人）</text>
						</view>
						<view class="p-t10 price">6300.00</view>
					</view>
				</view>
				<view class="center-item">
					<text class="m-r10 iconfont icon-lock"></text>
					<view>
						<view class="txt">
							<text>月成交数</text>
							<text class="color">（单）</text>
						</view>
						<view class="p-t10 price">6300.00</view>
					</view>
				</view>
				<view class="center-item" style="padding-left: 20rpx;">
					<text class="m-r10 iconfont icon-money"></text>
					<view>
						<view class="txt">
							<text>月成交金额</text>
							<text class="color">（元）</text>
						</view>
						<view class="p-t10 price">6300.00</view>
					</view>
				</view>
			</view>
		</view>
		<view class="m-t24 p-lr30 content-item">
			<view class="item-detail">销售情况</view>
			<view class="p-t20 table">
				<view class="table-th">
					<view class="user">用户</view>
					<view class="goods">商品</view>
					<view class="price">消费金额</view>
					<view class="time">购买时间</view>
				</view>
				<view class="table-th table-td">
					<view class="user">王大锤</view>
					<view class="goods text-overflow">招聘方会员招聘方会员招聘方会员招聘方会员</view>
					<view class="price">29.9</view>
					<view class="time">2020-09-20</view>
				</view>
				<view class="table-th table-td">
					<view class="user">王大锤</view>
					<view class="goods text-overflow">招聘方会员招聘方会员招聘方会员招聘方会员</view>
					<view class="price">29.9</view>
					<view class="time">2020-09-20</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
page {
	background-color: #F4F6F8;
}
.content-item {
	border-radius: 10rpx;
	background-color: #fff;
	.item-detail {
		height: 100rpx;
		font-size: 30rpx;
		color: #333;
		@include flex-box($justify-content: space-between);
		.item-text {
			font-size: 24rpx;
			color: #999;
		}
	}
	.item-status {
		height: 180rpx;
		box-sizing: border-box;
		@include flex-box($justify-content: space-between);
		.status {
			height: 100%;
			width: 33.33%;
			@include flex-box($flex-direction: column,$align-items: flex-start,$justify-content: space-between);
			
			&:first-child {
				border-right: 1rpx solid #eee;
			}
		}
		.mouth {
			font-size: 24rpx;
			color: #222;
		}
		.number {
			font-size: 30rpx;
			color: #333;
		}
		.bi {
			font-size: 22rpx;
			color: #999;
		}
	}
	.color {
		color: #999;
	}
	.center {
		@include flex-box($justify-content: space-between);
		flex-wrap: wrap;
		.center-item {
			width: 50%;
			height: 140rpx;
			@include flex-box($justify-content: flex-start);
			box-sizing: border-box;
			border-bottom: 1rpx solid #eee;
			&:nth-child(2n-1) {
				border-right: 1rpx solid #eee;
			}
			.iconfont {
				font-size: 80rpx;
				color: $public-color;
			}
			.txt {
				font-size: 24rpx;
				color: #222;
			}
			.price {
				font-size: 30rpx;
				color: #333;
			}
		}
	}
	.table-th {
		height: 70rpx;
		font-size: 24rpx;
		border-bottom: 1rpx solid #eee;
		color: #333;
		line-height: 70rpx;
		@include flex-box($justify-content: space-between);
		&:last-child {
			border-bottom: none;
		}
		.user {
			width: 100rpx;
		}
		.goods {
			width: 300rpx;
		}
		.price {
			width: 180rpx;
			text-align: center;
		}
		.time {
			width: 170rpx;
			text-align: center;
		}
		&.table-td {
			color: #666;
		}
	}
}
</style>