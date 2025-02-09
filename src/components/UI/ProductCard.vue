<template>
  <div class="product-card" @click="swapToProductPage">
    <img class="product-card-img" type="png" :src="imageUrl" :alt="`${product.name} image`"/>
    <div class="product-info">
      <h2 class="product-name">{{ product.name }}</h2>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-price">
        <div style="display: flex; flex-direction: row; justify-content: center;">
          <span v-if="isAuthenticated && product.sale" class="old-price">{{ product.price }}₽</span>
          <span class="new-price">{{ displayPrice }}₽</span>
        </div>
        <div :class="availabilityClass">{{ availabilityText }}</div>
        <default-button
            @click="addToCart"
            :disabled="props.product.count === 0"
            class="add-to-cart-button">
          В корзину
        </default-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, computed} from 'vue';
import {Product} from "@/models/Product.js";
import DefaultButton from "@/components/UI/DefaultButton.vue";
import store from "@/store/index.js";
import router from "@/router/index.js";

const props = defineProps({
  product: {
    type: Product,
    required: true,
  },
});

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);

const displayPrice = computed(() => {
  if (isAuthenticated.value && props.product.sale) {
    return (props.product.price * (1 - props.product.sale / 100)).toFixed(2);
  }
  return props.product.price;
});

const availabilityText = computed(() => {
  if (props.product.count === 0) {
    return 'Нет в наличии';
  } else if (props.product.count > 5) {
    return 'В наличии';
  } else {
    return 'Мало';
  }
});

const availabilityClass = computed(() => {
  if (props.product.count === 0) {
    return 'availability-out-of-stock';
  } else if (props.product.count > 5) {
    return 'availability-in-stock';
  } else {
    return 'availability-low-stock';
  }
});

const swapToProductPage = () => {
  router.push({
    path: '/product',
    query: { product: JSON.stringify(props.product) }
  });}

const addToCart = () => {
  store.dispatch('cart/addToCart', props.product);
};

const imageUrl = computed(() => {
  return '/api/images?path=' + props.product.imagePath;
});
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: row;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
  padding: 16px;
  margin-bottom: 10px;
  gap: 16px;
}

.product-card-img {
  height: 200px;
  width: 200px;
  object-fit: cover; /* Обрезает изображение, чтобы оно покрывало всю область */
  object-position: center; /* Центрирует изображение */
  background: transparent;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1.5em;
  color: var(--text-color);
  margin-bottom: 8px;
}

.product-description {
  font-size: 1em;
  color: var(--secondary-color);
  margin-bottom: 16px;
}

.product-price {
  font-size: 1.2em;
  color: var(--primary-color);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
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

.availability-in-stock {
  font-size: 1em;
  color: green;
  align-self: center;
}

.availability-low-stock {
  font-size: 1em;
  color: orange;
  align-self: center;
}

.availability-out-of-stock {
  font-size: 1em;
  color: red;
  align-self: center;
}

.add-to-cart-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart-button:disabled {
  cursor: not-allowed;
}
</style>
