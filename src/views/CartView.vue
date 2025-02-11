<template>
  <div class="cart-view">
    <h1>Корзина</h1>
    <div v-if="orderCells.length <= 0">
      <p>Ваша корзина пуста</p>
    </div>
    <div v-else class="content">
      <div class="products-list">
        <OrderCellCard
            v-for="orderCell in orderCells"
            :key="orderCell.product.id"
            :orderCell="orderCell"
            @update-quantity="updateQuantity"
            @remove="removeFromCart"
        />
      </div>
      <div class="sum-info">
        <strong>Ваш заказ: </strong>
        <div>Количество товаров: {{ totalItems }}</div>
        <div>Общая сумма заказа: {{ totalPrice }}₽</div>
        <default-button
            @click="createOrder"
            :disabled="!isAuthenticated"
            class="checkout-button">
          Оформить заказ
        </default-button>
        <p v-if="!isAuthenticated" class="auth-warning">Для оформления заказа необходимо авторизоваться.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import OrderCellCard from '@/components/UI/OrderCellCard.vue';
import store from "@/store/index.js";
import DefaultButton from "@/components/UI/DefaultButton.vue";
import axios from '@/api/axios.js';

const orderCells = computed(() => store.state.cart.orderCells);
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);

const totalItems = computed(() => {
  return orderCells.value.reduce((total, cell) => total + cell.count, 0);
});

const totalPrice = computed(() => {
  return orderCells.value.reduce((total, cell) => total + cell.product.price * (1 - (cell.product.sale / 100)) * cell.count, 0).toFixed(2);
});

const updateQuantity = (orderCell, change) => {
  store.commit('cart/UPDATE_QUANTITY', { orderCell, change });
};

const removeFromCart = (orderCell) => {
  store.commit('cart/REMOVE_FROM_CART', orderCell);
};

const createOrder = async () => {
  if (isAuthenticated.value) {
    const response = await axios.post(
        `/orders`,
        orderCells.value.map(cell => ({
          productId: cell.product.id,
          count: cell.count,
        })),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          }
        }
    );
    if (response.status === 200) {
      alert('Заказ оформлен!');
      store.commit('cart/CLEAR_CART');
    } else {
      alert(response.statusText);
    }
  } else {
    alert('Для оформления заказа необходимо авторизоваться.');
  }
};
</script>

<style scoped>
.cart-view {
  padding: 16px;
}

.cart-view h1 {
  font-size: 2em;
  color: var(--text-color);
  margin-bottom: 16px;
}

.content {
  display: flex;
  flex-direction: row;
  gap: 50px;
}

.sum-info {
  padding: 16px;
  display: flex;
  height: 50%;
  min-width: 200px;
  max-width: 250px;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.checkout-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  font-size: 1em;
}

.checkout-button:disabled {
  cursor: not-allowed;
}

.auth-warning {
  color: indianred;
  font-size: 0.9em;
  margin-top: 8px;
}

.products-list {
  display: flex;
  flex-direction: column;
}
</style>