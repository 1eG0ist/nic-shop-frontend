<template>
  <div class="product-comment" v-if="isVisible">
    <img v-if="props.comment.imagePath != null" class="comment-img" :src="`/api/images?path=${ props.comment.imagePath }`" alt="comment image"/>
    <div class="comment-content">
      <div>
        {{ props.comment.user.name }} {{ props.comment.user.surname }}
      </div>
      Оценка: {{ props.comment.rating }} | 5
      <div class="comment-text">
        {{ props.comment.comment }}
      </div>
      <div class="comment-date">
        {{ formattedDate }}
      </div>
      <div v-if="isAdmin" class="comment-actions"> <!-- v-if="" надо добавить с условием что у пользователя в localStorage есть роль ROLE_ADMIN-->
        <default-button style="border: 1px solid var(--border-color)" @click="deleteCommentImage">
          Удалить фото
        </default-button>
        <default-button style="border: 1px solid var(--border-color)" @click="deleteComment">
          Удалить комментарий
        </default-button>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ProductCommentModel} from "@/models/ProductCommentModel.js";
import DefaultButton from "@/components/UI/DefaultButton.vue";
import {computed, ref} from "vue";
import DateTimeUtil from "@/utils/DateTimeUtil.js";
import axios from "@/api/axios.js";

const props = defineProps({
  comment: {
    type: ProductCommentModel,
    required: true
  }
});

const isVisible = ref(true);

const isAdmin = computed(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.roles && user.roles.some(role => role.name === 'ROLE_ADMIN');
});

const deleteCommentImage = async () => {
  try {
    if (props.comment.imagePath != null) {
      const response = await axios.delete(`/product_comments/image?id=${props.comment.id}`);
      if (response.status === 200) {
        props.comment.imagePath = null;
      }
    }
  } catch (error) {

  }
}

const deleteComment = async () => {
  try {
    const response = await axios.delete(`/product_comments?id=${props.comment.id}`);
    if (response.status === 200) {
      isVisible.value = false;
    }
  } catch (error) {

  }
};

const formattedDate = computed(() => {
  const userTimeZone = DateTimeUtil.getUserTimeZone();
  return DateTimeUtil.formatDateTime(props.comment.createdDate, userTimeZone);
});

</script>

<style scoped>
.product-comment {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  z-index: 1;
  background-color: white;
}

.product-comment::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: inherit;
  background: linear-gradient(105deg, var(--primary-color), var(--secondary-color));
  z-index: -1;
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