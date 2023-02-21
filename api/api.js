import { requset } from '@/utils/request.js'

// 登录
export const login = (data) => {
	return requset('/api/user/login', data, 'post')
}

// 检测token是否过期
export const chekToken = () => {
	return requset('/api/token/refresh', {}, 'get')
}

// 消息中心
export const msgList = data => {
	return requset('/api/my_center.message/list', data, 'get')
}

// 搜索职位（职位列表）
export const getPotos = data => {
	return requset('/api/search/posts', data, 'get')
}

// 搜索职位详情（职位列表详情）
export const getPotosDetail = data => {
	return requset('/api/posts/details', data, 'get')
}

// 搜索职位详情评价列表（职位列表详情评价列表）
export const getEvaluate = data => {
	return requset('/api/posts.evaluate/List', data, 'get')
}
 
// 收藏、取消职位
export const setCollect = data => {
	return requset('/api/posts/collect', data, 'post')
}

// 收藏职位列表
export const getCollectList = data => {
	return requset('/api/my_center.collection/postsList', data, 'get')
}

// 投递职位（立即报名）
export const deliverName = data => {
	return requset('/api/posts/deliver', data, 'get')
}
 
// 搜索简历（简历库）
export const searchResume = data => {
	return requset('/api/search/resume', data, 'get')
}

// 简历详情
export const resumeDetails = data => {
	return requset('/api/my_center.deliver/resumeDetails', data, 'get')
}

// 分类列表（求职类型）
export const classify = data => {
	return requset('/api/posts.classify/list', data, 'get')
}
 
// 个人中心-查看建立
export const resumeList = data => {
	return requset('/api/my_center.deliver/resumeList', data, 'get')
}

// 预览自己的简历
export const preview = data => {
	return requset('/api/my_center.resume/preview', data, 'get')
}

// 编辑简历
export const editResume = data => {
	return requset('/api/my_center.resume/edit', data, 'post')
}

// 个人中心-评价列表
export const meList = data => {
	return requset('/api/my_center.evaluate/meList', data, 'get')
}

// 评价列表-对我的评价
export const toMeList = data => {
	return requset('/api/my_center.evaluate/toMeList', data, 'get')
}
 
// 应聘记录
export const applyList = data => {
	return requset('/api/my_center.deliver/applyList', data, 'get')
}

// 拒绝简历
export const refuseResume = data => {
	return requset('/api/my_center.deliver/refuseResume', data, 'post')
}

// 通过简历
export const passResume = data => {
	return requset('/api/my_center.deliver/passResume', data, 'post')
}

// 发布职位
export const addPosts = data => {
	return requset('/api/my_center.posts/add', data, 'post')
}

// 发布职位
export const myMeList = data => {
	return requset('/api/my_center.posts/meList', data, 'get')
}

// 上下架
export const changeMeList = data => {
	return requset('/api/my_center.posts/change', data, 'post')
}

// 编辑职位
export const editMeList = data => {
	return requset('/api/my_center.posts/edit', data, 'post')
}

// 职位详情
export const detailsMeList = data => {
	return requset('/api/my_center.posts/details', data, 'get')
}

// bannber
export const bannerList = data => {
	return requset('/api/advertising/list', data, 'get')
}

// 用户信息
export const getInfo = data => {
	return requset('/api/user/info', data, 'get')
}

// 公司申请
export const apply = data => {
	return requset('/api/my_center.company/apply', data, 'post')
}