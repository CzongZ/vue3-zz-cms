<template>
  <div class="page-content">
    <zz-table-vue
      :listData="dataList"
      v-bind="contentTableConfig"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- 头部插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary">新建</el-button>
      </template>
      <!-- 列中的插槽 -->

      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>

      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>

      <template #handler>
        <div class="handle-btns">
          <el-button v-if="isUpdate" link type="primary" size="small"
            ><el-icon><Edit /></el-icon>编辑</el-button
          >
          <el-button v-if="isDelete" link type="primary" size="small"
            ><el-icon><Delete /></el-icon>删除</el-button
          >
        </div>
      </template>
      <!-- 遍历其他名称的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </zz-table-vue>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import zzTableVue from '@/base-ui/table'
import { useStore } from '@/store'
import { userPermission } from '@/hooks/user-permission'
export default defineComponent({
  components: {
    zzTableVue
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },

  setup(props) {
    // 获取操作的权限
    const isCreate = userPermission(props.pageName, 'create')
    const isUpdate = userPermission(props.pageName, 'update')
    const isDelete = userPermission(props.pageName, 'delete')
    const isQuery = userPermission(props.pageName, 'query')
    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })

    const store = useStore()
    watch(pageInfo, () => getPageData())
    // 发送请求
    const getPageData = (queryInfo: any = {}) => {
      // 没有权限跳出
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // 获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    // const userCount = computed(() => store.state.system.userCount)
    // 获取其他动态插槽名称
    const otherPropSlots = props.contentTableConfig.propList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      getPageData
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 30px;
}
.handle-btns {
  display: flex;
  justify-content: center;
}
</style>
