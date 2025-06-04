'use client'
import type { FC } from 'react'
import React, { useEffect, useRef } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import Textarea from 'rc-textarea'
import s from './style.module.css'
import Answer from './answer'
import Question from './question'
import type { FeedbackFunc } from './type'
import type { ChatItem, Feedbacktype, VisionFile, VisionSettings } from '@/types/app'
import { TransferMethod } from '@/types/app'
import Tooltip from '@/components/base/tooltip'
import Toast from '@/components/base/toast'
import ChatImageUploader from '@/components/base/image-uploader/chat-image-uploader'
import ImageList from '@/components/base/image-uploader/image-list'
import { useImageFiles } from '@/components/base/image-uploader/hooks'
import OnlineSearch from '@/components/base/online-search'
import ModelSelecter from '@/components/base/model-selector'
import { usePathname } from 'next/navigation'
import type { CommandTagsParams } from '@/types/tools'
import { AI_PLUS_CONFIGS } from '@/config'
import FileFromLocal from '@/components/base/file-uploader/file-from-local'
import {
  FileContextProvider,
  useFileStore,
} from '@/components/base/file-uploader/store'
import type { FileUpload } from '@/components/base/features/types'
import { useFile } from '@/components/base/file-uploader/hooks'
import type { FileEntity } from '@/components/base/file-uploader/types'
import { FileList, FileListInChatInput } from '@/components/base/file-uploader'
import { useStore } from '@/components/base/file-uploader/store'

export type IChatProps = {
  chatList: ChatItem[]
  /**
   * Whether to display the editing area and rating status
   */
  feedbackDisabled?: boolean
  /**
   * Whether to display the input area
   */
  isHideSendInput?: boolean
  onFeedback?: FeedbackFunc
  checkCanSend?: () => boolean
  onSend?: (message: string, files?: FileEntity[]) => void
  useCurrentUserAvatar?: boolean
  isResponding?: boolean
  controlClearQuery?: number
  // visionConfig?: VisionSettings
  visionConfig?: FileUpload
  currConversationId?: string
  isOnlineSearch?: boolean
  lastSelectedModel?: string
  onStopResponding?: () => void
  isNewChat?: boolean
  setCommandTags?: (params: CommandTagsParams) => void
  commandTags?: string
}

