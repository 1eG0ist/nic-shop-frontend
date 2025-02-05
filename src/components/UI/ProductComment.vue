<template>
  <div class="product-comment-item">
<!--    <img :src="comment.imagePath" :alt="comment.user" class="comment-user-image" />-->
    <div class="comment-content">

      <p><strong>{{ comment.user.surname }} {{ comment.user.name.charAt(0).toUpperCase() }}.</strong> - {{ comment.createdDate }}</p>
      <p>Рейтинг: {{ comment.rating }}/5</p>
      <p>{{ comment.comment }}</p>
    </div>
  </div>
</template>

<script setup>
import {ProductComment} from "@/models/ProductComment.js";

defineProps({
  comment: {
    type: ProductComment,
    required: true,
  },
});
</script>

<style scoped>
.product-comment-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.comment-user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-content {
  flex: 1;
}
</style>