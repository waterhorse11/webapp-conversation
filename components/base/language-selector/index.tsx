'use client'

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { getLocaleOnClient, setLocaleOnClient } from '@/i18n/client'
import type { Locale } from '@/i18n'

export interface Language {
    value: string
    label: string
}

interface LanguageSelectorProps {
    languages: Language[]
    onChange?: (lang: Language) => void
    className?: string
}

const LanguageSelector = ({ languages, onChange, className = '' }: LanguageSelectorProps) => {
    const [selectedLang, setSelectedLang] = useState(() => {
        if (typeof window !== 'undefined') {
            return languages.find(lang => lang.value === (getLocaleOnClient() || 'zh-Hans')) || languages[0]
        }
        return languages[0]
    })

    const handleChange = (lang: Language) => {
        if (lang.value !== getLocaleOnClient()) {
            setSelectedLang(lang)
            setLocaleOnClient(lang.value as Locale, true)
            onChange?.(lang)
            window.location.reload()
        }
    }

    return (
        <Listbox value={selectedLang} onChange={handleChange}>
            <div className={`relative ${className}`}>
                <Listbox.Button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 rounded-md transition-all outline-none">
                    {({ open }) => (
                        <>
                            <span className='text-[12px]'>Lang({selectedLang.label})</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 text-gray-400 transform transition-transform ${open ? 'rotate-180' : ''}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </>
                    )}
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute right-0 bottom-full w-auto py-1 bg-white rounded-lg shadow-lg overflow-auto">
                        {languages.map((lang) => (
                            <Listbox.Option
                                key={lang.value}
                                value={lang}
                                className={({ active, selected }) =>
                                    `${active ? 'bg-blue-50' : ''}
                   ${selected ? 'font-medium' : 'font-normal text-[14px]'}
                   cursor-pointer select-none relative py-1 px-2 text-sm text-gray-600 hover:text-blue-600`
                                }
                            >
                                {lang.label}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}

export default LanguageSelector 