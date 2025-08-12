import { createAlova, type Method } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import { MessagePlugin } from 'tdesign-vue-next'

// 你自己的获取/保存 token 的方法（可替换为 Pinia 或其他方案）
const getAccessToken = () => localStorage.getItem('access_token') || ''
const setAccessToken = (token: string) => localStorage.setItem('access_token', token)

// 统一的错误提示（这里留空实现，按需替换成项目内的消息组件）
const notifyError = (msg: string) => {
  void MessagePlugin.error(msg)
}

// 扩展业务错误类型，避免使用 any
type BusinessError = Error & { raw?: unknown }

// 刷新 token 的占位逻辑（按需实现）
let refreshing = false
let waitQueue: Array<() => void> = []
const refreshToken = async (): Promise<string> => {
  if (refreshing) {
    await new Promise<void>((resolve) => waitQueue.push(resolve))
    return getAccessToken()
  }
  refreshing = true
  try {
    // TODO: 调用你的刷新接口
    // const newToken = await requestRefreshToken()
    const newToken = 'NEW_TOKEN_PLACEHOLDER'
    setAccessToken(newToken)
    return newToken
  } finally {
    refreshing = false
    waitQueue.forEach((fn) => fn())
    waitQueue = []
  }
}

const baseUrl = import.meta.env.VITE_BASE_API_URL

export const alova = createAlova({
  baseURL: baseUrl, // TODO: 使用你的后端地址
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  cacheFor: {
    GET: 0,
  },
  timeout: 15000, // 超时毫秒
  responded: {
    // 响应拦截：统一处理状态码与数据
    onSuccess: async (response: Response) => {
      if (!response.ok) {
        // 交给 onError 统一处理
        throw response
      }
      // 假设后端统一返回 { code, data, message }
      const json = (await response.json().catch(() => null)) as {
        code?: number
        data?: unknown
        message?: string
      } | null

      if (!json) return null
      const { code, data, message } = json
      if (code === 0 || code === 200) return data as unknown

      const err: BusinessError = new Error(message || '请求失败')
      err.raw = json
      console.log(err)
      throw err
    },
    onError: async (error: unknown, method: Method) => {
      // 处理 401：尝试刷新 Token 并重发请求
      if (error instanceof Response) {
        if (error.status === 401) {
          try {
            await refreshToken()
            // beforeRequest 会读取最新 token 自动注入
            return method.send()
          } catch {
            notifyError('登录状态已过期，请重新登录')
          }
        }
        // 其它 HTTP 错误
        notifyError(`请求失败：${error.status}`)
      } else if (error instanceof Error) {
        // JS Error（超时、网络异常或业务错误）
        notifyError(error.message || '网络异常')
      } else {
        notifyError('未知错误')
      }
      throw error
    },
  },
  beforeRequest: (method) => {
    // 统一注入 token、通用 header
    const token = getAccessToken()
    method.config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(method.config.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    if (method.type === 'GET') {
      // 使用 params 更稳妥，alova 会合并到 URL 查询参数
      const cfg = method.config as { params?: Record<string, unknown> }
      cfg.params = {
        ...(cfg.params || {}),
        _t: Date.now(),
      }
    }
  },
})
