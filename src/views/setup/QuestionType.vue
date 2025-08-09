<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { computed, toRefs } from 'vue';

const {
  difficultyPercentages,
  questionSelection,
} = toRefs(useGameStore());

const totalPercentage = computed(() => {
  return difficultyPercentages.value[1] + difficultyPercentages.value[2] + difficultyPercentages.value[3] + difficultyPercentages.value[4];
});
</script>
<template>
  <div class="px-6 text-left">
    <div class="flex flex-col space-y-4">
      <RadioGroup label="Question Selection:">
        <RadioButton v-model="questionSelection" name="options" label="Random" value='random' class="hover:scale-105 transition" />
        <RadioButton v-model="questionSelection" name="options" label="Select Questions (Coming soon!)" value='select' disabled class="hover:scale-105 transition" />
      </RadioGroup>
    </div>
    <div class="mt-6">
      <span class="font-bold text-lg">Set Question Difficulty Percentage:</span>
      <div class="flex flex-col space-y-4 mt-4">
        <label class="inline-flex items-center space-x-3">
          <span class="text-gray-700">Difficulty 1:</span>
          <InputText
            v-model="difficultyPercentages[1]"
            type="number"
            placeholder="Difficulty 1"
            class="w-20 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <span class="text-gray-700">%</span>
        </label>
        <label class="inline-flex items-center space-x-3">
          <span class="text-gray-700">Difficulty 2:</span>
          <InputText
            v-model="difficultyPercentages[2]"
            type="number"
            placeholder="Difficulty 2"
            class="w-20 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <span class="text-gray-700">%</span>
        </label>
        <label class="inline-flex items-center space-x-3">
          <span class="text-gray-700">Difficulty 3:</span>
          <InputText
            v-model="difficultyPercentages[3]"
            type="number"
            placeholder="Difficulty 3"
            class="w-20 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <span class="text-gray-700">%</span>
        </label>
        <label class="inline-flex items-center space-x-3">
          <span class="text-gray-700">Difficulty 4:</span>
          <InputText
            v-model="difficultyPercentages[4]"
            type="number"
            placeholder="Difficulty 4"
            class="w-20 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <span class="text-gray-700">%</span>
        </label>
      </div>
      <span v-if="totalPercentage !== 100" class="block mt-4 text-sm text-red-400">Total must equal 100</span>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');

.font-sans {
  font-family: 'Inter', Arial, sans-serif;
}
</style>
