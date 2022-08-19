<template>
  <div class="role">
    <page-search-vue :searchFormConfig="searchFormConfig" />
    <page-content-vue
      pageName="role"
      :contentTableConfig="contentTableConfig"
      @createBtnClick="handleCreateData"
      @editBtnClick="handleEditData"
    />
    <page-modal-vue
      :modalConfig="modalConfig"
      pageName="role"
      ref="pageModalRef"
      category="角色"
      :otherInfo="otherInfo"
      :defaultInfo="defaultInfo"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        @check="handleCheckChange"
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
      />
    </page-modal-vue>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'
import PageSearchVue from '@/components/page-search'
import PageContentVue from '@/components/page-content'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import PageModalVue from '@/components/page-modal'
import { modalConfig } from './config/modal.config'
import { userPageModal } from '@/hooks/user-page-modal'
import { useStore } from '@/store'
import { menuMapLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

export default defineComponent({
  components: {
    PageSearchVue,
    PageContentVue,
    PageModalVue
  },
  name: 'role',
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
      userPageModal(undefined, editCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleCreateData,
      handleEditData,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
