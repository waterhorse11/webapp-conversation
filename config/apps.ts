export interface AppItem {
    id: string
    icon: string
    title: string
    description?: string
    href: string
    isPinned?: boolean
}

export interface AppGroup {
    title: string
    apps: AppItem[]
}

export const APPS: AppItem[] = [
    {
        id: '1',
        icon: '/ppt.png',
        title: 'PPT 助手',
        description: '一键生成PPT',
        href: '/ppt-generator/index.html'
    },
    {
        id: '2',
        icon: '/translate.png',
        title: '中英互译',
        description: '一键中英文互译',
        href: '/ai-plus/fff43c71-e05d-40d0-b533-e1c9a4df1c5a'
    },
    {
        id: '3',
        icon: '/pdf-tanslator.png',
        title: 'PDF文档翻译',
        description: '上传PDF文档，并告知要翻译的语言，一键发送即可翻译',
        href: '/ai-plus/f03012f1-1b9f-4383-9ac7-99d7cc5a23ce'
    }
]

export const APP_GROUPS: AppGroup[] = [
    {
        title: '我的置顶',
        apps: []
    },
    {
        title: '官方推荐',
        apps: [APPS[0]]
    },
    {
        title: '办公提效',
        apps: [APPS[0], APPS[2]]
    },
    {
        title: '辅助写作',
        apps: [APPS[1]]
    }
]
