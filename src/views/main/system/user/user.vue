<template>
  <div class="user">
    <page-search-vue :search-form-config="searchFormConfig" />
    <zz-table-vue :listData="userList" :propList="propList">
      <template #status="scope">
        <el-button>{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
      </template>
    </zz-table-vue>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { searchFormConfig } from './config/search.config'
import pageSearchVue from '@/components/page-search'
import zzTableVue from '@/base-ui/table'
export default defineComponent({
  name: 'user',
  components: {
    pageSearchVue,
    zzTableVue
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)
    const propList = [
      {
        prop: 'name',
        label: '用户名'
      },
      { prop: 'realname', label: '真实姓名' },
      { prop: 'cellphone', label: '手机号码' },
      { prop: 'enable', label: '状态', slotName: 'status' },
      { prop: 'createAt', label: '创建时间', slotName: 'createAt' },
      { prop: 'updateAt', label: '修改时间', slotName: 'updateAt' }
    ]
    return { searchFormConfig, userList, userCount, propList }
  }
})
</script>

<style scoped lang="less">
.zz-table-vue {
  padding: 30px;
}
</style>
