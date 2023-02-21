<template>
	<CellGroup>
		<Field label='企业名称' placeholder='请输入企业名称'></Field>
		<Field label='手机号码' placeholder='请输入手机号码'></Field>
		<Field label='企业地址' placeholder='请输入企业地址'></Field>
		<view class="van-cell is-public">
			<view class="company-type">
				<view class="van-field__label">企业类型</view>
			</view>
			<view class="company-type">
				<uni-data-checkbox selectedColor='#2CC998' max="1" multiple :localdata="list"></uni-data-checkbox>
			</view>
		</view>
		<Field label='企业介绍' label-align="top" type="textarea" placeholder='请输入企业地址'></Field>
		<view class="van-cell is-public">
			<view class="company-type">
				<view class="van-field__label">认证证件</view>
			</view>
			<view class="inf-tips">请上传企业营业执照或个人身份证正反面照片</view>
			<view class="company-type">
				<uploader :max-count="1" upload-text='上传证件' v-model="fileList" :after-read='readImg' />
				<uploader :max-count="1" upload-text='上传证件' v-model="fileList" :after-read='readImg' />
			</view>
		</view>
		<view class="van-cell is-public">
			<view class="company-type">
				<view class="van-field__label">企业证明</view>
			</view>
			<view class="inf-tips">请上传已盖章的企业认证公函或带手印的个人代理承诺书</view>
			<view class="company-type gong">
				<uploader :max-count="1" upload-text='上传证明文件' v-model="fileList" :after-read='readImg' />
			</view>
			<view class="company-type" style="font-size: 24rpx;color: #99A6B6;">请严肃认真上传对应认证资料，羊城社将在一个工作日内审核您的认证，提交虚假/恶意认证资料，您的账号将被封禁。信息认证过程免费，一次认证永久有效</view>
		</view>
		<view class="blue-btn">
			<view class="right">立即提交</view>
		</view>
	</CellGroup>
</template>

<script setup>
import { CellGroup, Field,Checkbox, CheckboxGroup, Uploader  } from 'vant'
import { company_type } from '@/utils/emnu'

const list = company_type

const fileList = []

const readImg = (file) => {
	console.log(file)
}

</script>

<style lang="scss" scoped>
page {
	padding-bottom: calc(98rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(98rpx + env(safe-area-inset-bottom));
}
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
	@include flex-box($justify-content: space-between);
	:deep(.van-uploader__upload) {
		width: 330rpx;
		height: 186rpx;
		padding: 0;
		margin: 0;
	}
}
.gong {
	:deep(.van-uploader__upload) {
		width: 690rpx;
		height: 186rpx;
		padding: 0;
		margin: 0;
	}
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
.blue-btn {
	.right {
		width: 690rpx;
		margin: 0 auto;
	}
}
</style>