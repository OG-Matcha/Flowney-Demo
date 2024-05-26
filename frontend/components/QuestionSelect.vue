<template>
  <div class="flex w-5/6 flex-col md:w-2/3">
    <label for="select-field" class="text-2xl text-text">{{ label }}</label>
    <select
      v-model="selectedOption"
      class="my-2 rounded-md border-2 border-border bg-input px-2 py-2 text-text"
      id="select-field"
      :size="size"
    >
      <option value="" disabled selected>{{ defaults }}</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  defaults: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const label = ref(props.label)
const options = ref(props.options)
const size = ref(1)
const selectedOption = ref(props.modelValue)

watch(selectedOption, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

// @focus="size = 4" // @blur="size = 1" // @change="size = 1"
