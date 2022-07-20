import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 封装拦截器接口
// 设置为可选属性
interface ZZInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any

  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

interface ZZRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZZInterceptors<T>
}

export { ZZInterceptors, ZZRequestConfig }
