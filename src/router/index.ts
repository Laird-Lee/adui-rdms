import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const BaseUrl = import.meta.env.VITE_BASE_URL

export const router = createRouter({
  history: createWebHashHistory(BaseUrl),
  routes: [],
})

export async function setupRouter(app: App<Element>) {
  app.use(router)
  await router.isReady()
}

export default router
