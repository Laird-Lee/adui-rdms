<script setup lang="ts">
import { computed } from 'vue'
import LogoTwoTone from '@/assets/icons/LogoTwoTone.vue'
import { useThemeStore } from '@/stores/useThemeStore.ts'
import { THEME_STYLE } from '@/constants/theme.ts'

const themeStore = useThemeStore()

type ThemeStyle = (typeof THEME_STYLE)[keyof typeof THEME_STYLE]
const HIGHLIGHT_STYLES = new Set<ThemeStyle>([THEME_STYLE.EVA_01, THEME_STYLE.MODE])

function getCssVar(name: string, fallback: string) {
  if (typeof window === 'undefined') return fallback
  const styles = getComputedStyle(document.documentElement)
  const value = styles.getPropertyValue(name).trim()
  return value || fallback
}

const primaryColor = computed(() => {
  // 建立依赖：样式/模式任一变化都重新计算
  void themeStore.currentTheme.style
  void themeStore.currentTheme.mode
  return getCssVar('--td-brand-color', '#0052d9')
})

const secondaryColor = computed(() => {
  void themeStore.currentTheme.style
  void themeStore.currentTheme.mode
  const useSuccess = HIGHLIGHT_STYLES.has(themeStore.currentTheme.style as ThemeStyle)
  return useSuccess
    ? getCssVar('--td-success-color', '#00a870')
    : getCssVar('--td-warning-color', '#ed7b2f')
})

const titleText = computed(() => import.meta.env.VITE_APP_TITLE ?? 'Application')

defineProps<{ collapsed: boolean }>()
</script>

<template>
  <div
    class="flex justify-center items-center gap-10px h-56px transition-[width] duration-200 ease-out select-none"
  >
    <logo-two-tone class="size-30px" :colors="[primaryColor, secondaryColor]" />
    <div
      v-if="!collapsed"
      class="font-bold text-20px whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-150"
    >
      {{ titleText }}
    </div>
    <div v-else :title="titleText" class="sr-only">{{ titleText }}</div>
  </div>
</template>

<style scoped></style>
