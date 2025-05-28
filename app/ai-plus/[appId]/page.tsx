'use client'

import Main from '@/app/components'
import { useEffect, useState } from 'react'
import { updateConfig, AI_PLUS_CONFIGS } from '@/config'
import Loading from '@/app/components/base/loading'

export default function NewAiPlusChatPage({ params }: { params: { appId: string } }) {
    const [isConfigReady, setIsConfigReady] = useState(false)

    useEffect(() => {
        const initConfig = async () => {
            try {
                const storedAppId = window.localStorage.getItem('x-app-id');
                // if (storedAppId !== params.appId && Object.keys(AI_PLUS_CONFIGS).includes(params.appId)) {
                await updateConfig(params.appId);
                window.localStorage.setItem('x-app-id', params.appId);
                // }
                setIsConfigReady(true)
            } catch (error) {
                console.error('Failed to initialize config:', error)
            }
        }

        setIsConfigReady(false) // 重置状态
        initConfig()
    }, [params.appId]);

    if (!isConfigReady) {
        return <Loading type='app' />
    }

    return (
        <Main params={{ conversationId: '-1', isNewChat: true, appId: params.appId }} />
    )
} 