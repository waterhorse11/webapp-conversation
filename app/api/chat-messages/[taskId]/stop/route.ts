import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { client, getInfo } from '@/app/api/utils/common'

export async function POST(request: NextRequest, { params }: {
    params: { taskId: string }
}) {
    const { taskId } = params
    const { user } = getInfo(request)

    const { data } = await client.stopChatMessageResponding(taskId, user)
    return NextResponse.json(data)
}
