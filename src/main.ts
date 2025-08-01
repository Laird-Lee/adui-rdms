import '@unocss/reset/normalize.css'
import '@/assets/styles/theme-variables.css'
import 'virtual:uno.css'

import App from './App.vue'

import { setupStore } from '@/stores'
import { setupRouter } from '@/router'

const app = createApp(App)
async function setupApp() {
  setupStore(app)
  await setupRouter(app)
  app.mount('#app')
}

void setupApp()
