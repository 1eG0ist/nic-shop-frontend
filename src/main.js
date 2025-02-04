import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js';
import store from "@/store"
import components from "@/components/UI"

import './variables.css';
import directives from "@/directives/index.js";

store.commit('auth/initializeUser');

const app = createApp(App);

components.forEach(compon => {
    app.component(compon.name, compon);
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app
    .use(router)
    .use(store)
    .mount('#app')
