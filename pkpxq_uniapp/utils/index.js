import {
	fileUrl
} from './config.js'

export const imgPath = (url) => {
	if (!url) return
	if (url.includes('http://') || url.includes('https://')) {
		return url
	} else {
		return fileUrl + url
	}
}