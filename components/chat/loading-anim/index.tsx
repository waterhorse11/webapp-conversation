'use client'
import type { FC } from 'react'
import React from 'react'
import s from './style.module.css'
import { useTranslation } from 'react-i18next'

export type ILoaidingAnimProps = {
  type: 'text' | 'avatar'
}

const LoadingAnim: FC<ILoaidingAnimProps> = ({
  type,
}) => {
  const { t } = useTranslation()
  return (
    <div className="flex items-center gap-2">
      {type === 'text' && (
        <span className="text-sm text-gray-500">{t('common.operation.thinking')}</span>
      )}
      <div className={`${s['dot-flashing']} ${s[type]}`}></div>
    </div>
  )
}
export default React.memo(LoadingAnim)
