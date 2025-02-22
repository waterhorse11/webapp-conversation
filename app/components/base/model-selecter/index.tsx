'use client'
import type { FC } from 'react'
import React, { useState, useEffect } from 'react'

export type IModelSelecterProps = {
    onSend: (message: string) => void
    initialModel?: string // 添加初始模型参数
}

const ModelSelecter: FC<IModelSelecterProps> = ({
    onSend,
    initialModel = 'doubao-1-5', // 设置默认值
}) => {
    const [selectedModel, setSelectedModel] = useState<string>(initialModel)

    // 监听 initialModel 的变化
    useEffect(() => {
        if (initialModel)
            setSelectedModel(initialModel)
    }, [initialModel])

    const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const modelName = event.target.value
        setSelectedModel(modelName)
        if (modelName) {
            onSend(`model_name=${modelName}`)
        }
    }

    return (
        <div>
            <select value={selectedModel} onChange={handleModelChange}>
                <option value="deepseek-r1">deepseek-r1</option>
                <option value="doubao-1-5">doubao-1-5</option>
            </select>
        </div>
    )
}

export default ModelSelecter