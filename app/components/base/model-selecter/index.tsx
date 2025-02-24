'use client'
import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { Listbox } from '@headlessui/react'

export type IModelSelecterProps = {
    onSend: (message: string) => void
    initialModel?: string // 添加初始模型参数
}

const modelMap: Record<string, string> = {
    'DeepSeek': 'deepseek-v3',
    'DeepSeek-深度思考': 'deepseek-r1',
    '豆包': 'doubao-1-5',
} as const

const ModelSelecter: FC<IModelSelecterProps> = ({
    onSend,
    initialModel = 'deepseek-v3', // 设置默认值
}) => {
    const [selectedModel, setSelectedModel] = useState<string>(initialModel)

    // 监听 initialModel 的变化
    useEffect(() => {
        if (initialModel && Object.values(modelMap).find(value => value === initialModel)) {
            const modelKey = Object.entries(modelMap).find(([_, value]) => value === initialModel)?.[0] || ""
            setSelectedModel(modelKey)
        }
    }, [initialModel])

    const handleModelChange = (modelName: string) => {
        const modelKey = Object.entries(modelMap).find(([_, value]) => value === modelName)?.[0] || ""
        setSelectedModel(modelKey)
        if (modelName) {
            onSend(`model_name=${modelName}`)
        }
    }

    return (
        <Listbox value={selectedModel} onChange={handleModelChange}>
            <div className="relative min-w-[155px] max-w-fit">
                <Listbox.Button className="relative w-full h-7 px-3 text-sm text-left bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors">
                    <span className="block truncate">{selectedModel}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-sm bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 focus:outline-none">
                    {Object.keys(modelMap).map((model, index, array) => (
                        <Listbox.Option
                            key={model}
                            value={modelMap[model]}
                            className={({ active }) =>
                                `relative cursor-pointer select-none py-1.5 px-3 ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                                } ${index !== array.length - 1 ? 'border-b border-gray-100' : ''
                                }`
                            }
                        >
                            {({ selected }) => (
                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                    {model}
                                </span>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    )
}

export default ModelSelecter