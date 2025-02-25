<script setup lang="ts">
const props = defineProps({
  step: { type: Number, required: true },
  numberOfSteps: { type: Number, required: false, default: 4 },
});
</script>
<template>
  <nav class="flex items-center justify-center" aria-label="Progress">
    <ol role="list" class="ml-8 flex items-center space-x-5">
      <li v-for="stepValue in numberOfSteps" :key="stepValue">
        <a v-if="props.step > stepValue"
          class="block size-2.5 rounded-full bg-[#4682b4]">
          <span class="sr-only">{{ stepValue }}</span>
        </a>
        <a v-else-if="props.step === stepValue" class="relative flex items-center justify-center"
          aria-current="step">
          <span class="absolute flex size-5 p-px" aria-hidden="true">
            <span class="size-full rounded-full bg-blue-200" />
          </span>
          <span class="relative block size-2.5 rounded-full bg-[#87ceeb]" aria-hidden="true" />
          <span class="sr-only">{{ stepValue }}</span>
        </a>
        <a v-else class="block size-2.5 rounded-full bg-gray-200">
          <span class="sr-only">{{ stepValue }}</span>
        </a>
      </li>
    </ol>
  </nav>
</template>
