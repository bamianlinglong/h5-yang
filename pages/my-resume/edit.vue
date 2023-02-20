<template>
	<view class="m-lr30">
		<view class="p-b40 info-box">
			<view class="info-avatar">
				<image src="/static/icon/icon_boy.png"></image>
				<view class='m-t20 vip'>
					<text class="m-r10">月度会员</text>
					<text>信用分:100</text>
				</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">简历标题</view>
				<view class="info-right">
					<uni-easyinput :clearable='false' :inputBorder="false" v-model="selfState.title"></uni-easyinput>
				</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">性别</view>
				<view class="info-right radio">
					<uni-data-checkbox v-model="selfState.sex" selectedColor='#2CC998' :localdata="sexs" />
				</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">身高</view>
				<view class="info-right">
					<uni-easyinput :clearable='false' :inputBorder="false" v-model="selfState.height"></uni-easyinput>
					<text class="p-lr20">m</text>
				</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">出生年月</view>
				<view class="info-right">
					<uni-datetime-picker :border='false' v-model="selfState.birthday" />
				</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">现住地址</view>
				<view class="info-right" @tap="openArea">
					<Field readonly :border='false' v-model="selfState.home_address"/>
				</view>
				<Popup v-model:show='showArea' position='bottom'>
					<areaList @confirm='confirmAddress' @cancel='cancelAddress' />
				</Popup>
			</view>
			<view class="p-lr30 m-t40 info info1">
				<view class="m-r10 info-left" style="width: 100%;">
					<text>求职类型</text>
					<text class="info-tips">最多可选三种类型</text>
				</view>
				<view class="m-t20 info-right">
					<uni-data-checkbox  v-model="posts_ids"
										:map="map" 
										selectedColor='#2CC998' 
										multiple
										max="3"
										:localdata="classifyList"
					/>
				</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">期望薪资</view>
				<view class="info-right">
					<uni-easyinput :clearable='false' :inputBorder="false" v-model="selfState.salary_figure"></uni-easyinput>
					<Field readonly style='width: 120rpx;' :border='false' v-model="selfState.salary_type_text" @click="showP = true" />
					<Popup v-model:show="showP" position='bottom'>
						<Picker :columns='columns' @cancel="showP = false" @confirm='confirmPicker'></Picker>
					</Popup>
				</view>
			</view>
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">手机号码</view>
				<view class="info-right">
					<uni-easyinput :clearable='false' :inputBorder="false" v-model="selfState.phone"></uni-easyinput>
				</view>
			</view>
			<!-- <view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">微信号</view>
				<view class="info-right">
					<uni-easyinput :inputBorder="false"></uni-easyinput>
				</view>
			</view> -->
			<view class="p-lr30 m-t40 info">
				<view class="m-r10 info-left">是否展示简历</view>
				<view class="info-right" style="justify-content: space-between;">
					<switch checked @change="changeSwitch" color="#2CC998" style="transform:scale(0.7)"/>
				</view>
			</view>
			<view class="p-lr30 m-t40 info info1">
				<view class="m-r10 info-left">个人简介</view>
				<view class="p-t20 info-right" style="width: 100%;">
					<uni-easyinput :clearable='false' :inputBorder="false" v-model="selfState.oneself_describe" type="textarea" placeholder="请输入个人简历"></uni-easyinput>
				</view>
			</view>
			<view class="p-lr30 m-t40 info info1">
				<view class="m-r10 info-left">照片上传</view>
				<view class="p-b20 p-t20 info-tips">最多三张，专业证书/获奖证书皆可，重新上传将覆盖之前的照片</view>
				<Uploader v-model="fileList" :max-count="3" :after-read='updateImg' @delete='delImg'/>
			</view>
		</view>
	</view>
	<view class="p-lr30 blue-btn">
		<view class="left">{{ selfState.status == 'normal' ? '展示中' : '已隐藏' }}</view>
		<view class="right" @tap="handleSave">立即保存</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { EDIT_RESUME } from '@/common/path'
import { hobbys, sex } from '@/utils/emnu'
import { resumeDetails, classify, editResume } from '@/api/api'
import { baseUrl } from '@/utils/config'
import { Field, Popup, Picker, Uploader } from 'vant'

const sexs = sex
const hobbyss = hobbys
const selfState = ref({})
const classifyList = ref([])
const fileList = ref([])
const uploadImg = ref([])
const posts_ids = ref([])
const index = ref(0)
const showP = ref(false)
const showArea = ref(false)

const columns = [{text: '元/天', value: 10},{text: '元/月', value: 20}]
const map = { text: 'title', value: 'id' }

onLoad((options) => {
	if (options.id) getDetails(options.id)
	getClassify()
})


