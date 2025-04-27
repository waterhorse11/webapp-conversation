import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { clients, getInfo } from '@/app/api/utils/common'

export async function POST(request: NextRequest, { params }: {
  params: { messageId: string }
}) {
  const body = await request.json()
  const {
    rating,
  } = body
  const { messageId } = params
  const { user } = getInfo(request)
  const appId = request.headers.get('x-app-id') || '43192a18-2b15-451e-9aec-37d55d5673db';
  const { data } = await clients[appId].messageFeedback(messageId, { rating, user })
  return NextResponse.json(data)
}
