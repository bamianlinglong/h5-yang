<template>
	<CellGroup>
		<Field label='企业名称' placeholder='请输入企业名称'></Field>
		<Field label='手机号码' placeholder='请输入手机号码'></Field>
		<Field label='企业地址' placeholder='请输入企业地址'></Field>
		<view class="van-cell is-public">
			<view class="company-type">
				<view class="van-field__label">企业类型</view>
			</view>
			<view class="inf-tips">最多只能选择3项</view>
			<view class="company-type">
				<uni-data-checkbox selectedColor='#2CC998' max="3" multiple :localdata="list"></uni-data-checkbox>
			</view>
		</view>
		<Field label='企业介绍' label-align="top" type="textarea" placeholder='请输入企业地址'></Field>
		<view class="van-cell is-public">
			<view class="company-type">
				<view class="van-field__label">认证证件</view>
			</view>
			<view class="inf-tips">最多只能选择3项</view>
			<view class="company-type">
				<view>
					<uploader :max-count="1" v-model="fileList" :after-read='readImg' />
					<view>5575</view>
				</view>
				<view>
					<uploader :max-count="1" v-model="fileList" :after-read='readImg' />
					<view>8454</view>
				</view>
			</view>
		</view>
	</CellGroup>
</template>

<script setup>
import { CellGroup, Field,Checkbox, CheckboxGroup, Uploader  } from 'vant'

const list = [{
	text: '啊啊啊',
	value: 0
},{
	text: 'lalalal',
	value: 1
}]

const fileList = []

const readImg = (file) => {
	console.log(file)
}

</script>

<style lang="scss" scoped>
.company-type {
	position: relative;
	display: flex;
	box-sizing: border-box;
	width: 100%;
	padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
	overflow: hidden;
	color: var(--van-cell-text-color);
	font-size: var(--van-cell-font-size);
	line-height: var(--van-cell-line-height);
	background: var(--van-cell-background);
}
.inf-tips {
	font-size: 24rpx;
	padding: 0 var(--van-cell-horizontal-padding);
	color: #FF552E;
}
.van-cell {
	&.is-public {
		display: block;
		padding: 0;
	}
}
</style>