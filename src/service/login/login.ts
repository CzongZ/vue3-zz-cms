import zzRequest from '../index'
import { IAccount, ILoginResult, IDataType } from './types'

enum LoginApi {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}
// 验证登录
export function accountLoginRequest(account: IAccount) {
  return zzRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account
  })
}

// 获取登录用户信息
export function requestUserInfoById(id: number) {
  return zzRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id
  })
}
// 获取登录用户的菜单
export function requestUserMenusByRoleId(id: number) {
  return zzRequest.get<IDataType>({
    url: LoginApi.UserMenus + id + '/menu'
  })
}
