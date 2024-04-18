import Vue from 'vue'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'
import plugins from './plugins'
import directive from './directive'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css

import App from './App'
import store from './store'
import router from './router'

import './assets/icons' // 导入svg图标
import './permission' // 权限控制

import {imgPath,handleTree,parseTime,resetForm,addDateRange} from './utils'
// 分页组件
import Pagination from "@/components/Pagination";
// 字典标签组件
import DictTag from '@/components/DictTag'
// 字典数据组件
import DictData from '@/components/DictData'
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
import ImagePreview from "@/components/ImagePreview"

Vue.prototype.imgPath = imgPath
Vue.prototype.handleTree = handleTree
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange

Vue.component('DictTag', DictTag)
Vue.component('RightToolbar', RightToolbar)
Vue.component('Pagination', Pagination)
Vue.component('ImagePreview', ImagePreview)

Vue.use(Element)
Vue.use(plugins)
Vue.use(directive)
DictData.install()  // 应用字典mixins

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
