import { createStore, Store, useStore as VuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import { getPageListData } from '@/service/main/system/system'
import login from './login/login'
import system from './main/system'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'czz',
      password: '123',
      entireDepartment: [],
      entireRole: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 999
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 999
      })
      const { list: roleist } = roleResult.data
      // 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleist)
    }
  },
  modules: { login, system }
})
// 初始化vuex值
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

// 封装支持类型推到的store
export function useStore(): Store<IStoreType> {
  return VuexStore()
}
export default store
