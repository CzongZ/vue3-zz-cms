import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ZZInterceptors, ZZRequestConfig } from './type'

class ZZRequest {
  instance: AxiosInstance
  interceptors?: ZZInterceptors
  constructor(config: ZZRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 封装可能使用的实例拦截器
    // 发送拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 接收拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局拦截器
  }

  // 封装请求方法
  request<T>(config: ZZRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对config的拦截处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config)
      }

      // 调用实例
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对返回数据的拦截处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res)
          }
          // 将res返回
          resolve(res)
        })
        .catch((err) => {
          // 将err返回
          reject(err)
        })
    })
  }
  get<T>(config: ZZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: ZZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: ZZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: ZZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default ZZRequest
