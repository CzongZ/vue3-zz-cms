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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearchVue from '@/components/page-search'
import PageContentVue from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { userPageSearch } from '@/hooks/user-page-search'
export default defineComponent({
  name: 'user',
  components: {
    PageSearchVue,
    PageContentVue
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] =
      userPageSearch()
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick
      // ...userPageSearch()
    }
  }
})
</script>

<style scoped lang="less"></style>
