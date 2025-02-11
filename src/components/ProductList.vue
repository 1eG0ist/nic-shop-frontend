<template>
  <div class="product-list">
    <div v-if="products.length" class="content">
      <div class="products-info-area">
        <div class="path-and-count-info">
          <div>{{ categoryPath }}</div>
          <div style="display: flex; flex-direction: row; gap: 10px">
            <strong>{{ category.name }}</strong>     <div style="color: gray">({{ totalProducts }})</div>
          </div>
        </div>
        <div class="sort-toggle">
          <label for="sort-select">Сортировка:</label>
          <select id="sort-select" class="sort-selection" v-model="sortOrder">
            <option value="asc">По возрастанию цены</option>
            <option value="desc">По убыванию цены</option>
          </select>
        </div>
      </div>
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <div v-else>
      Продукты не найдены.
    </div>
    <div v-if="isProductsLoading">
      Идет загрузка...
    </div>
    <div class="observe" v-intersection="loadMoreProducts"/>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import axios from '@/api/axios.js';
import ProductCard from "@/components/UI/ProductCard.vue";
import { Product } from "@/models/Product.js";

export default {
  components: { ProductCard },
  props: {
    category: {
      required: true,
    },
    categoryPath: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const products = ref([]);
    const isProductsLoading = ref(true);
    const page = ref(0);
    const limit = 10;
    const totalPages = ref(1);
    const totalProducts = ref(0);
    const sortOrder = ref('asc');

    const fetchProducts = async (pageNumber) => {
      try {
        if (props.category && props.category.id != null) {
          isProductsLoading.value = true;
          const response = await axios.get(`/products/by_category?id=${props.category.id}&page=${pageNumber}&sort=${sortOrder.value}`);
          totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
          totalProducts.value = response.data.totalElements;
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

    watch(() => props.category?.id, (newCategoryId) => {
      if (newCategoryId !== null) {
        products.value = [];
        page.value = 0;
        fetchProducts(0);
      }
    });

    watch(sortOrder, (newSortOrder) => {
      page.value = 0;
      fetchProducts(0);
    });

    return {
      products,
      isProductsLoading,
      loadMoreProducts,
      totalProducts,
      sortOrder,
    };
  },
};
</script>

<style scoped>
.content {
  gap: 20px;
  padding: 20px;
}

.products-info-area {
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.path-and-count-info {
  display: flex;
  flex-direction: column;
}

.sort-toggle {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.sort-toggle label {
  margin-right: 10px;
}

.sort-selection {
  padding: 10px;
}
</style>
