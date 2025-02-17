<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="modal-actions">
        <button @click="cancel">Отмена</button>
        <button @click="confirm">Подтвердить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['cancel', 'confirm']);

const cancel = () => {
  emit('cancel');
};

const confirm = () => {
  emit('confirm');
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
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.modal-actions {
  margin-top: 20px;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:first-of-type {
  background-color: #ccc;
}

button:last-of-type {
  background-color: #007bff;
  color: white;
}
</style>
