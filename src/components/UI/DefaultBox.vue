<script setup>
</script>

<template>
  <div class="container">
    <slot/>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  background: var(--background-secondary-color);
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  text-align: center;
  font-family: Arial, sans-serif;
  color: #333;
  gap: 20px;
}
</style>
