<template>
  <div class="page-search">
    <zz-form-vue v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h4>高级查询</h4>
      </template>
      <template #footer>
        <div class="foot-btns">
          <el-button icon="RefreshLeft" @click="handleRestClick"
            >重置</el-button
          >
          <el-button type="primary" icon="Search" @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </zz-form-vue>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import zzFormVue from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    zzFormVue
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 动态决定formData里的属性
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 完善用户点击重置
    const handleRestClick = () => {
      formData.value = formOriginData

      emit('resetBtnClick')
    }

    // 完善用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return { formData, handleRestClick, handleQueryClick }
  }
})
</script>

<style scoped>
.foot-btns {
  text-align: right;
  padding: 0 30px 20px 0;
}
</style>
