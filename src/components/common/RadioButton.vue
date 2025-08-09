<script setup lang="ts">
defineProps<{
  label: string;
  value: any;
  modelValue: any;
  name: string;
  description?: string;
  disabled?: boolean;
}>();

defineEmits(['update:modelValue']);
</script>

<template>
  <label class="relative flex items-start p-2 cursor-pointer hover:bg-gray-50 transition-colors">
    <div class="flex items-center h-5">
      <input
        type="radio"
        :name="name"
        :value="value"
        :checked="modelValue === value"
        class="h-4 w-4 text-blue-600 border-gray-300"
        :disabled="disabled"
        @change="$emit('update:modelValue', value)"
      >
    </div>
    <div class="ml-3 flex flex-row">
      <span class="text-sm font-medium" :class="disabled ? 'text-gray-500' : 'text-gray-900'">{{ label }}</span>
      <span v-if="description" class="text-sm text-gray-500">{{ description }}</span>
    </div>
  </label>
</template>