<script setup lang="ts">
import { svgList } from '../icons';

const props = defineProps({
  fill: { type: String, required: false, default: 'none' },
  name: { type: String, required: true },
  size: { type: String, required: false, default: 'size-6' },
  stroke: { type: String, required: false, default: 'currentColor' },
  strokeWidth: { type: String, required: false, default: '1.5' },
  viewBox: { type: String, required: false, default: '0 0 24 24' },
});
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :fill="props.fill"
    :viewBox="props.viewBox"
    :stroke-width="props.strokeWidth"
    :stroke="props.stroke"
    :class="props.size"
  >
    <path stroke-linecap="round" stroke-linejoin="round" :d="svgList[props.name]" />
  </svg>
</template>
