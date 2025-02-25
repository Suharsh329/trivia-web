<script setup lang="ts">
const props = defineProps({
  severity: { type: String, required: false, default: 'info' },
  text: { type: String, required: false },
});

const severityColors: Record<string, string> = {
  info: 'bg-indigo-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  error: 'bg-red-600',
};

</script>

<template>
  <div class="flex items-center gap-x-6 px-6 py-2.5 sm:px-3.5 sm:before:flex-1" :class="severityColors[props.severity]">
    <p class="text-sm/6 text-white">
      {{ props.text }}
      <slot></slot>
    </p>
    <div class="flex flex-1 justify-end">
      <button type="button" class="-m-3 p-3 focus-visible:outline-offset-[-4px]" @click="$emit('dismiss')">
        <span class="sr-only">Dismiss</span>
        <Icon :size="'size-5'" class="text-white" name="dismiss" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>