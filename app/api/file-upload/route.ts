import { type NextRequest } from 'next/server'
import { clients, getInfo } from '@/app/api/utils/common'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const { user } = getInfo(request)
    formData.append('user', user)
    const appId = request.headers.get('x-app-id') || '43192a18-2b15-451e-9aec-37d55d5673db';
    const res = await clients[appId].fileUpload(formData)
    return new Response(res.data.id as any)
  }
  catch (e: any) {
    return new Response(e.message)
  }
}
