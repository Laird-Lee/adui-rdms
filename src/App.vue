<script setup lang="ts">
import { useThemeStore } from '@/stores/useThemeStore.ts'
import { THEME_MODE, THEME_STYLE } from '@/constants/theme.ts'

const themeStore = useThemeStore()

themeStore.init()

const switchToNextTheme = () => {
  const styles = Object.values(THEME_STYLE)
  const currentIndex = styles.indexOf(themeStore.currentTheme.style)
  const nextIndex = (currentIndex + 1) % styles.length
  themeStore.changeStyle(styles[nextIndex])
}

const switchToNextMode = () => {
  const modes = Object.values(THEME_MODE)
  const currentIndex = modes.indexOf(themeStore.currentTheme.mode)
  const nextIndex = (currentIndex + 1) % modes.length
  themeStore.toggleMode(modes[nextIndex])
}
</script>

<template>
  <t-space direction="vertical">
    <t-space>
      <t-button theme="default" @click="switchToNextTheme">填充按钮（切换主题）</t-button>
      <t-button variant="outline" theme="default">描边按钮</t-button>
      <t-button variant="dashed" theme="default">虚框按钮</t-button>
      <t-button variant="text" theme="default">文字按钮</t-button>
    </t-space>
    <t-space>
      <t-button theme="primary" @click="switchToNextMode">填充按钮（切换模式）</t-button>
      <t-button variant="outline" theme="primary">描边按钮</t-button>
      <t-button variant="dashed" theme="primary">虚框按钮</t-button>
      <t-button variant="text" theme="primary">文字按钮</t-button>
    </t-space>
    <t-space>
      <t-button theme="danger">填充按钮</t-button>
      <t-button variant="outline" theme="danger">描边按钮</t-button>
      <t-button variant="dashed" theme="danger">虚框按钮</t-button>
      <t-button variant="text" theme="danger">文字按钮</t-button>
    </t-space>
    <t-space>
      <t-button theme="warning">填充按钮</t-button>
      <t-button variant="outline" theme="warning">描边按钮</t-button>
      <t-button variant="dashed" theme="warning">虚框按钮</t-button>
      <t-button variant="text" theme="warning">文字按钮</t-button>
    </t-space>
    <t-space>
      <t-button theme="success">填充按钮</t-button>
      <t-button variant="outline" theme="success">描边按钮</t-button>
      <t-button variant="dashed" theme="success">虚框按钮</t-button>
      <t-button variant="text" theme="success">文字按钮</t-button>
    </t-space>
  </t-space>
</template>

<style scoped></style>
