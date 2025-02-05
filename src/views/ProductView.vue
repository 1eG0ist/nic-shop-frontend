<template>
  <div class="product-view">
    <div v-if="product">
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
    product.value = Product.fromJson(JSON.parse(route.query.product));
  }
});
</script>
