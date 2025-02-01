<template>
  <div class="product-page">
    <CategoryList @products-loaded="handleProductsLoaded" />
    <ProductList :products="products" />
  </div>
</template>

<script>
import CategoryList from "@/components/CategoryList.vue";
import ProductList from "@/components/ProductList.vue";

export default {
  components: {
    CategoryList,
    ProductList,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    handleProductsLoaded(products) {
      this.products = products;
    },
  },
};
</script>

<style scoped>
.product-page {
  display: flex;
}
</style>
