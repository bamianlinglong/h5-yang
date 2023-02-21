<template>
	<Form @submit="formSubmit">
		<CellGroup>
			<Field 
				label='企业名称'
				v-model="company.title" 
				placeholder='请输入企业名称'
				:rules="[{ required: true, message: '请填写企业名称' }]"
			></Field>
			<Field 
				label='手机号码' 
				v-model="company.principal_telephone"
				placeholder='请输入手机号码'
				type='tel'
				:rules="[{ required: true, message: '请填写手机号码' }]"
			></Field>
			<Field 
				label='企业地址' 
				v-model="company.company_location"
				placeholder='请输入企业地址'
				:rules="[{ required: true, message: '请填写企业地址' }]"
			></Field>
			<view class="van-cell is-public">
				<view class="company-type">
					<view class="van-field__label">企业类型</view>
				</view>
				<view class="company-type">
					<uni-data-checkbox v-model='company.company_type' selectedColor='#2CC998' max="1" multiple :localdata="list"></uni-data-checkbox>
				</view>
			</view>
			<Field 
				label='企业介绍' 
				label-align="top" 
				v-model="company.company_intro" 
				type="textarea" 
				placeholder='请输入企业介绍'
				:rules="[{ required: true, message: '请填写企业介绍' }]"
			></Field>
			<view class="van-cell is-public">
				<view class="company-type">
					<view class="van-field__label">认证证件</view>
				</view>
				<view class="inf-tips">请上传企业营业执照或个人身份证正反面照片</view>
				<view class="company-type">
					<uploader :max-count="1" upload-text='上传证件' v-model="fileList1" :after-read='readImg1' @delete='delImg1' />
					<uploader :max-count="1" upload-text='上传证件' v-model="fileList2" :after-read='readImg2' @delete='delImg1' />
				</view>
			</view>
			<view class="van-cell is-public">
				<view class="company-type">
					<view class="van-field__label">企业证明</view>
				</view>
				<view class="inf-tips">请上传已盖章的企业认证公函或带手印的个人代理承诺书</view>
				<view class="company-type gong">
					<uploader :max-count="1" upload-text='上传证明文件' v-model="fileList3" :after-read='readImg3' @delete='delImg2' />
				</view>
				<view class="company-type" style="font-size: 24rpx;color: #99A6B6;">请严肃认真上传对应认证资料，羊城社将在一个工作日内审核您的认证，提交虚假/恶意认证资料，您的账号将被封禁。信息认证过程免费，一次认证永久有效</view>
			</view>
			<view class="blue-btn">
				<Button class="right" native-type="submit">立即提交</Button>
			</view>
		</CellGroup>
	</Form>
</template>

<script setup>
import { ref } from 'vue'
import { CellGroup, Field,Checkbox, CheckboxGroup, Uploader, Form, Button  } from 'vant'
import { company_type } from '@/utils/emnu'
import { baseUrl } from '@/utils/config'
import { apply } from '@/api/api'

const list = company_type

const fileList1 = ref([])
const fileList2 = ref([])
const fileList3 = ref([])
const uploadImg1 = ref([])

const company = ref({})

const readImg1 = (file) => {
	uploadImg(file, 1)
}
const readImg2 = (file) => {
	uploadImg(file, 2)
}
const readImg3 = (file) => {
	uploadImg(file, 3)
}

const uploadImg = (file, index) => {
	console.log(baseUrl)
	const formData = new FormData()
	formData.append('file', file)
	const token = uni.getStorageSync('token')
	const baseEnv = process.env.NODE_ENV
	uni.uploadFile({
		url: baseUrl[baseEnv] + '/api/common/upload',
		filePath: file.content,
		name: file.name,
		header: { 'Token': token, 'Access-Control-Allow-Origin': '*' },
		formData: formData,
		success(res) {
			const files = JSON.parse(res.data)
			if (files.data.url) {
				index != 3 ? uploadImg1.value.push(files.data.url) : company.value.company_prove = files.data.url
			}
		}, fail(err) {
			uni.showToast({ title: '上传失败', icon: 'none', mask: true })
		}
	})
}

const delImg1 = (file) => {
	const index = uploadImg1.value.findIndex(item => item == file.url)
	uploadImg1.value.splice(index, 1)
}

const delImg2 = (file) => {
	company.company_prove = ''
}

const formSubmit = async () => {
	if (!company.value.company_type) {
		uni.showToast({title: '请选择企业类型', icon: 'none'})
		return
	} else if (uploadImg1.value.length < 2) {
		uni.showToast({title: '请上传完整正反面证件照', icon: 'none'})
		return
	} else if (!company.value.company_prove) {
		uni.showToast({title: '请上传企业证明材料', icon: 'none'})
		return
	}
	company.value.company_license = uploadImg1.value.join(',')
	await apply(company.value).then(res => {
		uni.showToast({title: '申请成功', mask: true})
		setTimeout(() => {
			uni.navigateBack({ delta: 1 })
		}, 1500)
	})
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
	:deep(.van-uploader__upload), :deep(.van-uploader__preview-image) {
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