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
                className='flex items-center cursor-pointer p-2 hover:bg-gray-100 rounded-lg'
                onClick={handleClick}
            >
                <Search className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
            </div>
        </Tooltip>
    )
}

export default OnlineSearch 