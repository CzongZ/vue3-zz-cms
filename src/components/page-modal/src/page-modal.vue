<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="defTitle ?? title"
      width="30%"
      center
    >
      <zz-form-vue v-bind="modalConfig" v-model="formData"></zz-form-vue>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import zzFormVue from '@/base-ui/form'

export default defineComponent({
  components: { zzFormVue },
  props: {
    title: {
      type: String,
      default: ''
    },
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const defTitle = ref()
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newValue) => {
        console.log(newValue)
        defTitle.value = newValue.id ? `编辑${props.title.slice(2)}` : null
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    return { defTitle, dialogVisible, formData }
  }
})
</script>

<style scoped></style>
