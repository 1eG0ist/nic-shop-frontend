<template>
  <div class="product-view">
    <div v-if="product != null">
      <ProductInfo :product="product" />
      <div class="divider"/>
      <ProductComments :product="product" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductInfo from '@/components/ProductInfo.vue';
import ProductComments from '@/components/ProductCommentList.vue';
import { Product } from '@/models/Product.js';

const route = useRoute();
const product = ref(null);

onMounted(() => {
  if (route.query.product) {
    try {
      const productData = JSON.parse(route.query.product);
      product.value = Product.fromJson(productData);
    } catch (error) {
      console.error("Ошибка парсинга JSON:", error);
    }
  }
});
</script>

<style scoped>
.product-view {
  padding: 20px;
}

.divider {
  height: 3px;
  width: 100%;
  border-radius: 10px;
  background-color: var(--secondary-color);
  margin-bottom: 10px;
}
</style>
