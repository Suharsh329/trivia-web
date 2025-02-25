<script setup lang="ts">
const props = defineProps({
  footer: { type: Boolean, required: false, default: false },
  header: { type: Boolean, required: false, default: false },
  title: { type: String, required: false },
});
</script>
<template>
  <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
    <div class="px-4 py-5 sm:px-6" v-if="props.header">
      <slot name="header"></slot>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <slot></slot>
    </div>
    <div class="px-4 py-4 sm:px-6" v-if="props.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
