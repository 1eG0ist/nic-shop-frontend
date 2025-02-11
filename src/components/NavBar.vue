<template>
  <div class="navbar">
    <div class="catalogue" @click="swapToCatalogue">Каталог</div>
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
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import store from "@/store/index.js";

const router = useRouter();

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
const user = computed(() => store.getters['auth/user']);
const totalItemsInCart = computed(() => store.getters['cart/totalItemsInCart']);

const cartItemsCount = computed(() => totalItemsInCart.value);

const swapToCatalogue = () => {
  router.push({ path: '/'});
}

const logout = () => {
  store.dispatch('auth/logoutUser');
  localStorage.clear();
  router.push('/login');
};

const swapToCart = () => {
  router.push({ path: '/cart' });
}
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
  padding: 0 20px 0 20px;
  position: sticky;
  top: 0;
}

.catalogue {
  margin-left: 30px;
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
</style>