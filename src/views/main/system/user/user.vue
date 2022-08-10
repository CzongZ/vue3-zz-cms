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
      :modalConfig="modalConfig"
      title="新建用户"
      :defaultInfo="defaultInfo"
    ></page-modal-vue>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
    const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
      userPageModal()

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,

      pageContentRef,
      handleResetClick,
      handleQueryClick,

      pageModalRef,
      defaultInfo,
      handleCreateData,
      handleEditData
      // ...userPageSearch()
    }
  }
})
</script>

<style scoped lang="less"></style>
