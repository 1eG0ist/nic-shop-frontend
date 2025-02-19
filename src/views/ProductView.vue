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
import {ref, onMounted, computed} from 'vue';
import { useRoute } from 'vue-router';
import ProductInfo from '@/components/ProductInfo.vue';
import ProductComments from '@/components/ProductCommentList.vue';
import { Product } from '@/models/Product.js';
import axios from "@/api/axios.js";
import store from "@/store/index.js";

const route = useRoute();
const product = ref(null);

const savedProduct = computed(() => store.getters['product/currentProduct']);

onMounted(async () => {
  const productId = Number(route.params.id);
  if (savedProduct.value && savedProduct.value.id === productId) {
    product.value = Product.fromJson(savedProduct.value);
  } else {
    try {
      const response = await axios.get(`/products?id=${productId}`);
      product.value = Product.fromJson(response.data);
    } catch (error) {
      console.error(error);
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
