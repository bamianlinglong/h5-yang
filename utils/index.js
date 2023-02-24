export const debounce = (fn, time) => {
    let timeId = null
    return function() {
        if (timeId != null) {
            clearInterval(timeId)
        }
        timeId = setTimeout(() => {
            fn.apply(fn, arguments)
        }, time || 500)
    }
}

export const formatKm = (d) => {
	const dis = typeof d == 'string' ? Number(d) : d
	return dis <= 10000 ? dis + 'm' : (dis / 1000).toFixed(2) + 'km' 
}

export const formatTime = (time, format) => {
	const d = new Date(1675159851)
	const y = d.getFullYear()
	const m = filterTime(d.getMonth() + 1) 
	const day = filterTime(d.getDay()) 
	const h = filterTime(d.getHours()) 
	const mm = filterTime(d.getMinutes()) 
	const s = filterTime(d.getSeconds()) 
	
	if (format == 'YYYY-MM-DD') {
		return `${y}-${m}-${day}`
	}
	if (format == 'YYYY-mm-dd') {
		return `${y}年${m}月${day}日`
	}
	if (format == 'YYYY-MM-DD hh:mm:ss') {
		return `${y}-${m}-${day} ${h}:${mm}:${s}`
	}
	if (format == 'YYYY-mm-dd hh:mm:ss') {
		return `${y}年${m}月${day}日 ${h}:${mm}:${s}`
	}
	if (format == 'MM-DD hh:mm') {
		return `${m}-${day} ${mm}:${s}`
	}
	if (format == 'mm-dd hh:mm') {
		return `${m}月${day}日 ${mm}:${s}`
	}
	
}

export const filterTime = (t) => {
	return t < 10 ? '0' + t : t
}

export const getLocalAddress = () => {
	uni.getLocation({
		success(res) {
			return res
		}
	})
}

export const findTypeName = (list, status) => {
	const obj = list.find(item => item.code == status)
	return obj.name
}

export const navigateBackTo = (param) => {
	const pages = getCurrentPages()
	if (pages.length == 1) {
		typeof param == 'number' ? history.go(-param) : history.back()
	} else {
		uni.navigateBack({ delta: typeof param == 'number' ? param : 1})
	}
}