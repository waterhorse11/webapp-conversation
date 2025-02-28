import { type NextRequest } from 'next/server'
import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_KEY, API_URL, APP_ID } from '@/config'

const userPrefix = `user_${APP_ID}:`

export const getInfo = (request: NextRequest) => {
  // 获取用户 IP 并处理 IPv4-mapped IPv6 地址
  let ip = request.ip ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    'unknown'

  // 如果是 IPv4-mapped IPv6 地址，提取 IPv4 部分
  if (ip.startsWith('::ffff:')) {
    ip = ip.substring(7)
  }

  // 从 cookie 获取现有的 sessionId，如果没有则生成新的
  const sessionId = request.cookies.get('session_id')?.value || v4()

  // 将 IP 和 sessionId 组合
  const combinedId = `${sessionId}-${ip}`
  const user = userPrefix + combinedId

  return {
    sessionId,
    user,
    ip,
  }
}

export const setSession = (sessionId: string) => {
  return {
    'Set-Cookie': `session_id=${sessionId}; Path=/; HttpOnly; SameSite=Strict`
  }
}

export const client = new ChatClient(API_KEY, API_URL || undefined)
