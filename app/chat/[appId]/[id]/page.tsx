'use client'

import { useParams } from 'next/navigation'
import Main from '@/components'
import { useEffect, useState } from 'react'
import { updateConfig, AI_PLUS_CONFIGS } from '@/config'
import Loading from '@/components/base/loading'


export default function ChatPage({ params }: { params: { appId: string, id: string } }) {
    const [isConfigReady, setIsConfigReady] = useState(false)

    useEffect(() => {
        const initConfig = async () => {
            try {
                const storedAppId = window.localStorage.getItem('x-app-id');
                if (storedAppId !== params.appId && Object.keys(AI_PLUS_CONFIGS).includes(params.appId)) {
                    window.localStorage.setItem('x-app-id', params.appId);
                }
                setIsConfigReady(true)
            } catch (error) {
                console.error('Failed to initialize config:', error)
            }
        }

        setIsConfigReady(false) // 重置状态
        initConfig()
    }, [params.appId, params.id]);

    if (!isConfigReady) {
        return <Loading type='app' />
    }

    return (
        <Main params={{ conversationId: params.id }} />
    )
} 