import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Registration from '../views/Registration.vue';
import Home from "@/views/Home.vue";
import Product from "@/views/Product.vue";

const routes = [
    { path: '/login', component: Login },
    { path: '/registration', component: Registration },
    { path: "/", component: Home},
    { path: "/product", component: Product},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;