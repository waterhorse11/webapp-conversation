import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { clients, getInfo, setSession } from '@/app/api/utils/common'

export async function GET(request: NextRequest) {
  const { sessionId, user } = getInfo(request)
  try {
    const appId = request.headers.get('x-app-id') || '43192a18-2b15-451e-9aec-37d55d5673db';
    const { data } = await clients[appId].getApplicationParameters(user)
    return NextResponse.json(data as object, {
      headers: setSession(sessionId),
    })
  }
  catch (error) {
    return NextResponse.json([])
  }
}
