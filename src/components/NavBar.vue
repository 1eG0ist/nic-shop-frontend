<template>
  <div class="navbar">
    <div class="left-section">
      <div class="catalogue" @click="swapToCatalogue">Каталог</div>
      <div class="admin-functions" v-if="isAdmin" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
        <strong>Администрирование</strong>
        <div v-if="showDropdown" class="dropdown">
          <div @click="createProduct" class="dropdown-item">Создать продукт</div>
          <div @click="manageCategories" class="dropdown-item">Администрировать категории</div>
        </div>
      </div>
    </div>
    <div class="right-section">
      <div class="user-info" v-if="isAuthenticated">
        <span class="fio">{{ user.surname }} {{ user.name.charAt(0).toUpperCase() }}.</span>
        <div @click="logout" class="logout">Выйти</div>
      </div>
      <router-link to="/login" v-else>Войти</router-link>
      <div class="cart" @click="swapToCart">
        <span class="cart-count" v-if="cartItemsCount > 0">{{ cartItemsCount }}</span>
        Корзина
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import { useRouter } from 'vue-router';
import store from "@/store/index.js";

const router = useRouter();

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
const user = computed(() => store.getters['auth/user']);
const totalItemsInCart = computed(() => store.getters['cart/totalItemsInCart']);
const showDropdown = ref(false);
const cartItemsCount = computed(() => totalItemsInCart.value);

const swapToCatalogue = () => {
  router.push({ path: '/'});
}

const isAdmin = computed(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.roles && user.roles.some(role => role.name === 'ROLE_ADMIN');
});

const logout = () => {
  store.dispatch('auth/logoutUser');
  localStorage.clear();
  router.push('/login');
};

const swapToCart = () => {
  router.push({ path: '/cart' });
}

const createProduct = () => {
  router.push({ path: '/product_administration' });
};

const manageCategories = () => {
  router.push({ name: 'ManageCategories' });
};
</script>

<style scoped>
.navbar {
  width: 100%;
  background: var(--background-secondary-color);
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
}

.catalogue {
  font-weight: bold;
  cursor: pointer;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 40px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.fio {
  color: blue;
  font-size: 16px;
  font-weight: bold;
}

.logout {
  cursor: pointer;
  color: red;
}

.cart {
  cursor: pointer;
  font-weight: bold;
  position: relative;
}

.cart-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}

.navbar a {
  text-decoration: none;
  color: inherit;
}

.left-section {
  margin-left: 60px;
  display: flex;
  flex-direction: row;
}

.admin-functions {
  position: relative;
  cursor: pointer;
  margin-left: 20px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
  white-space: nowrap;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>