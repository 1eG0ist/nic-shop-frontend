import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js';
import store from "@/store"

import './variables.css';

store.commit('auth/initializeUser');

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
