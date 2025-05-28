// import type { FC } from 'react'
// import React from 'react'

// import type { IMainProps } from '@/app/components'
// import Main from '@/app/components'

// const App: FC<IMainProps> = ({
//   params,
// }: any) => {
//   return (
//     <Main params={params} />
//   )
// }

// export default React.memo(App)

'use client'

import { useEffect, useState } from 'react'
import Main from '@/app/components'
import Loading from '@/app/components/base/loading'
import { AI_PLUS_CONFIGS, updateConfig } from '@/config'

export default function NewChatPage() {
  const [isConfigReady, setIsConfigReady] = useState(false)

  useEffect(() => {
    const initConfig = async () => {
      try {
        const defaultAppId = Object.values(AI_PLUS_CONFIGS).find(config => config.appName === 'general')?.appId || ''
        await updateConfig(defaultAppId)
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
