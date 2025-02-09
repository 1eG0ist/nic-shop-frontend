<template>
  <div class="product-view">
    <div v-if="product != null">
      <ProductInfo :product="product" />
      <ProductComments :product-id="product.id" />
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
  console.log(product);
  console.log(product.value);
});
</script>

<style scoped>
.product-view {
  padding: 20px;
}
</style>
