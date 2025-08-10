<script setup lang="ts">
import LayoutHeader from '@/layout/LayoutHeader.vue'
import LayoutSider from '@/layout/LayoutSider.vue'
import LayoutMain from '@/layout/layoutMain.vue'
</script>

<template>
  <t-layout>
    <layout-sider />
    <t-layout>
      <layout-header />
      <layout-main />
    </t-layout>
  </t-layout>
</template>

<style scoped></style>
