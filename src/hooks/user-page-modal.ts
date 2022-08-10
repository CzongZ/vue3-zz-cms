import PageModalVue from '@/components/page-modal'
import { ref } from 'vue'

export function userPageModal(): any {
  const defaultInfo = ref({})
  const pageModalRef = ref<InstanceType<typeof PageModalVue>>()
  const handleCreateData = () => {
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
      defaultInfo.value = {}
    }
  }
  const handleEditData = (item: any) => {
    if (pageModalRef.value) {
      defaultInfo.value = { ...item }
      pageModalRef.value.dialogVisible = true
    }
  }
  return [pageModalRef, defaultInfo, handleCreateData, handleEditData]
}
