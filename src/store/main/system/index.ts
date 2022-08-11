import { Module } from 'vuex'

import { ISystemState } from './type'
import { IRootState } from '@/store/types'
import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from '@/service/main/system/system'
const system: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    // 查询
    async getPageListAction({ commit }, payload: any) {
      // 获取pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // 1.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    // 删除
    async deletePageDataAction({ dispatch }, payload: any) {
      // pageName
      // id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await deletePageData(pageUrl)
      // 重新获取数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    },
    // 新建
    async createPageDataAction({ dispatch }, payload: any) {
      // 创建数据请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      // 请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    },
    // 编辑
    async editPageDataAction({ dispatch }, payload: any) {
      // 编辑数据请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      // 请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    }
  }
}
export default system
