import { type NextRequest } from 'next/server'
import { clients, getInfo } from '@/app/api/utils/common'
import { AI_PLUS_CONFIGS } from '@/config'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const { user } = getInfo(request)
    formData.append('user', user)
    const defaultAppId = Object.values(AI_PLUS_CONFIGS).find(config => config.appName === 'general')?.appId || '';
    const appId = request.headers.get('x-app-id') || defaultAppId;
    const res = await clients[appId].fileUpload(formData)
    return new Response(res.data.id as any)
  }
  catch (e: any) {
    return new Response(e.message)
  }
}
