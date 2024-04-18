import App from './App'
import './style.scss'
import {
	createSSRApp
} from 'vue'
import pinia from './stores'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
import * as utils from './utils/index.js'
import './static/iconfont/iconfont.css'

export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.$utils = {...utils}
	app.config.globalProperties.imgPath = utils.imgPath
	app.use(pinia)
	return {
		app,
		pinia,
	}
}