const Chat: FC<IChatProps> = ({
  chatList,
  feedbackDisabled = false,
  isHideSendInput = false,
  onFeedback,
  checkCanSend,
  onSend = () => { },
  useCurrentUserAvatar,
  isResponding,
  controlClearQuery,
  visionConfig,
  currConversationId,
  isOnlineSearch,
  lastSelectedModel,
  onStopResponding,
  isNewChat,
  setCommandTags,
  commandTags,
}) => {
  const { t } = useTranslation()
  const { notify } = Toast
  const isUseInputMethod = useRef(false)
  const chatListRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<any>(null)
  const [isAtBottom, setIsAtBottom] = React.useState(true)
  const [forceShowButton, setForceShowButton] = React.useState(false)
  const [showStopBtn, setShowStopBtn] = React.useState(false)
  const pathname = usePathname()
  const storedAppId = window.localStorage.getItem('x-app-id')
  const [query, setQuery] = React.useState('')
  const [isUserInteraction, setIsUserInteraction] = React.useState(false)
  const {
    handleDragFileEnter,
    handleDragFileLeave,
    handleDragFileOver,
    handleDropFile,
    handleClipboardPasteFile,
    handleRemoveFile,
    isDragActive,
  } = useFile(visionConfig!)

  const handleContentChange = (e: any) => {
    const value = e.target.value
    setQuery(value)
  }

  const logError = (message: string) => {
    notify({ type: 'error', message, duration: 3000 })
  }

  const valid = () => {
    if (!query || query.trim() === '') {
      logError('Message cannot be empty')
      return false
    }
    return true
  }

  useEffect(() => {
    if (controlClearQuery)
      setQuery('')
  }, [controlClearQuery])


  // const {
  //   files,
  //   onUpload,
  //   onRemove,
  //   onReUpload,
  //   onImageLinkLoadError,
  //   onImageLinkLoadSuccess,
  //   onClear,
  // } = useImageFiles()

  // const handleSend = () => {
  //   if (!valid() || (checkCanSend && !checkCanSend()))
  //     return

  //   const entireQuery = isUserInteraction ? `${commandTags}${query}` : query
  //   onSend(entireQuery, files.filter(file => file.progress !== -1).map(fileItem => ({
  //     type: 'image',
  //     transfer_method: fileItem.type,
  //     url: fileItem.url,
  //     upload_file_id: fileItem.fileId,
  //   })))
  //   setIsUserInteraction(false)
  //   if (!files.find(item => item.type === TransferMethod.local_file && !item.fileId)) {
  //     if (files.length)
  //       onClear()
  //     if (!isResponding)
  //       setQuery('')
  //   }
  // }

  const FileUploaderWrapper = () => {
    const { files, setFiles } = useStore(state => ({
      files: state.files,
      setFiles: state.setFiles,
    }))

    useEffect(() => {
      const element = document.querySelector('[data-file-uploader-wrapper]')
      if (element) {
        const handleSendMessage = () => {
          if (isResponding) {
            notify({ type: 'info', message: t('appDebug.errorMessage.waitForResponse') })
            return
          }

          if (onSend) {
            if (files.find(item => item.transferMethod === TransferMethod.local_file && !item.uploadedId)) {
              notify({ type: 'info', message: t('appDebug.errorMessage.waitForFileUpload') })
              return
            }
            if (!query || !query.trim()) {
              notify({ type: 'info', message: t('appAnnotation.errorMessage.queryRequired') })
              return
            }
            onSend(query, files)
            setQuery('')
            setFiles([])
          }
        }

        element.addEventListener('send-message', handleSendMessage)
        return () => {
          element.removeEventListener('send-message', handleSendMessage)
        }
      }
    }, [files, query, isResponding])

    return (
      <div className="flex items-center justify-between w-full">
        {/* <FileListInChatInput fileConfig={visionConfig!} /> */}
        <FileFromLocal fileConfig={visionConfig!} />
      </div>
    )
  }

  const handleSend = () => {
    const fileUploaderElement = document.querySelector('[data-file-uploader-wrapper]')
    if (fileUploaderElement) {
      const event = new Event('send-message')
      fileUploaderElement.dispatchEvent(event)
      console.log('send-message event triggered')
    } else {
      if (isResponding) {
        notify({ type: 'info', message: t('appDebug.errorMessage.waitForResponse') })
        return
      }

      if (!query || !query.trim()) {
        notify({ type: 'info', message: t('appAnnotation.errorMessage.queryRequired') })
        return
      }
      const entireQuery = isUserInteraction ? `${commandTags}${query}` : query
      onSend(entireQuery)
      setQuery('')
      setIsUserInteraction(false)
    }
  }

  const handleKeyUp = (e: any) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      // prevent send message when using input method enter
      if (!e.shiftKey && !isUseInputMethod.current)
        handleSend()
    }
  }

  const handleKeyDown = (e: any) => {
    isUseInputMethod.current = e.nativeEvent.isComposing
    if (e.code === 'Enter' && !e.shiftKey) {
      setQuery(query.replace(/\n$/, ''))
      e.preventDefault()
    }
  }

  const checkIfAtBottom = () => {
    const container = document.querySelector('.chat-outer-scroll')
    if (container) {
      const threshold = 100 // 阈值，距离底部100px以内都认为是在底部
      const isBottom = container.scrollHeight - container.scrollTop - container.clientHeight <= threshold
      setIsAtBottom(isBottom)
    }
  }

  useEffect(() => {
    const container = document.querySelector('.chat-outer-scroll')
    if (container) {
      container.addEventListener('scroll', checkIfAtBottom)
      return () => container.removeEventListener('scroll', checkIfAtBottom)
    }
  }, [])

  const scrollToBottom = () => {
    const container = document.querySelector('.chat-outer-scroll')
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      })
      setIsAtBottom(true)
    }
  }

  // 添加对 isResponding 的监听，控制延迟显示停止按钮
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isResponding) {
      timer = setTimeout(() => {
        setShowStopBtn(true)
      }, 500)
    } else {
      setShowStopBtn(false)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [isResponding])

  // 添加自动聚焦效果
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [chatList.length])

  // 添加自动滚动效果，当有新消息或响应结束时
  useEffect(() => {
    if (chatList.length > 0 && !isResponding) {
      scrollToBottom()
    }
  }, [chatList, isResponding])

  return (
    <div className="h-full flex flex-col mt-5">
      {/* 聊天列表区域 */}
      <div className="flex-1 overflow-y-auto chat-outer-scroll">
        <div className="w-full h-full px-4 md:px-12 lg:px-24">
          <div className="max-w-[994px] mx-auto">
            <div className="space-y-[30px] pb-4">
              {chatList.map((item) => (
                <div key={item.id} className="chat-content-item">
                  {item.isAnswer ? (
                    <div className="segment segment-assistant">
                      <div className="segment-container">
                        <div className="segment-content">
                          <div className="segment-content-box">
                            <Answer
                              item={item}
                              feedbackDisabled={feedbackDisabled}
                              onFeedback={onFeedback}
                              isResponding={isResponding && item.id === chatList[chatList.length - 1].id}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="segment segment-user">
                      <div className="segment-container">
                        <div className="segment-content">
                          <div className="segment-content-box">
                            <Question
                              id={item.id}
                              content={item.content}
                              useCurrentUserAvatar={useCurrentUserAvatar}
                              // imgSrcs={(item.message_files && item.message_files?.length > 0) ? item.message_files.map(item => item.url) : []}
                              message_files={item.message_files}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 输入区域 */}
      <FileContextProvider>
        {!isHideSendInput && (
          <div className={`flex-shrink-0 w-full pr-8 pl-4 md:pl-12 lg:pl-26 md:pr-16 lg:pr-26
          ${(!isNewChat || chatList.length > 0 || pathname?.startsWith('/ai-plus/'))
              ? 'sticky bottom-0 z-10 pt-6 pb-2'
              : 'absolute top-1/4 bottom-0 left-0 right-0'}`}>
            <div className="max-w-[994px] mx-auto">
              {(!isNewChat || chatList.length > 0 || pathname?.startsWith('/ai-plus/')) ? null : (
                <div className="flex justify-center">
                  <img src="/AiHub.png" alt="AiHub" className="w-[300px]" />
                </div>
              )}
              {/* 文件列表区域 */}
              {visionConfig?.enabled && (
                <div className="w-full">
                  <div className="flex justify-start">
                    <FileListInChatInput fileConfig={visionConfig} />
                  </div>
                </div>
              )}
              {/* 滚动到底部按钮 */}
              {!isAtBottom && chatList.length > 0 && (
                <div
                  className="absolute -top-9 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer bg-white border border-gray-200 rounded-full shadow-md p-2 hover:bg-gray-50 flex items-center gap-1"
                  onClick={scrollToBottom}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}

              <div className="bg-white border-[1.5px] border-gray-200 rounded-xl shadow-lg">
                <div className="relative">
                  <div className="px-[5.5px] py-[1px]">
                    <Textarea
                      ref={inputRef}
                      className="block w-full px-2 py-[7px] leading-5 min-h-[60px] max-h-[145px] text-sm text-gray-700 outline-none appearance-none resize-none placeholder:text-gray-400"
                      value={query}
                      onChange={handleContentChange}
                      onKeyUp={handleKeyUp}
                      onKeyDown={handleKeyDown}
                      placeholder={t('common.operation.pleaseEnter') as string}
                      autoSize
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 py-2 min-h-[40px]">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {['general'].includes(AI_PLUS_CONFIGS[storedAppId as keyof typeof AI_PLUS_CONFIGS]?.appName) && (
                        <>
                          <OnlineSearch
                            isActive={isOnlineSearch}
                            setCommandTags={setCommandTags}
                            setIsUserInteraction={setIsUserInteraction}
                          />
                          <div className='mx-1 w-[1px] h-4 bg-black/5' />
                          <ModelSelecter
                            initialModel={lastSelectedModel}
                            setCommandTags={setCommandTags}
                            setIsUserInteraction={setIsUserInteraction}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center h-8">
                    {/* {visionConfig?.enabled && (
                    <ChatImageUploader
                      settings={visionConfig}
                      onUpload={onUpload}
                      disabled={files.length >= visionConfig.number_limits}
                    />
                  )} */}
                    {visionConfig?.enabled && (
                      //   <>
                      //   <div className='mx-1 w-[1px] h-4 bg-black/5' />
                      //   <ImageList
                      //     list={files}
                      //     onRemove={onRemove}
                      //     onReUpload={onReUpload}
                      //     onImageLinkLoadSuccess={onImageLinkLoadSuccess}
                      //     onImageLinkLoadError={onImageLinkLoadError}
                      //   />
                      // </>
                      <>
                        <div data-file-uploader-wrapper>
                          <FileUploaderWrapper />
                        </div>
                        <div className='mr-2 ml-1 w-[1px] h-4 bg-black/5' />
                      </>
                    )}
                    <Tooltip
                      selector="send-tip"
                      htmlContent={
                        <div>
                          {query.trim().length > 0 ? (!isResponding ? (
                            <>
                              <div>{t('common.operation.send')} Enter</div>
                              <div>{t('common.operation.lineBreak')} Shift Enter</div>
                            </>
                          ) : (
                            <div>{t('common.operation.stop')}</div>
                          )) : (!isResponding ? (
                            <div>{t('common.operation.pleaseEnter')}</div>
                          ) : (
                            <div>{t('common.operation.stop')}</div>
                          ))}
                        </div>
                      }
                    >
                      <div
                        className={`${s.sendBtn} w-8 h-8 cursor-pointer rounded-full border border-gray-200 ${showStopBtn ? s.stopBtn : query.trim().length > 0 ? s.active : ''}`}
                        onClick={showStopBtn ? onStopResponding : handleSend}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </FileContextProvider>
    </div>
  )
}

export default React.memo(Chat)
