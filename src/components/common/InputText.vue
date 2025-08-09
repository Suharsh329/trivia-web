<script setup lang="ts">
const props = defineProps({
  class: { type: String, required: false },
  for: { type: String, required: false },
  label: { type: String, required: false },
  placeholder: { type: String, required: true },
  required: { type: Boolean, required: false, default: false },
  type: { type: String, required: false, default: 'text' },
});

const model = defineModel();
</script>
<template>
  <label v-if="props.label" :for="props.for" class="block text-sm/6 font-medium text-gray-900">
    {{ props.label }}
  </label>
  <input
v-model="model" :type="props.type" :required="props.required"
    :placeholder="props.placeholder"
    class="rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6" :class="props.class ? props.class : ''" />
</template>
<style>
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>