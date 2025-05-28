import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { clients, getInfo, setSession } from '@/app/api/utils/common'
import { AI_PLUS_CONFIGS } from '@/config'

export async function GET(request: NextRequest) {
  const { sessionId, user } = getInfo(request)
  const { searchParams } = new URL(request.url)
  const conversationId = searchParams.get('conversation_id')
  const defaultAppId = Object.values(AI_PLUS_CONFIGS).find(config => config.appName === 'general')?.appId || '';
  const appId = request.headers.get('x-app-id') || defaultAppId;
  if (!appId) {
    return NextResponse.json({ error: 'app_id is required' }, { status: 400 })
  }
  const { data }: any = await clients[appId].getConversationMessages(user, conversationId as string)
  return NextResponse.json(data, {
    headers: setSession(sessionId),
  })
}
