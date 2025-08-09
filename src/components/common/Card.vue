<script setup lang="ts">
const props = defineProps({
  footer: { type: Boolean, required: false, default: false },
  header: { type: Boolean, required: false, default: false },
  title: { type: String, required: false },
});
</script>
<template>
  <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
    <div v-if="props.header" class="px-4 py-5 sm:px-6">
      <slot name="header"></slot>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <slot></slot>
    </div>
    <div v-if="props.footer" class="px-4 py-4 sm:px-6">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
