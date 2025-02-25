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
    <div class="flex flex-col space-y-2">
      <RadioGroup label="Question Selection:">
        <RadioButton v-model="questionSelection" name="options" label="Random" value='random' />
        <RadioButton v-model="questionSelection" name="options" label="Select Questions (Coming soon!)" value='select' disabled />
      </RadioGroup>
    </div>
    <div class="mt-4">
      <span class="font-bold text-sm">Set Question Difficulty Percentage:</span>
      <div class="flex flex-col space-y-2 mt-2">
        <label class="inline-flex items-center">
          <span class="mx-2">Difficulty 1: </span>
          <InputText type="number" placeholder="Difficulty 1" v-model="difficultyPercentages[1]" class="w-15 mr-2" />
          %
        </label>
        <label class="inline-flex items-center">
          <span class="mx-2">Difficulty 2:</span>
          <InputText type="number" placeholder="Difficulty 2" v-model="difficultyPercentages[2]" class="w-15 mr-2" />
          %
        </label>
        <label class="inline-flex items-center">
          <span class="mx-2">Difficulty 3:</span>
          <InputText type="number" placeholder="Difficulty 3" v-model="difficultyPercentages[3]" class="w-15 mr-2" />
          %
        </label>
        <label class="inline-flex items-center">
          <span class="mx-2">Difficulty 4:</span>
          <InputText type="number" placeholder="Difficulty 4" v-model="difficultyPercentages[4]" class="w-15 mr-2" />
          %
        </label>
      </div>
      <span class="text-sm text-red-400" v-if="totalPercentage !== 100">Total must equal 100</span>
    </div>
  </div>
</template>