import { App } from 'vue'
import 'element-plus/dist/index.css'
// 按需引入组件
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElRadio,
  ElTabPane,
  ElTabs,
  ElIcon
} from 'element-plus/lib/index'

// 按需引入图标
import { User, Cellphone } from '@element-plus/icons-vue'
const components = [
  // 组件部分注册
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElIcon,
  // 图标部分注册
  User,
  Cellphone
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
