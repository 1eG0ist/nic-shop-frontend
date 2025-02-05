<template>
  <div class="product-comments">
    <h2>Комментарии</h2>
    <ProductComment v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<script setup>
import ProductComment from '@/components/UI/ProductComment.vue';
import {onMounted, ref} from "vue";
import axios from "axios";

const comments = ref([]);
const isCommentsLoading = ref(true);

defineProps({
  productId: {
    type: Number,
    required: true,
  },
});

onMounted(() => {
  fetchComments();
});

const fetchComments = async () => {
  try {
    isCommentsLoading.value = true;
    // const response = axios.get("");
  } catch (e) {

  } finally {
    isCommentsLoading.value = false;
  }
}

</script>

<style scoped>
.product-comments {
  padding: 10px;
  margin-top: 20px;
}
</style>