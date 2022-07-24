import { ILoginStore } from './login/types'
export interface IRootStore {
  name: string
  password: string
}

export interface IRootWithModule {
  login: ILoginStore
}

export type IStoreType = IRootStore & IRootWithModule
