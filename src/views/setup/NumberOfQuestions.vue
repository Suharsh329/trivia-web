<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { computed, toRefs } from 'vue';

const {
  customNumber,
  numberOfQuestions,
} = toRefs(useGameStore());

const customNumberValidation = computed(() => {
  return !customNumber.value || customNumber.value < 1 || customNumber.value > 50;
});
</script>
<template>
  <div class="px-6 text-left">
    <div class="flex flex-col space-y-4">
      <RadioGroup label="Select Number of Questions:">
        <RadioButton v-model="numberOfQuestions" name="options" label="10" :value=10 class="hover:scale-105 transition" />
        <RadioButton v-model="numberOfQuestions" name="options" label="25" :value=25 class="hover:scale-105 transition" />
        <RadioButton v-model="numberOfQuestions" name="options" label="50" :value=50 class="hover:scale-105 transition" />
        <RadioButton v-model="numberOfQuestions" name="options" label="Custom" :value="0" class="hover:scale-105 transition" />
      </RadioGroup>
      <div v-if="numberOfQuestions === 0" class="mt-4">
        <InputText
          class="w-25 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          type="number"
          placeholder="Custom"
          v-model="customNumber"
        />
        <span class="block mt-2 text-sm text-red-400" v-if="customNumberValidation">Please enter a value between 1 and 50</span>
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
