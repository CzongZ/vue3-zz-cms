<template>
  <div class="zz-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      fit
      tooltip-effect="light"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="showSelectColum" align="center" type="selection" />
      <el-table-column
        v-if="showIndexColum"
        align="center"
        label="序号"
        type="index"
        width="65"
      />
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column show-overflow-tooltip v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer">
      <slot name="footer">
        <el-pagination
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          small="small"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array as PropType<any>,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array as PropType<any>,
      default: () => []
    },
    showIndexColum: {
      type: Boolean,
      default: false
    },
    showSelectColum: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(prop, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...prop.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...prop.page, currentPage })
    }
    return { handleSelectionChange, handleSizeChange, handleCurrentChange }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;
  display: flex;
  justify-content: end;
  .el-pagination {
    text-align: right;
  }
}
</style>
