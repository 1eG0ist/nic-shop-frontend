<template>
  <div class="double-range-slider">
    <div class="slider-container">
      <input
          type="range"
          :min="min"
          :max="max"
          v-model="leftValue"
          @input="updateValues"
          class="slider left-slider"
      />
      <input
          type="range"
          :min="min"
          :max="max"
          v-model="rightValue"
          @input="updateValues"
          class="slider right-slider"
      />
      <div class="slider-track"></div>
    </div>
    <div class="slider-labels">
      <span class="label">{{ leftValue }}</span>
      <span class="label">{{ rightValue }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [1, 5],
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const leftValue = ref(props.modelValue[0]);
const rightValue = ref(props.modelValue[1]);

const updateValues = () => {
  if (leftValue.value > rightValue.value) {
    [leftValue.value, rightValue.value] = [rightValue.value, leftValue.value];
  }
  emit("update:modelValue", [leftValue.value, rightValue.value]);
};

watch(() => props.modelValue, (newVal) => {
  leftValue.value = newVal[0];
  rightValue.value = newVal[1];
});
</script>

<style scoped>
.double-range-slider {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
}

.slider {
  width: 100%;
  position: absolute;
  pointer-events: none;
  appearance: none;
  background: transparent;
  z-index: 2;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
  pointer-events: auto;
}

.slider.left-slider::-webkit-slider-thumb {
  background: #4caf50;
}

.slider.right-slider::-webkit-slider-thumb {
  background: #f44336;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
  pointer-events: auto;
}

.slider.left-slider::-moz-range-thumb {
  background: #4caf50;
}

.slider.right-slider::-moz-range-thumb {
  background: #f44336;
}

.slider-track {
  position: absolute;
  width: 100%;
  height: 5px;
  background: #ddd;
  z-index: 1;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.label {
  font-size: 0.9em;
  color: #555;
}
</style>
