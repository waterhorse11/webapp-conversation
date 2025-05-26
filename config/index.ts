import type { AppInfo } from '@/types/app'
let currentAppId = `${process.env.NEXT_PUBLIC_APP_ID}`
let currentApiKey = `${process.env.NEXT_PUBLIC_APP_KEY}`
export const APP_ID = `${process.env.NEXT_PUBLIC_APP_ID}`
export const API_KEY = `${process.env.NEXT_PUBLIC_APP_KEY}`
// 使用getter函数来获取最新的值
export const getAppId = () => currentAppId
export const getApiKey = () => currentApiKey
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`

export const APP_INFO: AppInfo = {
  title: 'WAC AI HUB',
  description: '',
  copyright: '',
  privacy_policy: '',
  default_language: 'zh-Hans',
}

// AI Plus
// AI+ 应用配置映射
export const AI_PLUS_CONFIGS: Record<string, { appName: string; appId: string; apiKey: string }> = {
  '43192a18-2b15-451e-9aec-37d55d5673db': {
    appName: 'general',
    appId: process.env.NEXT_PUBLIC_APP_ID || '',
    apiKey: process.env.NEXT_PUBLIC_APP_KEY || ''
  },
  'fff43c71-e05d-40d0-b533-e1c9a4df1c5a': {
    appName: 'zh2en',
    appId: process.env.NEXT_PUBLIC_AI_PLUS_ZH2EN_ID || '',
    apiKey: process.env.NEXT_PUBLIC_AI_PLUS_ZH2EN_KEY || ''
  },
  'f03012f1-1b9f-4383-9ac7-99d7cc5a23ce': {
    appName: 'pdf-translator',
    appId: process.env.NEXT_PUBLIC_AI_PLUS_PDF_TRANSLATOR_ID || '',
    apiKey: process.env.NEXT_PUBLIC_AI_PLUS_PDF_TRANSLATOR_KEY || ''
  },
  // 可以继续添加其他应用的配置
}

export function updateConfig(appId: string) {
  const config = AI_PLUS_CONFIGS[appId]
  if (config) {
    currentAppId = config.appId
    currentApiKey = config.apiKey
  } else {
    // 恢复默认配置
    currentAppId = `${process.env.NEXT_PUBLIC_APP_ID}`
    currentApiKey = `${process.env.NEXT_PUBLIC_APP_KEY}`
  }
}

export const isShowPrompt = false
export const promptTemplate = 'I want you to act as a javascript console.'

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48


