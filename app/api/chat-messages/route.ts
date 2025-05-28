import { type NextRequest } from 'next/server'
import { clients, getInfo } from '@/app/api/utils/common'
import { AI_PLUS_CONFIGS } from '@/config'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const {
    inputs,
    query,
    files,
    conversation_id: conversationId,
    response_mode: responseMode,
  } = body
  const { user } = await getInfo(request)
  const defaultAppId = Object.values(AI_PLUS_CONFIGS).find(config => config.appName === 'general')?.appId || '';
  const appId = request.headers.get('x-app-id') || defaultAppId;
  const res = await clients[appId].createChatMessage(inputs, query, user, responseMode, conversationId, files)
  return new Response(res.data as any)
}
