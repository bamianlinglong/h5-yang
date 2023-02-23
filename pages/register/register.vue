<template>
	<view class="m-t30">
		<Form @submit="onSubmit">
		  <CellGroup inset>
		    <Field
		      label="用户名"
		      placeholder="请填写用户名"
			  v-model='userState.username'
		      :rules="[{ required: true, message: '请填写用户名' }]"
		    ></Field>
		    <Field
		      type="password"
		      label="密码"
		      placeholder="请填写密码"
		      :rules="[{ required: true, message: '请填写密码' }]"
			  v-model='userState.password'
		    />
			<field
			  label="邮箱"
			  placeholder="请填写邮箱"
			  v-model='userState.email'
			  :rules="[{ required: true, message: '请填写邮箱' }]"
			/>
			<field
			  label="手机号"
			  placeholder="请填写手机号"
			  v-model='userState.mobile'
			  :rules="[{ validator: validatePhone, message: '请填写正确手机号' }]"
			/>
		  </CellGroup>
		  <div class='blue-btn'>
		    <Button class="right" native-type="submit">提交</Button>
		  </div>
		</Form>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field, CellGroup, Button } from 'vant';
import { register } from '@/api/api'
import { INDEX } from '@/common/path'

const userState = ref({})

const validatePhone = (val) => {
	const reg = /^1[3-9]\d{9}$/
	if (!reg.test(val)) {
		return '请输入正确的手机号'
	}
}

const onSubmit = async (val) => {
	userState.value.code = 'afsf'
	await register(userState.value).then(res => {
		uni.setStorageSync('token', res.data.userinfo.token)
		uni.setStorageSync('userinfo', res.data.userinfo)
		uni.showToast({ title: '注册成功', mask:true })
		setTimeout(() => { uni.reLaunch({ url: INDEX }) }, 1500)
	})
}
</script>

<style lang="scss" scoped>
page {
	background-color: #f4f8f8;
}
.right {
	width: 690rpx !important;
	margin: 0 auto;
}
</style>