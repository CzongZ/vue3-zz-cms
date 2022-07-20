import { createStore } from 'vuex'
import { IRootStore } from './types'
import login from './login/login'
const store = createStore<IRootStore>({
  state() {
    return {
      name: 'czz',
      password: '123'
    }
  },
  modules: { login }
})
// 初始化vuex值
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
export default store
