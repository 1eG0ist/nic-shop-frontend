<template>
  <ul>
    <li v-for="category in categories" :key="category.id">
      <div class="category-item">
        <span @click="selectCategory(category)">{{ category.name }}</span>
        <button v-if="category.children.length" @click.stop="toggleChildren(category)">
          {{ category.isOpen ? '&#9660;' : '&#9658;' }}
        </button>
      </div>
      <CategoryTree v-if="category.isOpen" :categories="category.children" @category-selected="handleCategorySelected" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CategoryTree',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleChildren(category) {
      category.isOpen = !category.isOpen;
    },
    selectCategory(category) {
      this.$emit('category-selected', category);
    },
    handleCategorySelected(category) {
      this.$emit('category-selected', category);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}
.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
}
.category-item span {
  flex-grow: 1;
}
button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}
li {
  padding-left: 10px;
}
</style>
