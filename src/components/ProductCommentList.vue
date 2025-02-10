<template>
  <div class="product-comment-list">
    <div class="product-comment-list-header">
      <div class="rating-area">
        Оценка:
        <div class="range-slider">
          <DoubleRangeSlider v-model="ratingRange" :min="1" :max="5"/>
        </div>
      </div>
      <default-button @click="openAddCommentModal">
        Добавить комментарий
      </default-button>
    </div>
    <div class="product-comment-list-body">
      <ProductComment v-for="comment in comments" :key="comment.id" :comment="comment" />
    </div>
    <div class="observe" v-intersection="loadMoreComments"/>
    <CreateCommentModal
        :isOpen="isModalOpen"
        @close="isModalOpen = false"
        @submit="addComment"
    />
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import DefaultButton from "@/components/UI/DefaultButton.vue";
import ProductComment from "@/components/UI/ProductComment.vue";
import {ProductCommentModel} from "@/models/ProductCommentModel.js";
import axios from '@/api/axios.js';
import CreateCommentModal from "@/components/modals/CreateCommentModal.vue";
import {Product} from "@/models/Product.js";
import DoubleRangeSlider from "@/components/UI/DoubleRangeSlider.vue";

const props = defineProps({
  product: {
    type: Product,
    required: true
  }
});

const comments = ref([]);
const isCommentsLoading = ref(true);
const page = ref(0);
const limit = 10;
const totalPages = ref(1);
const isModalOpen = ref(false);
const ratingRange = ref([1, 5]);
let debounceTimeout = null;

const openAddCommentModal = () => {
  if (localStorage.getItem('accessToken') == null) {
    alert("Для написания комментариев необходимо зарегистрироваться");
    return;
  }
  isModalOpen.value = true;
};

const fetchProductComments = async (pageNumber, minRating, maxRating) => {
  try {
    if (props.product.id != null) {
      isCommentsLoading.value = true;
      const response = await axios.get(
          `/product_comments?id=${props.product.id}&page=${pageNumber}&minRating=${minRating}&maxRating=${maxRating}`
      );
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
      comments.value = ProductCommentModel.fromJsons(response.data.content);
    }
  } catch (error) {
    console.error("Ошибка при получении комментариев:", error);
  } finally {
    isCommentsLoading.value = false;
  }
};

const debouncedFetchComments = (pageNumber, minRating, maxRating) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchProductComments(pageNumber, minRating, maxRating);
  }, 1000);
};

const loadMoreComments = () => {
  if (page.value < totalPages.value) {
    fetchProductComments(page.value, ratingRange.value[0], ratingRange.value[1]);
    page.value += 1;
  }
};

const addComment = async (formData) => {
  try {
    let imagePath = null;

    if (formData.image != null) {
      const imageFormData = new FormData();
      imageFormData.append("file", formData.image);

      const imageResponse = await axios.post("/images/comments", imageFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "multipart/form-data"
        },
      });
      imagePath = imageResponse.data;
    }
    formData.imagePath = imagePath;
    formData.product = props.product;
    const response = await axios.post("/product_comments", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    comments.value.unshift(new ProductCommentModel(response.data));
  } catch (error) {
    console.error("Ошибка при добавлении комментария:", error);
  } finally {
    isModalOpen.value = false;
  }
};

watch(ratingRange, (newVal) => {
  console.log("Значения мин макс изменены");
  debouncedFetchComments(0, newVal[0], newVal[1]);
});

</script>

<style scoped>
.product-comment-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-comment-list-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}

.range-slider {
  justify-content: start;
  width: 200px;
}

.observe {
  height: 20px;
  background: var(--background-color);
}

.rating-area {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
