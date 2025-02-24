import React, { useState } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon,
  EllipsisHorizontalIcon,
  StarIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisSolidIcon } from '@heroicons/react/24/solid'
import Button from '@/app/components/base/button'
// import Card from './card'
import type { ConversationItem } from '@/types/app'
import { format, fromUnixTime } from 'date-fns'
import Tooltip from '@/app/components/base/tooltip'
import { Modal } from '@/app/components/base/modal'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const MAX_CONVERSATION_LENTH = 20

export type ISidebarProps = {
  copyRight: string
  currentId: string
  onCurrentIdChange: (id: string) => void
  list: ConversationItem[]
  onPinConversation?: (id: string) => void
  onRenameConversation?: (id: string, name: string) => void
  onDeleteConversation?: (id: string) => void
}

const Sidebar: FC<ISidebarProps> = ({
  copyRight,
  currentId,
  onCurrentIdChange,
  list,
  onPinConversation,
  onRenameConversation,
  onDeleteConversation,
}) => {
  const { t } = useTranslation()
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingName, setEditingName] = useState('')
  const [currentItem, setCurrentItem] = useState<ConversationItem | null>(null)

  const handleRename = (item: ConversationItem) => {
    setCurrentItem(item)
    setEditingName(item.name)
    setShowRenameModal(true)
  }

  const handleDelete = (item: ConversationItem) => {
    setCurrentItem(item)
    setShowDeleteModal(true)
  }

  return (
    <>
      <div
        className="shrink-0 flex flex-col overflow-y-auto bg-white pc:w-[244px] tablet:w-[192px] mobile:w-[240px]  border-r border-gray-200 tablet:h-[calc(100vh_-_3rem)] mobile:h-screen"
      >
        {list.length < MAX_CONVERSATION_LENTH && (
          <div className="flex flex-shrink-0 p-4 !pb-0">
            <Button
              onClick={() => { onCurrentIdChange('-1') }}
              className="group block w-full flex-shrink-0 !justify-start !h-9 text-primary-600 items-center text-sm">
              <PencilSquareIcon className="mr-2 h-4 w-4" /> {t('app.chat.newChat')}
            </Button>
          </div>
        )}

        <nav className="mt-4 flex-1 space-y-1 bg-white p-4 !pt-0">
          {list.map((item) => {
            const isCurrent = item.id === currentId
            const ItemIcon
              = isCurrent ? ChatBubbleOvalLeftEllipsisSolidIcon : ChatBubbleOvalLeftEllipsisIcon
            return (
              <div
                onClick={() => onCurrentIdChange(item.id)}
                key={item.id}
                onMouseLeave={() => setOpenMenuId(null)}
                className={classNames(
                  isCurrent
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700',
                  'group flex items-center rounded-md px-2 py-2 text-sm font-medium cursor-pointer',
                )}
              >
                <ItemIcon
                  className={classNames(
                    isCurrent
                      ? 'text-primary-600'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 h-5 w-5 flex-shrink-0',
                  )}
                  aria-hidden="true"
                />
                <div className="flex-1 flex justify-between items-center min-w-0 gap-2">
                  <span className="truncate max-w-[120px]">{item.name}</span>
                  <div className="flex-shrink-0 group-hover:hidden">
                    {item.created_at && (
                      <span className="text-xs text-gray-400">
                        {format(fromUnixTime(Number(item.created_at)), 'MM-dd')}
                      </span>
                    )}
                  </div>
                  <div className={`hidden ${item.name !== 'New conversation' && item.name !== '新的对话' ? 'group-hover:block' : ''} flex-shrink-0 relative`}>
                    <div className="relative">
                      <EllipsisHorizontalIcon
                        className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenMenuId(openMenuId === item.id ? null : item.id)
                        }}
                      />
                      {openMenuId === item.id && (
                        <div className="absolute right-0 mt-1 w-28 bg-white rounded-md shadow-lg py-1 z-10">
                          <button
                            className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left flex items-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              onPinConversation?.(item.id)
                            }}
                          >
                            <StarIcon className="w-4 h-4" />
                            置顶会话
                          </button>
                          <button
                            className={`w-full px-3 py-2 text-sm text-left flex items-center gap-2 ${item.name === 'New conversation'
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                              }`}
                            disabled={item.name === 'New conversation'}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (item.name !== 'New conversation')
                                handleRename(item)
                            }}
                          >
                            <PencilIcon className="w-4 h-4" />
                            重命名
                          </button>
                          <button
                            className={`w-full px-3 py-2 text-sm text-left flex items-center gap-2 ${item.name === 'New conversation'
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-red-600 hover:bg-gray-100 cursor-pointer'
                              }`}
                            disabled={item.name === 'New conversation'}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (item.name !== 'New conversation')
                                handleDelete(item)
                            }}
                          >
                            <TrashIcon className="w-4 h-4" />
                            删除会话
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </nav>
        {/* <a className="flex flex-shrink-0 p-4" href="https://langgenius.ai/" target="_blank">
          <Card><div className="flex flex-row items-center"><ChatBubbleOvalLeftEllipsisSolidIcon className="text-primary-600 h-6 w-6 mr-2" /><span>LangGenius</span></div></Card>
        </a> */}
        <div className="flex flex-shrink-0 pr-4 pb-4 pl-4">
          <div className="text-gray-400 font-normal text-xs">© {copyRight} {(new Date()).getFullYear()}</div>
        </div>
      </div>

      <Modal
        isShow={showRenameModal}
        title="重命名会话"
        onClose={() => setShowRenameModal(false)}
        actions={
          <>
            <button
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setShowRenameModal(false)}
            >
              取消
            </button>
            <button
              className="px-4 py-2 text-sm text-white bg-primary-600 rounded-lg hover:bg-primary-700"
              onClick={() => {
                if (currentItem && editingName && editingName !== currentItem.name) {
                  onRenameConversation?.(currentItem.id, editingName)
                }
                setShowRenameModal(false)
              }}
            >
              确定
            </button>
          </>
        }
      >
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={editingName}
          onChange={e => setEditingName(e.target.value)}
          autoFocus
        />
      </Modal>

      <Modal
        isShow={showDeleteModal}
        title="删除会话"
        onClose={() => setShowDeleteModal(false)}
        actions={
          <>
            <button
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setShowDeleteModal(false)}
            >
              取消
            </button>
            <button
              className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
              onClick={() => {
                if (currentItem) {
                  onDeleteConversation?.(currentItem.id)
                }
                setShowDeleteModal(false)
              }}
            >
              删除
            </button>
          </>
        }
      >
        <p className="text-sm text-gray-500">确定要删除这个会话吗？此操作无法撤销。</p>
      </Modal>
    </>
  )
}

export default React.memo(Sidebar)
