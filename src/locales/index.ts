import { createI18n } from 'vue-i18n'
import type { App } from 'vue'

export type AppLocale = 'zh-CN' | 'en'

const STORAGE_KEY = 'app-locale'

function getInitialLocale(): AppLocale {
  const saved = localStorage.getItem(STORAGE_KEY) as AppLocale | null
  if (saved) return saved
  // 简单按浏览器语言兜底
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {}, // 先空，按需加载
})

async function loadLocaleMessages(locale: AppLocale) {
  const messages = await import(`./lang/${locale}.json`)
  i18n.global.setLocaleMessage(locale, messages.default || messages)
}

export async function setLocale(locale: AppLocale) {
  if (!i18n.global.availableLocales.includes(locale)) {
    await loadLocaleMessages(locale)
  }
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
}

export async function setupI18n(app: App<Element>) {
  await loadLocaleMessages(i18n.global.locale.value as AppLocale)
  app.use(i18n)
}
