import { createApp } from 'vue'
import "src/bootstrap";
import App from './App.vue'
import router from './routes/main'
import { store } from './stores/main'
import Bootstrapper from './bootstrap'

const app = createApp(App)
    .use(router)
    .use(store)

Bootstrapper.setMainVueInstance(app)
    .setRouter(router)
    .initializeGoogleAnalytics()
    .initializePlugins()

app.mount('#app')