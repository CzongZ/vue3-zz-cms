import PageContentVue from '@/components/page-content'
import { ref } from 'vue'
export function userPageSearch(): any {
  const pageContentRef = ref<InstanceType<typeof PageContentVue>>()
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
