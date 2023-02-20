<template>
	<view class="login-box">
		<view class="p40 login-form">
			<view class="p-b40 t-c login-form-title">羊羊登录</view>
			<uni-forms ref="loginForm" label-align='right' :modelValue="formState" :rules='rules'>
				<uni-forms-item label="用户名:" name="account">
					<uni-easyinput :clearable='false' v-model="formState.account" placeholder="请输入用户名"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="密码:" name="password">
					<uni-easyinput :clearable='false' type="password" v-model="formState.password" placeholder="请输入密码"></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
			<view class="t-c login-btn" @click="handleLogin">登录</view>
		</view>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { INDEX } from '@/common/path'
import { login } from '@/api/api'

const loginForm = ref(null)
const formState = reactive({
	account: 'maolvxiansheng',
	password: '123456'
})

const rules = reactive({
	account: {
		rules: [{ required: true, errorMessage: '请输入用户名' }]
	},
	password: {
		rules: [{ required: true, errorMessage: '请输入密码' }]
	}
})


const handleLogin = () => {
	loginForm.value.validate(valid => {
		if (valid) return
		login(formState).then(res => {
			const { userinfo } = res.data
			uni.setStorageSync('token', userinfo.token)
			uni.setStorageSync('userinfo', userinfo)
			uni.showToast({ title: '登录成功', mask: true })
			setTimeout(() => {
				uni.reLaunch({ url: INDEX })
			}, 1500)
		})
	})
	
	
}
</script>

<style lang="scss" scoped>
page {
	// background-color: rebeccapurple;
	background: linear-gradient(90deg, #74e0a9, #2cc998);
}
.login-form {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 600rpx;
	height: 240px;
	border-radius: 20rpx;
	background-color: #fff;
	box-shadow: 4rpx 4rpx 20rpx rgba(255,255,255, .5);
	
	&-title {
		font-size: 40rpx;
		font-weight: 600;
	}
}
.login-btn {
	height: 80rpx;
	font-size: 16rpx;
	color: #fff;
	background-color: #398ade;
	border-radius: 10rpx;
	line-height: 80rpx;
}
</style>