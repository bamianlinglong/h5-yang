import { baseUrl } from './config'
import { LOGIN } from '@/common/path'
 // application/x-www-form-urlencoded   application/json
const baseEnv = process.env.NODE_ENV
export const requset = (url, data, method = 'get', contentType = 'application/json') => {
	return new Promise((resolve, reject) => {
		const header = {
			'content-type': contentType
		}
		// const baseEnv = process.env.NODE_ENV
		const token = uni.getStorageSync('token')
		token ? header['Token'] = token : ''
		uni.showLoading({ title: '加载中', mask: true })
		uni.request({
			url: baseUrl[baseEnv] + url,
			data: data,
			method: method,
			header: header,
			success(res) {
				uni.hideLoading()
				if (res.data.code == 1) {
					resolve(res.data)
				} else {
					uni.showToast({
						title: res.data.msg,
						mask: true,
						icon: 'none'
					})
					reject(res.data)
					if (res.data.code == 401) {
						setTimeout(() => { uni.navigateTo({ url: LOGIN }) }, 1500)
						return
					}
					
				}
			},
			fail(err) {
				uni.hideLoading()
				reject(err)
			}
		})
	})
}