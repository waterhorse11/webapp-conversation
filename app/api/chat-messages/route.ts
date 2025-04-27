import { type NextRequest } from 'next/server'
import { clients, getInfo } from '@/app/api/utils/common'

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
  const appId = request.headers.get('x-app-id') || '43192a18-2b15-451e-9aec-37d55d5673db';
  const res = await clients[appId].createChatMessage(inputs, query, user, responseMode, conversationId, files)
  return new Response(res.data as any)
}
