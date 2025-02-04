<template>
  <div class="order-cell-card">
    <div class="product-info">
      <h3>{{ orderCell.product.name }}</h3>
      <p>{{ orderCell.product.description }}</p>
      <div class="options">
        <div class="price">
          <span v-if="isAuthenticated && orderCell.product.sale" class="old-price">{{ orderCell.product.price }}₽</span>
          <span class="new-price">{{ displayPrice }}₽</span>
        </div>
        <div class="count">
          <div class="quantity-controls">
            <button @click="decreaseQuantity" :disabled="orderCell.count <= 1">-</button>
            <span>{{ orderCell.count }}</span>
            <button @click="increaseQuantity" :disabled="!canIncrease">+</button>
          </div>
          <button @click="removeFromCart" class="remove-button">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import store from "@/store/index.js";
import {OrderCell} from "@/models/OrderCell.js";

const props = defineProps({
  orderCell: {
    type: OrderCell,
    required: true,
  },
});

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);

const displayPrice = computed(() => {
  if (isAuthenticated.value && props.orderCell.product.sale) {
    return (props.orderCell.product.price * (1 - props.orderCell.product.sale / 100)).toFixed(2);
  }
  return props.orderCell.product.price;
});

const canIncrease = computed(() => {
  return props.orderCell.count < props.orderCell.product.count;
});

const increaseQuantity = () => {
  if (canIncrease.value) {
    store.commit('cart/INCREASE_QUANTITY', props.orderCell.product.id);
  } else {
    alert('Недостаточно товара на складе');
  }
};

const decreaseQuantity = () => {
  store.commit('cart/DECREASE_QUANTITY', props.orderCell.product.id);
};

const removeFromCart = () => {
  store.commit('cart/REMOVE_FROM_CART', props.orderCell.product.id);
};
</script>

<style scoped>
.order-cell-card {
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  overflow: clip;
  transition: box-shadow 0.2s, transform 0.2s;
  padding: 16px;
  margin-bottom: 10px;
}

.order-cell-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.product-info {
  flex: 1;
}

.old-price {
  text-decoration: line-through;
  color: var(--text-color);
  margin-right: 8px;
  align-self: center;
}

.new-price {
  color: var(--primary-color);
  font-weight: bold;
  align-self: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-controls button {
  padding: 4px 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--background-secondary-color);
  cursor: pointer;
}

.quantity-controls button:disabled {
  cursor: not-allowed;
}

.remove-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: red;
  color: white;
  cursor: pointer;
}

.remove-button:hover {
  background-color: darkred;
}

.options {
  gap: 4px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.price {
  align-self: center;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
}

.count {
  flex-wrap: wrap;
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px
}
</style>