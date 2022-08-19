import { ILoginState } from './login/types'
import { ISystemState } from './main/system/type'
export interface IRootState {
  name: string
  password: string
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
