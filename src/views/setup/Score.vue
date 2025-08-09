<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { toRefs } from 'vue';

const {
  score,
} = toRefs(useGameStore());
</script>
<template>
  <div class="px-6 text-left">
    <div class="mb-6">
      <span class="font-bold text-lg">Set Score Values:</span>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Correct Answer:</label>
        <InputText
          v-model="score.correct"
          placeholder="Correct"
          class="w-20 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <span v-if="!score.correct" class="text-sm text-red-400">Please enter a value</span>
      </div>
      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Incorrect Answer:</label>
        <InputText
          v-model="score.incorrect"
          placeholder="Incorrect"
          class="w-20 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <span v-if="!score.incorrect" class="text-sm text-red-400">Please enter a value</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');

.font-sans {
  font-family: 'Inter', Arial, sans-serif;
}
</style>
