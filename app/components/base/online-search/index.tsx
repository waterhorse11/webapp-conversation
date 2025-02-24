'use client'
import { FC, useState, useEffect } from 'react'
import Search from '@/app/components/base/icons/line/search'
import type { VisionFile } from '@/types/app'
import Tooltip from '@/app/components/base/tooltip'

type OnlineSearchProps = {
    onSend: (message: string, files: VisionFile[]) => void
    isActive?: boolean
}

const OnlineSearch: FC<OnlineSearchProps> = ({
    onSend,
    isActive: externalIsActive = false,
}) => {
    const [isActive, setIsActive] = useState(externalIsActive)

    // 同步外部状态
    useEffect(() => {
        setIsActive(externalIsActive)
    }, [externalIsActive])

    const handleClick = () => {
        const newState = !isActive
        setIsActive(newState)
        onSend(`online_search=${newState}`, [])
    }

    return (
        <Tooltip
            selector="online-search-tooltip"
            htmlContent={
                <div className="text-sm">
                    {isActive ? '已联网' : '未联网'}
                </div>
            }
        >
            <div
                className={`
                    flex items-center gap-1 cursor-pointer px-1.5 py-2 rounded-lg border
                    ${isActive
                        ? 'border-blue-600 hover:bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }
                `}
                onClick={handleClick}
            >
                <Search className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className={`text-xs ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    联网搜索
                </span>
            </div>
        </Tooltip>
    )
}

export default OnlineSearch 