<script setup lang="ts">
type MenuNode = {
  key: string
  path: string
  label: string
  icon?: string
  children?: MenuNode[]
}

defineProps<{
  items: MenuNode[]
  collapsed: boolean
}>()
</script>

<template>
  <template v-for="child in items" :key="child.key">
    <t-submenu v-if="child.children && child.children.length" :value="child.path">
      <template #icon v-if="!collapsed">
        <t-icon v-if="child.icon" :name="child.icon" />
        <div v-else class="empty-icon"></div>
      </template>
      <template #title>
        <div class="flex items-center gap-8px">
          <span>{{ child.label }}</span>
        </div>
      </template>
      <MenuChildren :collapsed="collapsed" :items="child.children" />
    </t-submenu>

    <t-menu-item v-else :value="child.path">
      <template #icon v-if="!collapsed">
        <t-icon v-if="child.icon" :name="child.icon" />
        <div v-else class="empty-icon"></div>
      </template>
      <div class="flex items-center gap-8px">
        <span>{{ child.label }}</span>
      </div>
    </t-menu-item>
  </template>
</template>

<style scoped lang="less">
.empty-icon {
  width: 20px;
  height: 20px;
  margin-right: var(--td-comp-margin-s);
}
</style>
