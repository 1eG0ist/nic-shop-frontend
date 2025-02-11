<template>
  <div class="product-page">
    <CategoryList @category-selected="handleCategorySelected" class="category-list"/>
    <ProductList :category="selectedCategory" :categoryPath="selectedCategoryPath" />
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
    const selectedCategory = ref(null);
    const selectedCategoryPath = ref('');

    const handleCategorySelected = ({category, path}) => {
      selectedCategory.value = category;
      selectedCategoryPath.value = "Главная / " + path.map(category => category.name).join(' / ');
    };

    return {
      selectedCategory,
      selectedCategoryPath,
      handleCategorySelected,
    };
  },
};
</script>

<style>
.product-page {
  display: flex;
}

.category-list {
  position: fixed;
  top: 0;
  left: 0;

}
</style>