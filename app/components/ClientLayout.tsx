'use client'

import React from 'react'
import Sidebar from './sidebar'
import { useSidebar } from '@/app/context/SidebarContext'
import Tooltip from './base/tooltip'
import useBreakpoints, { MediaType } from '@/hooks/use-breakpoints'
import { useTranslation } from 'react-i18next'
import { APP_INFO } from '@/config'
import Toast from '@/app/components/base/toast'
import { generationConversationName, fetchConversations } from '@/service'

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const {
        isShowSidebar,
        currentId,
        list,
        setList,
        handleSidebarVisibility,
        handleConversationIdChange,
        onPinConversation,
        onDeleteConversation
    } = useSidebar()

    const { notify } = Toast

    const handleRenameConversation = async (id: string, name: string) => {
        try {
            await generationConversationName(id, name)
            const { data: allConversations }: any = await fetchConversations()
            setList(allConversations)
            notify({ type: 'success', message: '重命名成功' })
        } catch (err) {
            notify({ type: 'error', message: '重命名失败' })
        }
    }

    const { t } = useTranslation()
    const media = useBreakpoints()
    const isMobile = media === MediaType.mobile

    return (
        <div className="flex h-screen bg-white">
            {!isMobile && (
                <div className={`fixed top-0 bottom-0 left-0 z-50 transition-transform duration-300 ${isShowSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
                    <Sidebar
                        copyRight={APP_INFO.copyright || APP_INFO.title}
                        currentId={currentId}
                        onCurrentIdChange={handleConversationIdChange}
                        list={list}
                        onHideSideBar={handleSidebarVisibility}
                        onHandleConversationIdChange={handleConversationIdChange}
                        onPinConversation={onPinConversation}
                        onRenameConversation={handleRenameConversation}
                        onDeleteConversation={onDeleteConversation}
                    />
                </div>
            )}
            <div className={`relative flex-1 flex flex-col min-w-0 p-[7px] transition-all duration-300 ${!isMobile && isShowSidebar ? 'ml-[240px]' : 'ml-0'}`}>
                {/* {!isShowSidebar && !isMobile && (
                    <Tooltip selector='sidebar-open'
                        position='right'
                        htmlContent={
                            <div>
                                <div>{t('common.operation.openSidebar')}</div>
                            </div>
                        }
                    >
                        <button className="absolute left-2 top-2 p-1 w-8 h-8 hover:bg-gray-200 rounded-lg flex items-center justify-center z-50"
                            onClick={handleSidebarVisibility}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 1024 1024" className="iconify text-gray-500"><path d="M861.866667 162.133333c-17.066667-17.066667-42.666667-29.866667-68.266667-29.866666H226.133333c-25.6 0-51.2 8.533333-68.266666 29.866666S128 204.8 128 230.4v567.466667c0 25.6 8.533333 51.2 29.866667 68.266666 17.066667 17.066667 42.666667 29.866667 68.266666 29.866667h567.466667c25.6 0 51.2-8.533333 68.266667-29.866667 17.066667-17.066667 29.866667-42.666667 29.866666-68.266666V226.133333c0-25.6-8.533333-46.933333-29.866666-64zM366.933333 814.933333H226.133333c-4.266667 0-8.533333 0-12.8-4.266666-4.266667-4.266667-4.266666-8.533333-4.266666-12.8V226.133333c0-4.266667 0-8.533333 4.266666-12.8 4.266667-4.266667 8.533333-4.266667 12.8-4.266666h140.8v605.866666z m448-17.066666c0 4.266667 0 8.533333-4.266666 12.8-4.266667 4.266667-8.533333 4.266667-12.8 4.266666h-354.133334V209.066667h354.133334c4.266667 0 8.533333 0 12.8 4.266666 4.266667 4.266667 4.266667 8.533333 4.266666 12.8v571.733334z" fill="currentColor" /></svg>
                        </button>
                    </Tooltip>
                )} */}
                <div className="flex-1 h-full">
                    {children}
                </div>
            </div>
        </div>
    )
} 