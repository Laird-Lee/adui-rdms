import type { ThemeConfig, ThemeMode, ThemeStyle } from '@/types/theme.ts'
import { THEME_MODE, THEME_STYLE } from '@/constants/theme.ts'
import { withViewTransition } from '@/utils/view-transition.ts'

// 默认主题配置
const defaultTheme: ThemeConfig = {
  mode: THEME_MODE.LIGHT,
  style: THEME_STYLE.EVA_00,
}

export const useThemeStore = defineStore(
  'theme',
  () => {
    const currentTheme = ref<ThemeConfig>(defaultTheme)
    let cleanupListener: (() => void) | null = null

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

    function setTheme(config: Partial<ThemeConfig>) {
      currentTheme.value = {
        ...currentTheme.value,
        ...config,
      }
    }

    async function toggleMode(value: ThemeMode) {
      await withViewTransition(() => {
        setTheme({ mode: value })
      })
    }

    function changeStyle(style: ThemeStyle) {
      setTheme({ style })
    }

    // 应用主题到 DOM
    function applyTheme() {
      const root = document.documentElement
      const { mode, style } = currentTheme.value

      // 清除所有可能的主题样式
      Object.values(THEME_STYLE).forEach((themeStyle) => {
        root.removeAttribute(`theme-${themeStyle}`)
      })

      root.setAttribute(`theme-${style}`, mode)
    }

    // 监听系统主题变化
    function setupSystemThemeListener() {
      const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
        setTheme({
          mode: event.matches ? THEME_MODE.DARK : THEME_MODE.LIGHT,
        })
      }

      handleChange(prefersDark)
      prefersDark.addEventListener('change', handleChange)

      return () => {
        prefersDark.removeEventListener('change', handleChange)
      }
    }

    // 监听主题变化并应用
    watch(
      currentTheme,
      () => {
        applyTheme()
      },
      { deep: true },
    )

    // 初始化
    function init() {
      cleanupListener = setupSystemThemeListener()
      applyTheme()
    }

    function cleanup() {
      if (cleanupListener) {
        cleanupListener()
        cleanupListener = null
      }
    }

    return {
      currentTheme,
      setTheme,
      toggleMode,
      changeStyle,
      init,
      cleanup,
    }
  },
  {
    persist: true,
  },
)
