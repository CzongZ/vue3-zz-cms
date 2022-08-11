import PageModalVue from '@/components/page-modal'
import { ref } from 'vue'

type callbackFn = () => void
export function userPageModal(createCb?: callbackFn, editCb?: callbackFn): any {
  const defaultInfo = ref({})
  const pageModalRef = ref<InstanceType<typeof PageModalVue>>()
  const handleCreateData = () => {
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
      defaultInfo.value = {}
    }
    createCb && createCb()
  }
  const handleEditData = (item: any) => {
    if (pageModalRef.value) {
      defaultInfo.value = { ...item }
      pageModalRef.value.dialogVisible = true
    }
    editCb && editCb()
  }
  return [pageModalRef, defaultInfo, handleCreateData, handleEditData]
}
