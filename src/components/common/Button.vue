<script setup lang="ts">
const props = defineProps({
  disabled: { type: Boolean, required: false, default: false },
  icon: { type: String, required: false, default: '' },
  text: { type: String, required: true },
  loading: { type: Boolean, required: false, default: false },
});
</script>
<template>
  <button
    :disabled="props.disabled"
    class="flex w-full justify-center rounded-m px-3 py-1.5 text-sm/6 font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    <div v-if="props.loading" class="spinner"></div>
    <div v-else>
      <Icon v-if="props.icon" :name="props.icon" />
      {{ props.text }}
    </div>
  </button>
</template>
