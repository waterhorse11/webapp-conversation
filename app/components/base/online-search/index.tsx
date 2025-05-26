'use client'
import { FC, useState, useEffect } from 'react'
import Search from '@/app/components/base/icons/line/search'
import type { CommandTagsParams } from '@/types/tools'
import Tooltip from '@/app/components/base/tooltip'

type OnlineSearchProps = {
    isActive?: boolean
    setCommandTags?: (params: CommandTagsParams) => void
    setIsUserInteraction?: (isUserInteraction: boolean) => void
}

const OnlineSearch: FC<OnlineSearchProps> = ({
    isActive: externalIsActive = false,
    setCommandTags,
    setIsUserInteraction,
}) => {
    const [isActive, setIsActive] = useState(externalIsActive)

    // 同步外部状态
    useEffect(() => {
        setIsActive(externalIsActive)
    }, [externalIsActive])

    const handleClick = () => {
        const newState = !isActive
        setIsActive(newState)
        setCommandTags?.({ online_search: newState })
        setIsUserInteraction?.(true)
    }

    return (
        <Tooltip
            selector="online-search-tooltip"
            htmlContent={
                <div className="text-sm">
                    {isActive ? '已联网' : '联网获取实时信息'}
                </div>
            }
        >
            <div
                className={`
                    flex items-center gap-1 h-[32px] cursor-pointer px-1.5 py-2 rounded-2xl border
                    ${isActive
                        ? 'border-blue-600 hover:bg-blue-50 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }
                `}
                onClick={handleClick}
            >
                <Search className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className={`text-xs ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {isActive ? '已联网' : '未联网'}
                </span>
            </div>
        </Tooltip>
    )
}

export default OnlineSearch 