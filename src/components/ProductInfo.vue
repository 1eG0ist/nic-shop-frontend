<template>
  <div class="product-info">
<!--    <img :src="product.imagePath" :alt="product.name" class="product-image" />-->
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p>Цена: {{ product.price }} руб.</p>
    <p>Количество: {{ product.count }}</p>
    <p v-if="product.sale">Скидка: {{ product.sale }}%</p>
  </div>
</template>

<script setup>
import {Product} from "@/models/Product.js";

defineProps({
  product: {
    type: Product,
    required: true,
  },
});
</script>

<style scoped>
.product-info {
  padding: 10px;
  text-align: start;
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>