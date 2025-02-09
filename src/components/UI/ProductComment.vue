<template>
  <div class="product-comment">
    <img class="comment-img" :src="`/api/images?path=${ props.comment.imagePath }`" alt="comment image"/>
    <div class="comment-content">
      <div>
        {{ props.comment.user.name }} {{ props.comment.user.surname }}
      </div>
      Оценка: {{ props.comment.rating }} | 5
      <div class="comment-text">
        {{ props.comment.comment }}
      </div>
      <div class="comment-date">
        {{ props.comment.createdDate }}
      </div>
      <div class="comment-actions"> <!-- v-if="" надо добавить с условием что у пользователя в localStorage есть роль ROLE_ADMIN-->
        <default-button @click="deleteCommentImage">
          Удалить фото
        </default-button>
        <default-button @click="deleteComment">
          Удалить комментарий
        </default-button>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ProductCommentModel} from "@/models/ProductCommentModel.js";
import DefaultButton from "@/components/UI/DefaultButton.vue";

const props = defineProps({
  comment: {
    type: ProductCommentModel,
    required: true
  }
});

const deleteCommentImage = () => {
  console.log("deleteCommentImage");
}

const deleteComment = () => {
  console.log("deleteComment");
}

</script>

<style scoped>
.product-comment {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}

.comment-img {
  height: 150px;

}

.comment-content {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.comment-text {
  flex-wrap: wrap;
}

.comment-date {
  justify-content: end;
}

.comment-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}
</style>