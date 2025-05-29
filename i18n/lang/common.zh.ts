import { rename } from "fs"

const translation = {
  api: {
    success: '成功',
    saved: '已保存',
    create: '已创建',
  },
  operation: {
    confirm: '确认',
    cancel: '取消',
    clear: '清空',
    delete: '删除',
    save: '保存',
    edit: '编辑',
    refresh: '重新开始',
    search: '搜索',
    send: '发送',
    lineBreak: '换行',
    stop: '停止输出',
    like: '赞同',
    dislike: '反对',
    ok: '好的',
    copy: '复制',
    pleaseEnter: '请输入你的问题',
    openSidebar: '打开侧边栏',
    closeSidebar: '关闭侧边栏',
  },
  imageUploader: {
    uploadFromComputer: '从本地上传',
    uploadFromComputerReadError: '图片读取失败，请重新选择。',
    uploadFromComputerUploadError: '图片上传失败，请重新上传。',
    uploadFromComputerLimit: '上传图片不能超过 {{size}} MB',
    pasteImageLink: '粘贴图片链接',
    pasteImageLinkInputPlaceholder: '将图像链接粘贴到此处',
    pasteImageLinkInvalid: '图片链接无效',
    imageUpload: '图片上传',
  },
  modelSelector: {
    deepseek: 'DeepSeek',
    deepseek_thinking: 'DeepSeek-Thinking',
    doubao: 'DouBao'
  },
  onlineSearch: {
    tooltip: {
      online: '已联网',
      offline: '联网获取实时信息'
    },
    status: {
      online: '已联网',
      offline: '未联网'
    }
  },
  conversation: {
    history: '历史会话',
    pinned: '置顶对话',
    rename: '重命名对话',
    delete: '删除对话',
    viewAll: '查看全部',
    collapse: '收起',
    confirmDelete: '确定要删除这个会话吗？此操作无法撤销。',
  }
}

export default translation
