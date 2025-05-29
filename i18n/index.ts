export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'zh-Hans', 'th'],
} as const

export type Locale = typeof i18n['locales'][number]
