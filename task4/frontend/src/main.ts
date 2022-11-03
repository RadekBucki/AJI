import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import MenuIcon from 'vue-material-design-icons/Menu.vue';
import 'vue-material-design-icons/styles.css';

createApp(App).use(store)
    .use(router)
    .use(axios, {baseUrl: process.env.VUE_APP_BACKEND_URL})
    .component('menu-icon', MenuIcon)
    .mount('#app');