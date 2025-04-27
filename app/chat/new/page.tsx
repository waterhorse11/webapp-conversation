'use client'

import { useEffect, useState } from 'react'
import Main from '@/app/components'
import Loading from '@/app/components/base/loading'

export default function NewChatPage() {
    const [isConfigReady, setIsConfigReady] = useState(false)

    useEffect(() => {
        const initConfig = async () => {
            try {
                const defaultAppId = '43192a18-2b15-451e-9aec-37d55d5673db'
                const storedAppId = window.localStorage.getItem('x-app-id')

                if (storedAppId !== defaultAppId) {
                    window.localStorage.setItem('x-app-id', defaultAppId)
                }
                setIsConfigReady(true)
            } catch (error) {
                console.error('Failed to initialize config:', error)
            }
        }

        setIsConfigReady(false)
        initConfig()
    }, [])

    if (!isConfigReady) {
        return <Loading type='app' />
    }

    return (
        <Main params={{ conversationId: '-1', isNewChat: true }} />
    )
} 