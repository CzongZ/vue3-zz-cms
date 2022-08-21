import { ILoginState } from './login/types'
import { ISystemState } from './main/system/type'
import { IDashboardState } from './main/analysis/types'
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
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
