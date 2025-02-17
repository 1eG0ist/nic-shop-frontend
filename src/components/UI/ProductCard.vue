<template>
  <div v-if="notDeleted" class="product-card" @click="swapToProductPage">
    <img class="product-card-img" type="png" :src="imageUrl" :alt="`${product.name} image`"/>
    <div class="product-info">
      <h2 class="product-name">{{ product.name }}</h2>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-price">
        <div style="display: flex; flex-direction: row; justify-content: center;">
          <span v-if="isAuthenticated && product.sale" class="old-price">{{ product.price }}₽</span>
          <span class="new-price">{{ displayPrice }}₽</span>
        </div>
        <div :class="availabilityClass">{{ availabilityText }}</div>
        <default-button
            @click.stop="addToCart"
            :disabled="props.product.count === 0"
            class="action-button">
          В корзину
        </default-button>
        <default-button
            @click.stop="swapToAdminProductPage"
            v-if="isAdmin"
            class="action-button">
          Редактировать
        </default-button>
        <default-button
            @click.stop="showDeleteConfirmation"
            v-if="isAdmin"
            class="action-button">
          Удалить
        </default-button>
      </div>
    </div>
  </div>
  <ConfirmationModal
      :isOpen="isDeleteModalOpen"
      title="Подтверждение удаления"
      description="Вы уверены, что хотите удалить этот продукт?"
      @cancel="cancelDelete"
      @confirm="confirmDelete"
  />
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import { Product } from "@/models/Product.js";
import DefaultButton from "@/components/UI/DefaultButton.vue";
import store from "@/store/index.js";
import router from "@/router/index.js";
import ConfirmationModal from "@/components/modals/ConfirmationModal.vue";
import axios from "@/api/axios.js";

const props = defineProps({
  product: {
    type: Product,
    required: true,
  },
});

const notDeleted = ref(true);

const isAdmin = computed(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.roles && user.roles.some(role => role.name === 'ROLE_ADMIN');
});

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);

const displayPrice = computed(() => {
  if (isAuthenticated.value && props.product.sale) {
    return (props.product.price * (1 - props.product.sale / 100)).toFixed(2);
  }
  return props.product.price;
});

const availabilityText = computed(() => {
  if (props.product.count === 0) {
    return 'Нет в наличии';
  } else if (props.product.count > 5) {
    return 'В наличии';
  } else {
    return 'Мало';
  }
});

const availabilityClass = computed(() => {
  if (props.product.count === 0) {
    return 'availability-out-of-stock';
  } else if (props.product.count > 5) {
    return 'availability-in-stock';
  } else {
    return 'availability-low-stock';
  }
});

const isDeleteModalOpen = ref(false);

const swapToProductPage = () => {
  store.dispatch('product/rememberProduct', props.product);
  router.push({
    path: `/product/${props.product.id}`
  });
};

const swapToAdminProductPage = () => {
  router.push({
    path: `/product_administration/${props.product.id}`
  });
};

const addToCart = () => {
  store.dispatch('cart/addToCart', props.product);
};

const showDeleteConfirmation = () => {
  isDeleteModalOpen.value = true;
};

const cancelDelete = () => {
  isDeleteModalOpen.value = false;
};

const confirmDelete = async () => {
  isDeleteModalOpen.value = false;
  try {
    const response = await axios.delete(
      `/products?id=${props.product.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    );
    if (response.status === 200) {
      notDeleted.value = false;
    }
  } catch (error) {
    console.error(error)
  }
};

const imageUrl = computed(() => {
  return '/api/images?path=' + props.product.imagePath;
});
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: row;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
  padding: 16px;
  margin-bottom: 10px;
  gap: 16px;
}

.product-card-img {
  height: 200px;
  width: 200px;
  object-fit: cover;
  object-position: center;
  background: transparent;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1.5em;
  color: var(--text-color);
  margin-bottom: 8px;
}

.product-description {
  font-size: 1em;
  color: var(--secondary-color);
  margin-bottom: 16px;
}

.product-price {
  font-size: 1.2em;
  gap: 10px;
  color: var(--primary-color);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}

.old-price {
  text-decoration: line-through;
  color: var(--text-color);
  margin-right: 8px;
  align-self: center;
}

.new-price {
  color: var(--primary-color);
  font-weight: bold;
  align-self: center;
}

.availability-in-stock {
  font-size: 1em;
  color: green;
  align-self: center;
}

.availability-low-stock {
  font-size: 1em;
  color: orange;
  align-self: center;
}

.availability-out-of-stock {
  font-size: 1em;
  color: red;
  align-self: center;
}

.action-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.action-button:disabled {
  cursor: not-allowed;
}
</style>
