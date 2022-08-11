import zzRequest from '@/service'
import { IDataType } from '@/service/types'
// 查询请求
export function getPageListData(url: string, data: any) {
  return zzRequest.post<IDataType>({
    url,
    data
  })
}

// 删除请求
//url: users/id
export function deletePageData(url: string) {
  return zzRequest.delete<IDataType>({
    url
  })
}

// 新建请求
export function createPageData(url: string, data: any) {
  return zzRequest.post<IDataType>({
    url,
    data
  })
}

// 编辑请求
export function editPageData(url: string, data: any) {
  return zzRequest.patch<IDataType>({
    url,
    data
  })
}
