<script setup lang="ts">
import palette from '@/assets/icons/svg/palette.svg'
import { THEME_MODE, THEME_STYLE } from '@/constants/theme.ts'
import { useThemeStore } from '@/stores/useThemeStore.ts'
import type { HeadMenuProps, RadioGroupProps } from 'tdesign-vue-next'
import type { ThemeMode, ThemeStyle } from '@/types/theme.ts'

const THEME_STYLE_OPTIONS: ComputedRef<{ label: string; value: ThemeStyle }[]> = computed(() => [
  { label: 'EVA-00', value: THEME_STYLE.EVA_00 },
  { label: 'EVA-01', value: THEME_STYLE.EVA_01 },
  { label: 'EVA-02', value: THEME_STYLE.EVA_02 },
  { label: t('common.default'), value: THEME_STYLE.MODE },
])

const THEME_STYLE_SWATCH = {
  [THEME_STYLE.EVA_00]: {
    light: '#f0bc3f',
    dark: '#d3a225',
  },
  [THEME_STYLE.EVA_01]: {
    light: '#6a1b9a',
    dark: '#bd71ee',
  },
  [THEME_STYLE.EVA_02]: {
    light: '#e13b36',
    dark: '#ff6056',
  },
  [THEME_STYLE.MODE]: {
    light: '#0052d9',
    dark: '#4582e6',
  },
} as const

const { t } = useI18n()

const themeStore = useThemeStore()

const handleChangeStyle: HeadMenuProps['onChange'] = (value) => {
  themeStore.changeStyle(value as ThemeStyle)
}
const handleChangeMode: RadioGroupProps['onChange'] = (value) => {
  themeStore.toggleMode(value as ThemeMode)
}

function getSwatch(style: ThemeStyle) {
  const mode = themeStore.currentTheme.mode
  const pair = THEME_STYLE_SWATCH[style]
  return mode === THEME_MODE.DARK ? pair.dark : pair.light
}

const visible = defineModel<boolean>('visible')
</script>

<template>
  <t-drawer v-model:visible="visible" :footer="false">
    <template #header>
      <div class="w-full flex justify-between items-center">
        <div class="flex items-center gap-10px">
          <t-icon name="t-icon-palette" :url="palette"></t-icon>
          <div>{{ t('setting.theme') }}</div>
        </div>
        <t-button variant="text" @click="visible = false">
          <template #icon>
            <t-icon name="close" />
          </template>
        </t-button>
      </div>
    </template>
    <t-divider align="left">{{ t('title.theme') }}</t-divider>
    <t-menu class="w-full! h-auto!" @change="handleChangeStyle">
      <t-menu-item v-for="item in THEME_STYLE_OPTIONS" :key="item.value" :value="item.value">
        <div class="theme-item flex items-center gap-10px">
          <div
            class="size-20px rounded-[3px]"
            :style="{ backgroundColor: getSwatch(item.value) }"
          ></div>
          <div class="theme-item__label" :style="{ '--preview-color': getSwatch(item.value) }">
            {{ item.label }}
          </div>
        </div>
      </t-menu-item>
    </t-menu>
    <t-divider align="left">{{ t('title.mode') }}</t-divider>
    <t-radio-group
      variant="default-filled"
      :value="themeStore.currentTheme.mode"
      @change="handleChangeMode"
    >
      <t-radio-button :value="THEME_MODE.LIGHT">
        <t-icon name="mode-light" />
      </t-radio-button>
      <t-radio-button :value="THEME_MODE.DARK">
        <t-icon name="mode-dark" />
      </t-radio-button>
    </t-radio-group>
  </t-drawer>
</template>

<style scoped lang="less">
:deep(.t-default-menu__inner .t-menu) {
  padding: 0;
}

.theme-item {
  transition: color 0.2s ease;
  .theme-item__label {
    transition: color 0.2s ease;
  }
  &:hover {
    color: var(--preview-color);
    .theme-item__label {
      color: var(--preview-color);
    }
  }
}
</style>
