import { type NextRequest, NextResponse } from 'next/server'
import { client, getInfo } from '@/app/api/utils/common'

export async function DELETE(request: NextRequest, { params }: {
    params: { conversationId: string }
}) {
    const { conversationId } = params
    const { user } = getInfo(request)

    const { data } = await client.deleteConversation(conversationId, user)
    return NextResponse.json(data)
} 