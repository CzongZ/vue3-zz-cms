import zzRequest from '@/service'
import { IDataType } from '@/service/types'
export function getPageListData(url: string, data: any) {
  return zzRequest.post<IDataType>({
    url,
    data
  })
}
