<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  inputType: {
    type: String,
    default: 'text',
  },
});

const emit = defineEmits(['update:modelValue']);

function updateInput(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<template>
  <input
      :type="inputType"
      :value="modelValue"
      @input="updateInput"
  />
</template>

<style scoped>
input {
  width: 100%;
  border-radius: 5px;
  border: 1px solid darkslateblue;
  background-color: whitesmoke;
  padding: 10px;
  margin: 4px;
  box-sizing: border-box;
}
</style>