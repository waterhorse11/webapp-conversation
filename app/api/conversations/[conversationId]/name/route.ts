import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { clients, getInfo } from '@/app/api/utils/common'
import { AI_PLUS_CONFIGS } from '@/config';
export async function POST(request: NextRequest, { params }: {
  params: { conversationId: string }
}) {
  const body = await request.json()
  const {
    auto_generate,
    name
  } = body
  const { conversationId } = params
  const { user } = getInfo(request)
  const defaultAppId = Object.values(AI_PLUS_CONFIGS).find(config => config.appName === 'general')?.appId || '';
  const appId = request.headers.get('x-app-id') || defaultAppId;

  // auto generate name
  const { data } = await clients[appId].renameConversation(conversationId, name, user, auto_generate)
  return NextResponse.json(data)
}
