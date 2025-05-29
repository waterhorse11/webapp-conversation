export interface AppItem {
    id: string
    icon: string
    titleKey: string
    descriptionKey?: string
    href: string
    isPinned?: boolean
}

export interface AppGroup {
    titleKey: string
    apps: AppItem[]
}

export const APPS: AppItem[] = [
    {
        id: '1',
        icon: '/ppt.png',
        titleKey: 'app.apps.items.ppt.title',
        descriptionKey: 'app.apps.items.ppt.description',
        href: '/ppt-generator/index.html'
    },
    {
        id: '2',
        icon: '/translate.png',
        titleKey: 'app.apps.items.translate.title',
        descriptionKey: 'app.apps.items.translate.description',
        href: '/ai-plus/fff43c71-e05d-40d0-b533-e1c9a4df1c5a'
    },
    {
        id: '3',
        icon: '/pdf-tanslator.png',
        titleKey: 'app.apps.items.pdfTranslator.title',
        descriptionKey: 'app.apps.items.pdfTranslator.description',
        href: '/ai-plus/f03012f1-1b9f-4383-9ac7-99d7cc5a23ce'
    }
]

export const APP_GROUPS: AppGroup[] = [
    {
        titleKey: 'app.apps.groups.pinned',
        apps: []
    },
    {
        titleKey: 'app.apps.groups.recommended',
        apps: [APPS[0]]
    },
    {
        titleKey: 'app.apps.groups.office',
        apps: [APPS[0], APPS[2]]
    },
    {
        titleKey: 'app.apps.groups.writing',
        apps: [APPS[1]]
    }
]
