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
}>()
</script>

<template>
  <template v-for="child in items" :key="child.key">
    <t-submenu v-if="child.children && child.children.length" :value="child.path">
      <template #icon>
        <t-icon v-if="child.icon" :name="child.icon" />
      </template>
      <template #title>
        <div class="flex items-center gap-8px">
          <span>{{ child.label }}</span>
        </div>
      </template>
      <MenuChildren :items="child.children" />
    </t-submenu>

    <t-menu-item v-else :value="child.path">
      <template #icon>
        <t-icon v-if="child.icon" :name="child.icon" />
      </template>
      <div class="flex items-center gap-8px">
        <span>{{ child.label }}</span>
      </div>
    </t-menu-item>
  </template>
</template>
