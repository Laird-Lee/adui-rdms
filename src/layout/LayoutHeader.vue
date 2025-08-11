<script setup lang="ts">
import type { DropdownProps } from 'tdesign-vue-next'
import LayoutSetting from '@/layout/components/LayoutSetting.vue'
import { setLocale } from '@/locales'
import { useI18n } from 'vue-i18n'

const USER_MENU = {
  PROFILE: 'profile',
  LOGOUT: 'logout',
} as const

const { t } = useI18n()

const userMenuOptions: DropdownProps['options'] = computed(() => [
  { content: t('common.profile'), value: USER_MENU.PROFILE },
  { content: t('common.logout'), value: USER_MENU.LOGOUT },
])

const handleUserMenu: DropdownProps['onClick'] = (option) => {
  // 根据业务处理菜单点击
  switch (option.value) {
    case USER_MENU.PROFILE:
      // 跳转或打开个人中心
      break
    case USER_MENU.LOGOUT:
      // 触发登出流程
      break
    default:
      break
  }
}

const settingVisible = ref(false)

const LOCALES = {
  ZH_CN: 'zh-CN',
  EN: 'en',
} as const

type AppLocale = (typeof LOCALES)[keyof typeof LOCALES]

const localeOptions: DropdownProps['options'] = [
  { content: '简体中文', value: LOCALES.ZH_CN },
  { content: 'English', value: LOCALES.EN },
] as const

const handleLocaleClick: DropdownProps['onClick'] = (option) => {
  const next = option.value as AppLocale
  setLocale(next)
}
</script>

<template>
  <t-header>
    <div class="h-full pl-20px pr-20px flex justify-end items-center">
      <t-space>
        <t-dropdown :options="localeOptions" trigger="click" @click="handleLocaleClick">
          <t-button shape="circle" variant="text">
            <template #icon>
              <t-icon name="translate" />
            </template>
          </t-button>
        </t-dropdown>

        <t-badge size="small" count="100">
          <t-button shape="circle" variant="text">
            <template #icon>
              <t-icon name="notification" />
            </template>
          </t-button>
        </t-badge>

        <t-button
          shape="circle"
          variant="text"
          href="https://github.com/Laird-Lee/adui-rdms"
          target="_blank"
        >
          <template #icon>
            <t-icon name="logo-github-filled" />
          </template>
        </t-button>

        <t-button shape="circle" variant="text" @click="settingVisible = true">
          <template #icon>
            <t-icon name="setting" />
          </template>
        </t-button>

        <t-dropdown :options="userMenuOptions" trigger="click" @click="handleUserMenu">
          <t-button variant="text">
            <template #icon><t-icon name="user" size="16" /></template>
            <template #suffix><t-icon name="chevron-down" size="16" /></template>
            admin
          </t-button>
        </t-dropdown>
      </t-space>
    </div>
  </t-header>
  <layout-setting v-model:visible="settingVisible" />
</template>

<style scoped></style>
