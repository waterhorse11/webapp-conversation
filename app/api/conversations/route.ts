import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { clients, getInfo, setSession } from '@/app/api/utils/common'

export async function GET(request: NextRequest) {
  const { sessionId, user } = getInfo(request)
  try {
    const appId = request.headers.get('x-app-id') || '43192a18-2b15-451e-9aec-37d55d5673db';
    if (!appId) {
      return NextResponse.json({ error: 'app_id is required' }, { status: 400 })
    }
    const { data }: any = await clients[appId].getConversations(user)
    return NextResponse.json(data, {
      headers: setSession(sessionId),
    })
  }
  catch (error: any) {
    return NextResponse.json({
      data: [],
      error: error.message,
    })
  }
}
