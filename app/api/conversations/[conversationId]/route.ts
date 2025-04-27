import { type NextRequest, NextResponse } from 'next/server'
import { clients, getInfo } from '@/app/api/utils/common'

export async function DELETE(request: NextRequest, { params }: {
    params: { conversationId: string }
}) {
    const { conversationId } = params
    const { user } = getInfo(request)
    const appId = request.headers.get('x-app-id') || '43192a18-2b15-451e-9aec-37d55d5673db';
    const { data } = await clients[appId].deleteConversation(conversationId, user)
    return NextResponse.json(data)
} 