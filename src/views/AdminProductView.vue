<template>
  <form @submit.prevent="saveProduct">
    <div class="image-upload">
      <label for="imageInput">Изображение товара:</label>
      <input type="file" id="imageInput" @change="handleFileUpload" accept="image/*">
      <div v-if="imagePreview" class="image-preview">
        <img :src="imagePreview" alt="Предпросмотр изображения">
      </div>
      <div v-else-if="product.imagePath" class="image-preview">
        <img :src="imageUrl" alt="Текущее изображение">
      </div>
    </div>
    <default-input id="name" v-model="product.name" placeholder="Название" type="text" required />
    <default-input id="description" v-model="product.description" placeholder="Описание" required/>
    <default-input id="price" v-model="product.price" type="number" placeholder="Цена" step="1" required />
    <default-input id="count" v-model="product.count" type="number" placeholder="Количество" required />
    <default-input id="sale" v-model="product.sale" type="number" placeholder="Скидка" step="1" />

    <!-- Отображение текущих категорий продукта -->
    <div class="categories">
      <label>Категории продукта:</label>
      <ul>
        <li v-for="category in product.categories" :key="category.id">{{ category.name }}</li>
      </ul>
    </div>

    <!-- Выпадающий список для добавления категорий -->
    <div class="category-select">
      <label for="categorySelect">Добавить категорию:</label>
      <select id="categorySelect" v-model="selectedCategory">
        <option v-for="category in allCategories" :key="category.id" :value="category">
          {{ category.name }}
        </option>
      </select>
      <button type="button" @click="addCategory">Добавить</button>
    </div>

    <button type="submit">{{ isEditMode ? 'Обновить' : 'Создать' }}</button>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Product } from '@/models/Product';
import axios from "@/api/axios.js";
import DefaultInput from "@/components/UI/DefaultInput.vue";

const route = useRoute();
const router = useRouter();

const product = ref(new Product({
  id: null,
  name: '',
  description: '',
  price: 0,
  count: 0,
  imagePath: '',
  sale: 0,
  categories: [],
}));

const isEditMode = computed(() => route.params.id !== undefined && route.params.id !== "");
const selectedFile = ref(null);
const imagePreview = ref(null);
const imageUrl = computed(() => {
  return '/api/images?path=' + product.value.imagePath;
});

const allCategories = ref([]);
const selectedCategory = ref(null);

onMounted(async () => {
  allCategories.value = (await axios.get('/categories/default')).data;
  if (isEditMode.value) {
    await fetchProduct(route.params.id);
  }
});

async function fetchProduct(id) {
  const response = await axios.get(`/products?id=${id}`);
  product.value = Product.fromJson(response.data);
}

// Обработка загрузки файла
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;

    // Создаем предпросмотр изображения
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const addCategory = () => {
  if (selectedCategory.value && !product.value.categories.some(cat => cat.id === selectedCategory.value.id)) {
    product.value.categories.push(selectedCategory.value);
    selectedCategory.value = null; // Сбросить выбранную категорию после добавления
  }
};

async function saveProduct() {
  try {
    if (selectedFile.value) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedFile.value);

      const imageResponse = await axios.post("/images/products", imageFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "multipart/form-data"
        },
      });
      product.value.imagePath = imageResponse.data;
    }
  } catch (error) {
    console.error(error);
  }

  try {
    if (isEditMode.value) {
      const response = await axios.patch(`/products`, product.value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (response.status === 200) {
        console.log("Продукт успешно обновлен");
      }
    } else {
      const response = await axios.post("/products", product.value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (response.status === 200) {
        console.log("Продукт успешно создан");
      }
    }
    await router.push({ path: '/' });
  } catch (error) {
    console.error("Ошибка при сохранении продукта:", error);
  }
}
</script>

<style scoped>
form {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  vertical-align: center;
}

.image-upload {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.image-preview img {
  width: 300px;
  height: 300px;
  object-fit: fill;
  border-radius: 5px;
  margin-top: 10px;
  border: 1px solid #3f3f3f;
}

.categories {
  margin-bottom: 20px;
}

.categories ul {
  list-style-type: none;
  padding: 0;
}

.categories li {
  margin: 5px 0;
}

.category-select {
  margin-bottom: 20px;
}
</style>
