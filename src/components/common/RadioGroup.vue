<script setup lang="ts">
defineProps<{
  label?: string;
  description?: string;
}>();
</script>

<template>
  <div class="space-y-2">
    <div v-if="label || description" class="mb-4">
      <label v-if="label" class="text-sm font-bold">{{ label }}</label>
      <p v-if="description" class="text-sm text-gray-500">{{ description }}</p>
    </div>
    <div class="bg-white rounded-lg">
      <slot></slot>
    </div>
  </div>
</template>