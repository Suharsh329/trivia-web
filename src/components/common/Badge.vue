<script setup lang="ts">

const props = defineProps({
  dismissible: { type: Boolean, default: false },

  severity: {
    type: String,
    default: 'info',
    validator: (value: string) => ['info', 'success', 'warning', 'error'].includes(value),
  },

  text: {
    type: String,
    required: true,
  },
});

const severity: { [key: string]: string } = {
  'info': 'bg-blue-100 text-blue-700',
  'success': 'bg-green-100 text-green-700',
  'warning': 'bg-yellow-100 text-yellow-800',
  'error': 'bg-red-100 text-red-700',
};

const stroke: { [key: string]: string } = {
  'info': 'stroke-blue-800/50 group-hover:stroke-blue-800/75',
  'success': 'stroke-green-800/50 group-hover:stroke-green-800/75',
  'warning': 'stroke-yellow-800/50 group-hover:stroke-yellow-800/75',
  'error': 'stroke-red-800/50 group-hover:stroke-red-800/75',
};
</script>
<template>
  <span class="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium" :class="severity[props.severity]">
    {{ props.text }}
    <button v-if="props.dismissible" type="button" class="group relative -mr-1 size-3.5 rounded-xs" @click="$emit('remove')">
      <span class="sr-only">Remove</span>
      <svg viewBox="0 0 14 14" class="size-3.5" :class="stroke[props.severity]">
        <path d="M4 4l6 6m0-6l-6 6" />
      </svg>
      <span class="absolute -inset-1" />
    </button>
  </span>
</template>
