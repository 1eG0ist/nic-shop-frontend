import { createRouter, createWebHistory } from 'vue-router';
import LoginView from "@/views/LoginView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import HomeView from "@/views/HomeView.vue";
import ProductView from "@/views/ProductView.vue";
import CartView from "@/views/CartView.vue";

const routes = [
    { path: '/login', component: LoginView },
    { path: '/registration', component: RegistrationView },
    { path: "/", component: HomeView},
    { path: "/product", component: ProductView},
    { path: "/cart", component: CartView},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;