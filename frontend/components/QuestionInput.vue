<template>
  <div class="flex w-5/6 flex-col md:w-2/3">
    <label for="input-field" class="text-2xl text-text">{{ label }}</label>
    <input
      class="border-border custom-placeholder my-2 rounded-md border-2 bg-input px-2.5 py-2 text-text placeholder-text"
      id="input-field"
      :placeholder="placeholder"
      :type="type"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  }
})

const label = ref(props.label)
const placeholder = ref(props.placeholder)
</script>
