import { memo, useCallback } from 'react'
import { RiAttachmentLine } from '@remixicon/react'
import FileInput from '../file-input'
import ActionButton from '@/components/base/action-button'
import cn from '@/utils/classnames'
import type { FileUpload } from '@/components/base/features/types'

type FileFromLocalProps = {
    fileConfig: FileUpload
}

const FileFromLocal = ({
    fileConfig,
}: FileFromLocalProps) => {
    return (
        <div className="group relative mt-[2px]">
            <ActionButton
                size='l'
                className='group-hover:bg-gray-100 p-1.5 rounded-full'
            >
                <RiAttachmentLine className='h-5 w-5' />
            </ActionButton>
            <FileInput fileConfig={fileConfig} />
        </div>
    )
}

export default memo(FileFromLocal)
