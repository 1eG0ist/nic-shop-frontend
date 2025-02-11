<template>
  <div class="category-list">
    <button @click="toggleMenu" class="menu-button">
      <span class="menu-icon" style="color: black; font-size: 30px">&#9776;</span>
    </button>
    <div v-if="isMenuOpen" class="category-menu">
      <CategoryTree :categories="categories" @category-selected="handleCategorySelected" />
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios.js';
import CategoryTree from './CategoryTree.vue';
import {reactive} from 'vue';

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
        const response = await axios.get('/categories');
        this.categories = response.data.map(category => ({
          ...category,
          isOpen: false,
        }));
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    },
    handleCategorySelected({path}) {
      this.$emit('category-selected', { category: path[path.length -1], path });
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
  border: none;
  background: var(--background-secondary-color);
}

.category-menu {
  background: var(--background-secondary-color);
}
</style>