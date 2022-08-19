<template>
  <div class="user">
    <page-search-vue
      :search-form-config="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content-vue
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @createBtnClick="handleCreateData"
      @editBtnClick="handleEditData"
    >
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content-vue>
    <page-modal-vue
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      category="用户"
      pageName="users"
      :defaultInfo="defaultInfo"
    >
    </page-modal-vue>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

import PageSearchVue from '@/components/page-search'
import PageContentVue from '@/components/page-content'
import PageModalVue from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { userPageSearch } from '@/hooks/user-page-search'
import { userPageModal } from '@/hooks/user-page-modal'
export default defineComponent({
  name: 'user',
  components: {
    PageSearchVue,
    PageContentVue,
    PageModalVue
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] =
      userPageSearch()
    // 补充新建和编辑的hook操作
    // 处理表单中密码输入框显示逻辑
    const createCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
      console.log(passwordItem?.isHidden)
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    // 动态添加部门和角色的options
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id, lable: item.name }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id, lable: item.name }
      })
      return modalConfig
    })

    // 使用hook获取公共函数和变量
    const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
      userPageModal(createCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,

      pageContentRef,
      handleResetClick,
      handleQueryClick,

      pageModalRef,
      defaultInfo,
      handleCreateData,
      handleEditData,
      createCallback,
      editCallback
      // ...userPageSearch()
    }
  }
})
</script>

<style scoped lang="less"></style>
