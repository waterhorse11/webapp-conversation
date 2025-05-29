'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface SidebarContextType {
    isShowSidebar: boolean
    currentId: string
    list: any[]
    showTogglePinApp: string | null
    setList: React.Dispatch<React.SetStateAction<any[]>>
    handleSidebarVisibility: () => void
    handleConversationIdChange: (id: string) => void
    onPinConversation: (id: string) => void
    onRenameConversation: (id: string, name: string) => Promise<void>
    onDeleteConversation: (id: string) => void
    setShowTogglePinApp: (id: string) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isShowSidebar, setIsShowSidebar] = useState(true)
    const [currentId, setCurrentId] = useState('-1')
    const [list, setList] = useState<any[]>([])
    const [showTogglePinApp, setShowTogglePinApp] = useState<string | null>(null)

    const DELETED_CONVERSATIONS_KEY = 'deleted_conversations'

    const handleSidebarVisibility = useCallback(() => {
        setIsShowSidebar(!isShowSidebar)
    }, [isShowSidebar])

    const handleConversationIdChange = useCallback((id: string) => {
        setCurrentId(id)
    }, [])

    const onPinConversation = useCallback((id: string) => {
        setList((prevList: any[]) => {
            const index = prevList.findIndex((item: any) => item.id === id)
            if (index > 0) {
                const newList = [...prevList]
                const [item] = newList.splice(index, 1)
                newList.unshift(item)
                return newList
            }
            return prevList
        })
    }, [])

    const onRenameConversation = useCallback(async (id: string, name: string) => {
        throw new Error('Rename operation should be implemented by parent component')
    }, [])

    const getDeletedConversations = (): string[] => {
        try {
            return JSON.parse(localStorage.getItem(DELETED_CONVERSATIONS_KEY) || '[]')
        } catch {
            return []
        }
    }

    const onDeleteConversation = useCallback((id: string) => {
        setList(prevList => prevList.filter(item => item.id !== id))
        if (currentId === id) {
            setCurrentId('-1')
        }
        const deletedIds = getDeletedConversations()
        deletedIds.push(id)
        localStorage.setItem(DELETED_CONVERSATIONS_KEY, JSON.stringify(deletedIds))
    }, [currentId])

    return (
        <SidebarContext.Provider value={{
            isShowSidebar,
            currentId,
            list,
            showTogglePinApp,
            setList,
            handleSidebarVisibility,
            handleConversationIdChange,
            onPinConversation,
            onRenameConversation,
            onDeleteConversation,
            setShowTogglePinApp
        }}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    const context = useContext(SidebarContext)
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider')
    }
    return context
} 