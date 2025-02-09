<template>
  <div class="stars">
    <span
        v-for="star in 5"
        :key="star"
        @click="$emit('update:modelValue', star)"
        :class="{ 'active-star': star <= modelValue }"
    >★</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  modelValue: Number,
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
.stars {
  display: flex;
  cursor: pointer;
}

.stars span {
  font-size: 24px;
  color: gray;
  transition: color 0.2s;
}

.stars span.active-star {
  color: gold;
}
</style>
