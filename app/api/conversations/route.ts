import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { clients, getInfo, setSession } from '@/app/api/utils/common'
import { AI_PLUS_CONFIGS } from '@/config';

export async function GET(request: NextRequest) {
  const { sessionId, user } = getInfo(request)
  try {
    const defaultAppId = Object.values(AI_PLUS_CONFIGS).find(config => config.appName === 'general')?.appId || '';
    const appId = request.headers.get('x-app-id') || defaultAppId;
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
