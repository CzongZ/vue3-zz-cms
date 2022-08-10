import zzRequest from '@/service'
import { IDataType } from '@/service/types'
export function getPageListData(url: string, data: any) {
  return zzRequest.post<IDataType>({
    url,
    data
  })
}

//url: users/id
export function deletePageData(url: string) {
  return zzRequest.delete<IDataType>({
    url
  })
}
