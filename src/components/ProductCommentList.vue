<template>
  <div class="product-comment-list">
    <div class="product-comment-list-header">
      Тут типо слайдер
      <default-button @click="isModalOpen = true">
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
import {ref} from "vue";
import DefaultButton from "@/components/UI/DefaultButton.vue";
import ProductComment from "@/components/UI/ProductComment.vue";
import {ProductCommentModel} from "@/models/ProductCommentModel.js"
import axios from "axios";
import CreateCommentModal from "@/components/modals/CreateCommentModal.vue";

const props = defineProps({
  productId: {
    type: Number,
    required: true
  }
})

const comments = ref([]);
const isCommentsLoading = ref(true);
const page = ref(0);
const limit = 10;
const totalPages = ref(1);
const isModalOpen = ref(false);

const fetchProductComments = async (pageNumber) => {
  try {
    if (props.productId != null) {
      isCommentsLoading.value = true;
      const response = await axios.get(
          `/api/product_comments?id=${props.productId}&page=${pageNumber}`
      );
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
      if (pageNumber === 0) {
        comments.value = ProductCommentModel.fromJsons(response.data.content);
      } else {
        comments.value = [...comments.value, ...ProductCommentModel.fromJsons(response.data.content)];
      }
    }
  } catch (error) {
    console.error("Ошибка при получении коментариев:" + error);
  } finally {
    isCommentsLoading.value = false;
  }
}

const loadMoreComments = () => {
  if (page.value < totalPages) {
    fetchProductComments(page.value);
    page.value += 1;
  }
}

const addComment = async (formData) => {
  try {
    console.log(formData);
    // const response = await axios.post("/api/product_comments", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
    //
    // comments.value.unshift(response.data); // Добавляем в начало списка
  } catch (error) {
    console.error("Ошибка при добавлении комментария:", error);
  } finally {
    isModalOpen.value = false;
  }
};

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
}
</style>