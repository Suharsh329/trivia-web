<script setup lang="ts">
const props = defineProps({
  external: { type: Boolean, required: false, default: false },
  text: { type: String, required: false },
  to: { type: String, required: true },
});
</script>
<template>
  <a :href="props.to" class="font-semibold text-primary hover:text-secondary hover:underline" :target="props.external ? '_blank' : '_self'">
    {{ props.text }}
  </a>
</template>