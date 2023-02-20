<template>
	<view>
		<view class="border"></view>
		<!-- validate-trigger='['on']' -->
		<Form input-align='right' error-message-align='right' @submit="handleSubmit">
			<view class='p-lr30 input-box'>
				<CellGroup>
					<field label='招聘标题' 
						   maxlength='20' 
						   v-model='posts.title' 
						   placeholder='请填写招聘标题（限20字）'
						   :rules="[{ required: true, message: '请填写招聘标题' }]"
					></field>
					<field label='招聘类别' 
						   is-link 
						   v-model='type_text' 
						   readonly 
						   placeholder='请选择类别' 
						   :rules="[{ required: true, message: '请选择招聘类别' }]"
						   @tap='openPopup(0)'
					></field>
					<field label='招聘岗位' 
						   is-link 
						   v-model="classify_text" 
						   readonly 
						   placeholder='请选择岗位' 
						   :rules="[{ required: true, message: '请选择招聘岗位' }]"
						   @tap='openPopup(1)'
					></field>
					<field label='工作内容' 
						   maxlength='20' 
						   v-model="posts.job_details" 
						   type="textarea" 
						   :rules="[{ required: true, message: '请填写工作内容' }]"
						   placeholder='请填写该岗位的工作内容，如负责XXX工作，完成任物等'
					></field>
				</CellGroup>
			</view>
			<view class="border"></view>
			<view class='p-lr30 input-box'>
				<CellGroup>
					<field label='工作地点' 
						   is-link 
						   readonly 
						   v-model="address" 
						   placeholder='请选择工作地点' 
						   :rules="[{ required: true, message: '请选择工作地点' }]"
						   @tap='openPopup(2)'
					></field>
					<field label='详细地址' 
						   v-model='posts.job_address' 
						   placeholder='请输入详细地址'
						   :rules="[{ required: true, message: '请填写详细地址' }]"
					></field>
					<field label='工作时间' 
						   is-link 
						   readonly 
						   v-model="posts.job_time" 
						   placeholder='请选择上下班时间'
						   :rules="[{ required: true, message: '请选择上下班时间' }]"
						   @tap='openPopup(3)' 
					></field>
					<field label='薪资待遇' 
						   placeholder='请填写金额'
						   v-model="posts.salary_figure"
						   type="number"
						   :rules="[{ required: true, message: '请填写金额' }]"
					>
						<template #button>
							<view class="slot-btn" @tap='openPopup(4)' >
								<text>{{ salary_type_text }}</text>
								<text class="iconfont icon-down"></text>
							</view>
						</template>
					</field>
					<field label='工作福利' 
						   type="textarea" 
						   placeholder='填写相关福利，如车补餐补'
						   v-model='posts.job_welfare'
						   :rules="[{ required: true, message: '请填写工作福利' }]"
					></field>
					<!-- <field label='薪资结算方式' 
						   type="textarea" 
						   placeholder='请选择薪资结算方式'
						   :rules="[{ required: true, message: '请选择薪资结算方式' }]"
					>
						<template #button>
							<view class="slot-btn" @tap='openPopup(5)' >
								<text>{{ salary_type_text }}</text>
								<text class="iconfont icon-down"></text>
							</view>
						</template>
					</field> -->
				</CellGroup>
			</view>
			<view class="border"></view>
			<view class='p-lr30 input-box'>
				<CellGroup>
					<field label='工作要求' 
						   maxlength='20' 
						   type="textarea" 
						   v-model='posts.job_require'
						   placeholder='请填写该岗位的工作要求，如：男女不限，18-45岁，会粤语等'
						   :rules="[{ required: true, message: '请填写工作要求' }]"
					></field>
				</CellGroup>
			</view>
			<view class="p-lr30 blue-btn">
				<view class="left" @tap="preview">预览</view>
				<Button class="right" native-type="submit">{{ id ? '保存' : '发布' }}</Button>
			</view>
		</Form>
		<uni-popup ref="popup" background-color="#fff" type='bottom'>
			<areaList v-if='input_index == 2' @confirm='handleConfirm' @cancel='popup.close()' />
			<TimePicker  v-else-if='input_index == 3' title="选择时间" :columns-type="columnsType" @confirm="handleConfirm" />
			<Picker
			  v-else
			  :title="title"
			  :columns="type"
			  @cancel="popup.close()"
			  @confirm='handleConfirm'
			/>
		</uni-popup>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { Form, Field, CellGroup, Picker, TimePicker, Button } from 'vant'
