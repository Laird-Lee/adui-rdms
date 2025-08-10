<script setup lang="ts">
import { useTdLocale } from '@/plugins/td-locale'
import { merge } from 'lodash-es'
import type { GlobalConfigProvider } from 'tdesign-vue-next'
const { tdLocale } = useTdLocale()

const globalConfig = merge(tdLocale, {}) as GlobalConfigProvider
</script>

<template>
  <t-config-provider :global-config="globalConfig">
    <div class="app-container">
      <router-view class="w-full h-full" v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </t-config-provider>
</template>

<style lang="less">
.app-container {
  width: 100vw;
  height: 100vh;
  view-transition-name: page;
}
</style>
