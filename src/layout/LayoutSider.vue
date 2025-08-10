<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute, type RouteLocationAsString } from 'vue-router'
import Logo from '@/layout/components/Logo.vue'
import { useI18n } from 'vue-i18n'
import MenuChildren from '@/layout/components/MenuChildren.vue'
import type { ButtonProps, MenuProps } from 'tdesign-vue-next'

type MetaTitle = { zh?: string; en?: string } | string | undefined
type RouteMeta = { icon?: string; title?: MetaTitle; hidden?: boolean; [k: string]: unknown }
type MenuNode = {
  key: string
  path: string
  label: string
  icon?: string
  children?: MenuNode[]
}

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

const active = ref<string>(route.fullPath)
const expanded = ref(
  route.matched.filter((v) => !['/', route.fullPath].includes(v.path)).map((v) => v.path),
)

const handleChangeMenu: MenuProps['onChange'] = (path) => {
  router.push(path as RouteLocationAsString)
}

function getLabelByLocale(title: MetaTitle, current: string): string {
  if (!title) return ''
  if (typeof title === 'string') return title
  const lang = current === 'zh-CN' ? 'zh' : 'en'
  return (title[lang as 'zh' | 'en'] ?? title.zh ?? title.en ?? '') as string
}

// 仅收集具有 meta.title 的路由作为菜单项；排除根和显式 hidden
const allRouteRecords = computed(() =>
  router.getRoutes().filter((r) => r.path && r.path !== '/' && !(r.meta as RouteMeta)?.hidden),
)

// 将路由拍平列表构造成树
const menuTree = computed<MenuNode[]>(() => {
  const map = new Map<string, MenuNode>()
  const roots: MenuNode[] = []
  const currentLocale = locale.value

  // 根据路径层级构建父子关系
  const ensureNode = (fullPath: string, meta: RouteMeta) => {
    if (map.has(fullPath)) return map.get(fullPath)!
    const segs = fullPath.split('/').filter(Boolean)
    const key = `/${segs.join('/')}`
    const label = getLabelByLocale(meta?.title, currentLocale)
    const node: MenuNode = {
      key,
      path: key,
      label,
      icon: meta?.icon,
      children: [],
    }
    map.set(key, node)

    if (segs.length === 1) {
      // 顶层
      if (!roots.find((n) => n.key === key)) roots.push(node)
    } else {
      // 连接父节点
      const parentPath = '/' + segs.slice(0, -1).join('/')
      const parentMeta = (allRouteRecords.value.find((r) => r.path === parentPath)?.meta ??
        {}) as RouteMeta
      const parent = ensureNode(parentPath, parentMeta)
      if (!parent.children!.find((n) => n.key === key)) parent.children!.push(node)
    }
    return node
  }

  // 遍历路由记录，跳过没有标题的
  for (const r of allRouteRecords.value) {
    const meta = (r.meta ?? {}) as RouteMeta
    if (!meta.title) continue
    ensureNode(r.path, meta)
  }

  // 清理空 children
  const prune = (nodes: MenuNode[]) => {
    for (const n of nodes) {
      if (n.children && n.children.length === 0) delete n.children
      if (n.children) prune(n.children)
    }
  }
  prune(roots)

  // 按路径字典序简单排序（可根据需要自定义权重）
  const sortNodes = (nodes: MenuNode[]) => {
    nodes.forEach((n) => n.children && sortNodes(n.children))
  }
  sortNodes(roots)

  return roots
})

const collapsed = ref<boolean>(false)

const changeCollapsed: ButtonProps['onClick'] = () => {
  collapsed.value = !collapsed.value
}

// 断点（可按需调整：lg 1024、xl 1280 等）
const BREAKPOINT = 1280

const windowWidth = ref<number>(typeof window !== 'undefined' ? window.innerWidth : BREAKPOINT)
const isBelowBreakpoint = computed(() => windowWidth.value < BREAKPOINT)

// 根据窗口宽度自动设置折叠
function applyCollapsedByWidth() {
  collapsed.value = isBelowBreakpoint.value
}

// 简单防抖（避免频繁触发）
let resizeTimer: number | null = null
function handleResize() {
  if (resizeTimer) window.clearTimeout(resizeTimer)
  resizeTimer = window.setTimeout(() => {
    windowWidth.value = window.innerWidth
  }, 120)
}

onMounted(() => {
  // 初次同步
  applyCollapsedByWidth()
  window.addEventListener('resize', handleResize, { passive: true })
  window.addEventListener('orientationchange', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('orientationchange', handleResize)
  if (resizeTimer) {
    window.clearTimeout(resizeTimer)
    resizeTimer = null
  }
})

// 宽度变化后应用折叠状态
watch(windowWidth, () => {
  applyCollapsedByWidth()
})
</script>

<template>
  <t-aside
    :style="{
      width: collapsed ? '64px' : undefined,
      transition: 'width 0.28s cubic-bezier(0.645, 0.045, 0.355, 1)',
    }"
  >
    <logo :collapsed="collapsed" />
    <t-menu
      class="h-[calc(100%-56px)]!"
      v-model="active"
      v-model:expanded="expanded"
      @change="handleChangeMenu"
      :collapsed="collapsed"
    >
      <template v-for="node in menuTree" :key="node.key">
        <t-submenu v-if="node.children?.length" :value="node.path">
          <template #icon>
            <t-icon v-if="node.icon" :name="node.icon" />
          </template>
          <template #title>
            <div class="flex items-center gap-8px">
              <span>{{ node.label }}</span>
            </div>
          </template>
          <menu-children :items="node.children" />
        </t-submenu>
        <t-menu-item v-else :value="node.path">
          <template #icon>
            <t-icon v-if="node.icon" :name="node.icon" />
          </template>
          <div class="flex items-center gap-8px">
            <span>{{ node.label }}</span>
          </div>
        </t-menu-item>
      </template>
      <template #operations>
        <t-button variant="text" shape="square" @click="changeCollapsed">
          <template #icon><t-icon name="view-list" /></template>
        </t-button>
      </template>
    </t-menu>
  </t-aside>
</template>

<style scoped></style>
