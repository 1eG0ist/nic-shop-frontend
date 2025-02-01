<template>
  <div class="product-list">
    <h2>Продукты</h2>
    <div v-if="products.length">
      <div v-for="product in products" :key="product.id" class="product-item">
        {{ product.name }}
      </div>
    </div>
    <div v-else>
      Продукты не найдены.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.product-list {
  padding: 20px;
  flex-grow: 1;
}
.product-item {
  margin: 10px 0;
}
</style>
