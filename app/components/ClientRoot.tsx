'use client'

import React, { useEffect, useState } from 'react'
import ClientLayout from './ClientLayout'
import { SidebarProvider } from '@/app/context/SidebarContext'
import i18n from '@/i18n/i18next-config'

export default function ClientRoot({
    children,
}: {
    children: React.ReactNode
}) {
    const [isClient, setIsClient] = useState(false)

    // 初始化i18n和客户端状态
    useEffect(() => {
        // 标记为客户端渲染
        setIsClient(true)

        // 从localStorage获取语言设置
        const savedLang = localStorage.getItem('i18nextLng') || 'zh-Hans'
        i18n.changeLanguage(savedLang)
    }, [])

    // 在客户端渲染之前不显示任何内容
    if (!isClient) {
        return null
    }

    return (
        <SidebarProvider>
            <ClientLayout>
                {children}
            </ClientLayout>
        </SidebarProvider>
    )
} 