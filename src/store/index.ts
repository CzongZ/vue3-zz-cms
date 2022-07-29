import { createStore, Store, useStore as VuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import login from './login/login'
import system from './main/system'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'czz',
      password: '123'
    }
  },
  modules: { login, system }
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
