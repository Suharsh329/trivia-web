<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { toRefs } from 'vue';

const {
  score,
} = toRefs(useGameStore());
</script>
<template>
  <div class="px-6 text-left">
    <div class="mb-4">
      <span class="font-bold text-sm">Set Score Values:</span>
    </div>
    <div class="flex flex-col space-y-2 w-50">
      <InputText label="Correct Answer" placeholder="Correct" v-model="score.correct" class="w-20" />
      <span class="text-sm text-red-400" v-if="!score.correct">Please enter a value</span>
      <InputText label="Incorrect Answer" placeholder="Incorrect" v-model="score.incorrect" class="w-20" />
      <span class="text-sm text-red-400" v-if="!score.incorrect">Please enter a value</span>
    </div>
  </div>
</template>