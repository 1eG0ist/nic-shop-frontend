<template>
  <div v-if="props.isOpen" class="modal-overlay" @click.self="close">
    <div class="modal">
      <h2>Добавить комментарий</h2>

      <default-input v-model="commentText" placeholder="Введите комментарий"/>

      <div class="rating">
        <label>Оценка:</label>
        <StarRating v-model="rating" />
      </div>

      <div class="image-upload">
        <label for="imageInput">Прикрепить изображение:</label>
        <input type="file" id="imageInput" @change="handleFileUpload" accept="image/*">
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Предпросмотр изображения">
        </div>
      </div>

      <div class="modal-actions">
        <default-button @click="submitComment">Добавить</default-button>
        <default-button @click="close">Отмена</default-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import DefaultButton from "@/components/UI/DefaultButton.vue";
import StarRating from "@/components/UI/StarRating.vue";
import DefaultInput from "@/components/UI/DefaultInput.vue";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close", "submit"]);

const commentText = ref("");
const rating = ref(0);
const selectedFile = ref(null);
const imagePreview = ref(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const close = () => {
  commentText.value = "";
  rating.value = 0;
  selectedFile.value = null;
  imagePreview.value = null;
  emit("close");
};

const submitComment = () => {
  if (commentText.value.trim() !== "") {
    const commentData = {
      comment: commentText.value,
      rating: rating.value,
      image: selectedFile.value,
    };

    emit("submit", commentData);
    close();
  } else {
    alert("Комментарий не может быть пустым")
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.image-upload {
  display: flex;
  flex-direction: column;
}

.image-preview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 10px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
