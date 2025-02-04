<template>
  <div class="product-page">
    <CategoryList @category-selected="handleCategorySelected" />
    <ProductList :categoryId="selectedCategoryId" />
  </div>
</template>

<script>
import CategoryList from "@/components/CategoryList.vue";
import ProductList from "@/components/ProductList.vue";
import {ref} from 'vue';

export default {
  components: {
    CategoryList,
    ProductList,
  },
  setup() {
    const selectedCategoryId = ref(null);

    const handleCategorySelected = (categoryId) => {
      selectedCategoryId.value = categoryId;
    };

    return {
      selectedCategoryId,
      handleCategorySelected,
    };
  },
};
</script>

<style>
.product-page {
  display: flex;
}
</style>