import { addPosts, classify, detailsMeList, editMeList } from '@/api/api'
import { typeList, salary_type } from '@/utils/emnu'
import { RECRUITMENT_DETAILS, RECRUITMENT } from '@/common/path'

const posts = ref({ salary_type: 10, job_place_lon: '23.154545', job_place_lat: '23.00' })
const popup = ref(null)
const type_text = ref('')
const classify_text = ref('')   // classify_id
const classifyList = ref([])
const input_index = ref(0)
const address = ref('')
const id = ref(null)
const salary_type_text = ref('元/天')
let type = []
let title = ''
const columnsType = ['hour', 'minute', 'second'];

onLoad((options) => {
	if (options.id) {
		id.value = options
		getDetails()
	}
	getClassify()
})

const handleSubmit = async () => {
	id.value ? edit() : create()
}

const getDetails = async () => {
	await detailsMeList(id.value).then(res => {
		changeData(res.data)
	})
}

const changeData = data => {
	type_text.value = data.type_text
	classify_text.value = data.classify_text
	address.value = data.job_address
	salary_type_text.value = data.salary_type_text
	posts.value = data
}

const edit = async () => {
	posts.value.job_place_redundancy = address.value + posts.value.job_address
	await editMeList(posts.value).then(res => {
		uni.showToast({ title: '更新成功', icon: 'none', mask: true })
		setTimeout(() => {
			uni.navigateBack({ delta: 1 })
		}, 1500)
	})
}

const create = async () => {
	posts.value.job_place_redundancy = address.value + posts.value.job_address
	await addPosts(posts.value).then(res => {
		uni.showToast({ title: '发布成功', icon: 'none', mask: true })
		setTimeout(() => {
			uni.redirectTo({ url: RECRUITMENT })
		}, 1500)
	})
}

const getClassify = async () => {
	await classify({ limit: 100 }).then(res => {
		classifyList.value = res.data.data
	})
}

const handleConfirm = (event) => {
	let obj = {}
	popup.value.close()
	if (input_index.value == 2) {
		address.value = event.address
		return
	} else if (input_index.value == 3) {
		posts.value.job_time = event.selectedValues.join(':')
		return
	} else {
		obj = event.selectedOptions[0]
	}
	switch (input_index.value) {
		case 0:
			type_text.value = obj.text
			posts.value.type = obj.value
			break;
		case 1:
			classify_text.value = obj.text
			posts.value.classify_id = obj.value
			break;
		case 4:
			salary_type_text.value = obj.text
			posts.value.salary_type = obj.value
			break;
	}
}

const formatter = (type) => {
	console.log(type)
}

const openPopup = (index) => {
	input_index.value = index
	// if (input_index.value != 3) popup.value.open()
	// else show.value = true
	popup.value.open()
	switch(index) {
		case 0:
			type = typeList
			title = '求职类型'
			break;
		case 1:
			const arr = []
			classifyList.value.forEach(item => { arr.push({ text: item.title, value: item.id }) })
			type = arr
			title = '招聘类别'
			break;
		case 4:
			type = salary_type
			title = '薪资待遇'
			break;
	}
}

const preview = () => {
	const content = encodeURIComponent(JSON.stringify(posts.value))
	console.log(posts.value)
	uni.navigateTo({ url: `${RECRUITMENT_DETAILS}?content=${content}` })
}


</script>

<style lang="scss" scoped>
.input-box {
	.slot-btn {
		width: 120rpx;
		border-left: 1rpx solid #999;
		@include flex-box();
		.icon-down {
			transform: scale(.3);
			color: #999;
		}
	}
}
</style>