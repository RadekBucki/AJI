import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'

createApp(App).use(store)
    .use(router)
    .use(axios, {baseUrl: process.env.VUE_APP_BACKEND_URL})
    .mount('#app')
