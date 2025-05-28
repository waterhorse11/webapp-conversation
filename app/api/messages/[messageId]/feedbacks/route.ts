import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { clients, getInfo } from '@/app/api/utils/common'
import { AI_PLUS_CONFIGS } from '@/config'

export async function POST(request: NextRequest, { params }: {
  params: { messageId: string }
}) {
  const body = await request.json()
  const {
    rating,
  } = body
  const { messageId } = params
  const { user } = getInfo(request)
  const defaultAppId = Object.values(AI_PLUS_CONFIGS).find(config => config.appName === 'general')?.appId || '';
  const appId = request.headers.get('x-app-id') || defaultAppId;
  const { data } = await clients[appId].messageFeedback(messageId, { rating, user })
  return NextResponse.json(data)
}
