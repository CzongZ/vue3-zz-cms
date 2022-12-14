<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="defTitle"
      width="30%"
      center
      destroy-on-close
    >
      <zz-form-vue v-bind="modalConfig" v-model="formData"></zz-form-vue>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import zzFormVue from '@/base-ui/form'
import { useStore } from '@/store'

export default defineComponent({
  components: { zzFormVue },
  props: {
    pageName: {
      type: String,
      required: true
    },
    category: {
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
    },
    otherInfo: {
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
        if (Object.keys(props.defaultInfo).length)
          defTitle.value = `编辑${props.category}`
        else defTitle.value = `新建${props.category}`

        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    // 点击确认按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        //编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return { defTitle, dialogVisible, formData, handleConfirmClick }
  }
})
</script>

<style scoped></style>
