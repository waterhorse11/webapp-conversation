import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { clients, getInfo } from '@/app/api/utils/common'

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
  const appId = request.headers.get('x-app-id') || '43192a18-2b15-451e-9aec-37d55d5673db';

  // auto generate name
  const { data } = await clients[appId].renameConversation(conversationId, name, user, auto_generate)
  console.log(data)
  return NextResponse.json(data)
}
