<template>
  <div class="flex w-5/6 flex-col md:w-2/3">
    <label for="input-field" class="text-2xl text-text">{{ label }}</label>
    <textarea
      class="border-border custom-placeholder my-2 rounded-md border-2 bg-input px-2.5 py-2 text-text placeholder-text"
      id="input-field"
      type="text"
      :placeholder="placeholder"
      rows="5"
    ></textarea>
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
  }
})

const label = ref(props.label)
const placeholder = ref(props.placeholder)
</script>
