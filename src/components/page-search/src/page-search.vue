<template>
  <div class="page-search">
    <zz-form-vue v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h4>高级查询</h4>
      </template>
      <template #footer>
        <div class="foot-btns">
          <el-button icon="RefreshLeft">重置</el-button>
          <el-button type="primary" icon="Search">搜索</el-button>
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
  setup() {
    const formData = ref({
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return { formData }
  }
})
</script>

<style scoped>
.foot-btns {
  text-align: right;
  padding: 0 30px 20px 0;
}
</style>
