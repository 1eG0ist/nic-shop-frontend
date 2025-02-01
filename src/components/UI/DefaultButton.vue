<script setup>
</script>

<template>
  <button class="default-button">
    <slot></slot>
  </button>
</template>

<style scoped>
.default-button {
  padding: 10px 20px;
  background: linear-gradient(155deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-family: Arial, sans-serif;
  font-size: 16px;
  transition: background-color 0.3s ease;
  text-decoration-color: var(--text-color);
}

.default-button:hover {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}

.default-button:focus {
  outline: none;
}
</style>
