<template>
  <div class="category-list">
    <button @click="toggleMenu" class="menu-button">
      <span class="menu-icon">&#9776;</span>
    </button>
    <div v-if="isMenuOpen" class="category-menu">
      <CategoryTree :categories="categories" @category-selected="handleCategorySelected" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CategoryTree from './CategoryTree.vue';
import { reactive } from 'vue';

export default {
  components: {
    CategoryTree,
  },
  data() {
    return {
      categories: reactive([]),
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        this.categories = response.data.map(category => ({
          ...category,
          isOpen: false,
        }));
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    },
    handleCategorySelected(category) {
      this.fetchProductsByCategory(category.id);
    },
    async fetchProductsByCategory(categoryId) {
      try {
        const response = await axios.get(`/api/products/by_category?id=${categoryId}&page=0`);
        this.$emit('products-loaded', response.data.content);
      } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
      }
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
.category-list {
  background-color: #f4f4f4;
  padding: 10px;
}

.menu-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.menu-icon {
  display: inline-block;
}

.category-menu {
  margin-top: 10px;
}
</style>
