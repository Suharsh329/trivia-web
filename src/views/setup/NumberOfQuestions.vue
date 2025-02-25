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
    <div class="flex flex-col space-y-2">
      <RadioGroup label="Select Number of Questions:">
        <RadioButton v-model="numberOfQuestions" name="options" label="10" :value=10 />
        <RadioButton v-model="numberOfQuestions" name="options" label="25" :value=25 />
        <RadioButton v-model="numberOfQuestions" name="options" label="50" :value=50 />
        <RadioButton v-model="numberOfQuestions" name="options" label="Custom" :value="0" />
      </RadioGroup>
      <div v-if="numberOfQuestions === 0">
        <InputText class="w-25" type="number" placeholder="Custom" v-model="customNumber" /> <br/>
        <span class="text-sm text-red-400" v-if="customNumberValidation">Please enter a value between 1 and 50</span>
      </div>
    </div>
  </div>
</template>