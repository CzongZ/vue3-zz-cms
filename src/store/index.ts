import { createStore, Store, useStore as VuexStore } from 'vuex'
import { IRootStore, IStoreType } from './types'
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

// 封装支持类型推到的store
export function useStore(): Store<IStoreType> {
  return VuexStore()
}
export default store
