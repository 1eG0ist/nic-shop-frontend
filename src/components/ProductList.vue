<template>
  <div class="product-list">
    <div v-if="products.length">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <div v-else>
      Продукты не найдены.
    </div>
    <div v-if="isProductsLoading">
      Идет загрузка...
    </div>
    <div class="observe" v-intersection="loadMoreProducts"></div>
  </div>
</template>

<script>
import {ref, onMounted, watch} from 'vue';
import axios from 'axios';
import ProductCard from "@/components/UI/ProductCard.vue";
import {Product} from "@/models/Product.js";

export default {
  components: {ProductCard},
  props: {
    categoryId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const products = ref([]);
    const isProductsLoading = ref(true);
    const page = ref(0);
    const limit = 10;
    const totalPages = ref(1);

    const fetchProducts = async (pageNumber) => {
      try {
        if (props.categoryId != null) {
          isProductsLoading.value = true;
          const response = await axios.get(`/api/products/by_category?id=${props.categoryId}&page=${pageNumber}`);
          totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
          if (pageNumber === 0) {
            products.value = Product.fromJsons(response.data.content);
          } else {
            products.value = [...products.value, ...Product.fromJsons(response.data.content)];
          }
        }
      } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
      } finally {
        isProductsLoading.value = false;
      }
    };

    const loadMoreProducts = () => {
      if (page.value < totalPages.value) {
        fetchProducts(page.value);
        page.value += 1;
      }
    };

    onMounted(() => {
      fetchProducts(0);
    });

    watch(() => props.categoryId, (newCategoryId) => {
      if (newCategoryId !== null) {
        products.value = [];
        page.value = 0;
        fetchProducts(0);
      }
    });

    return {
      products,
      isProductsLoading,
      loadMoreProducts,
    };
  },
};
</script>

<style scoped>
.product-list {
  padding: 20px;
  flex-grow: 1;
}

.observe {
  height: 20px;
  background: var(--background-color);
}
</style>