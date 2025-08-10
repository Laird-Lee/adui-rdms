import { useI18n } from 'vue-i18n'
import zhCN from 'tdesign-vue-next/es/locale/zh_CN'
import enUS from 'tdesign-vue-next/es/locale/en_US'

export function useTdLocale() {
  const { locale } = useI18n()
  const tdLocale = computed(() => (locale.value === 'zh-CN' ? zhCN : enUS))
  return { tdLocale }
}