const handleSave = async () => {
	const state = selfState.value
	const data = {
		id: state.id,
		self_images: uploadImg.value.join(','),
		posts_ids: posts_ids.value.join(','),
		status: state.status,
		xingming: state.xingming,
		sex: state.sex,
		height: state.height,
		birthday: state.birthday,
		home_address: state.home_address,
		home_place_redundancy: state.home_place_redundancy,
		salary_figure: state.salary_figure,
		salary_type: state.salary_type,
		phone: state.phone,
		oneself_describe: state.oneself_describe,
		home_place_lon: state.home_place_lon,
		home_place_lat: state.home_place_lat,
		title: state.title
	}
	await editResume(data).then(res => {
		uni.showToast({ title: '编辑成功', icon: 'none', mask: true })
		setTimeout(() => {
			uni.navigateBack({ delta: 1 })
		},1500)
	})
}

// 是上传图片
const updateImg = async (file) => {
	// console.log(fileList.value)
	// console.log(file)
	const formData = new FormData()
	formData.append('file', file)
	// console.log(formData.get('file'))
	const token = uni.getStorageSync('token')
	uni.uploadFile({
		url: baseUrl + '/api/common/upload',
		filePath: file.content,
		name: file.name,
		header: { 'Token': token, 'Access-Control-Allow-Origin': '*' },
		formData: formData,
		success(res) {
			const files = JSON.parse(res.data)
			if (files.data.url) {
				uploadImg.value.push(files.data.url)
			}
		}, fail(err) {
			console.log(err)
			uni.showToast({ title: '上传失败', icon: 'none', mask: true })
		}
	})
}

const delImg = (file) => {
	const index = uploadImg.value.findIndex(item => item == file.url)
	uploadImg.value.splice(index, 1)
}

const getDetails = async (id) => {
	await resumeDetails({ id, type: 'resume' }).then(res => {
		const ids = res.data.posts_ids.split(',')
		posts_ids.value = ids.map(Number)
		res.data.self_images.split(',').forEach(item => {
			uploadImg.value.push(item)
		})
		res.data.self_images_text.split(',').forEach(item => {
			fileList.value.push({ url: item })
		})
		selfState.value = res.data
	})
}

const getClassify = async () => {
	await classify({ limit: 100 }).then(res => {
		classifyList.value = res.data.data
	})
}

const confirmPicker = (event) => {
	const picker = event.selectedOptions[0]
	showP.value = false
	selfState.value.salary_type_text = picker.text
	selfState.value.salary_type = picker.value
}

const changeSwitch = event => {
	selfState.value.status = event.detail.value ? 'normal' : 'hidden'
}

const changeIds = () => {
	// 
}

const openArea = () => {
	showArea.value = true
}

const confirmAddress = (data) => {
	selfState.value.home_address = data.address
	showArea.value = false
}

const cancelAddress = () => {
	showArea.value = false
}

const handleDetail = () => {
	// uni.navigateTo({ url: EDIT_RESUME })
	uni.navigateBack()
}
</script>

<style lang="scss" scoped>
page {
	background-color: #F4F6F8;
	padding-bottom: calc(constant(safe-area-inset-bottom) + 120rpx);
	padding-bottom: calc(env(safe-area-inset-bottom) + 120rpx);
}
.info-box {
	margin-top: 94rpx;
	background-color: #fff;
	border-radius: 10rpx;
	.info-avatar {
		width: 100%;
		height: 152rpx;
		border-radius: 50%;
		text-align: center;
		image {
			width: 152rpx;
			height: 100%;
			margin-top: -65rpx;
		}
		.vip {
			font-size: 20rpx;
			color: #BE6916;
			text {
				border: 1rpx solid #BE6916;
				border-radius: 10rpx;
				padding: 4rpx 10rpx;
			}
		}
	}
}
.info {
	font-size: 28rpx;
	@include flex-box($justify-content: flex-start);
	color: #333;
	&.info1 {
		@include flex-box($flex-direction: column,$align-items: flex-start,$justify-content: flex-end);
	}
	.info-left {
		@include flex-box($justify-content: space-between);
		width: 180rpx;
		flex-shrink: 0;
	}
	.info-right {
		width: 100%;
		color: #666;
		@include flex-box($justify-content: flex-start);
		
		:deep(.uni-easyinput__content), :deep(.van-cell) {
			background-color: #F4F6F8 !important; 
			padding-left: 20rpx;
		}
		
		:deep(.checklist-box) {
			width: 33.33%;
			margin-right: 0;
		}
		
		// &.upload {
		// 	width: 160rpx;
		// 	height: 100rpx;
		// 	font-size: 24rpx;
		// 	text-align: center;
		// 	line-height: 100rpx;
		// 	border: 1rpx solid #E7EAF0;
		// 	background-color: #F4F6F8;
		// 	color: #99A6B6;
		// }
	}
	.info-tips {
		font-size: 24rpx;
		color: #FF552E;
	}
	:deep(.is-input-border) {
		// background-color: #F4F6F8 !important;
	}
}
</style>