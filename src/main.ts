import { createApp } from 'vue'
// 核心部分注册
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
import { setupStore } from './store'
// 全局样式重置
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
// 注册element及其他
app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)
app.mount('#app')
