<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { computed, toRefs } from 'vue';

const {
  customNumber,
  difficultyPercentages,
  numberOfQuestions,
  score,
  step,
} = toRefs(useGameStore());

const progressHandler = () => {
  if (step.value === 4) {
    return;
  }

  step.value += 1;
};

const backHandler = () => {
  step.value -=1;
};

const discardHandler = () => {
  step.value = 0;
  useGameStore().$reset();
};

const disableButton = computed(() => {
  return ((!customNumber.value || customNumber.value < 1 || customNumber.value > 50) && numberOfQuestions.value === 0 && step.value === 2) 
  || (difficultyPercentages.value[1] + difficultyPercentages.value[2] + difficultyPercentages.value[3] + difficultyPercentages.value[4] !== 100 && step.value === 3)
  || (!score.value.correct || !score.value.incorrect && step.value === 4);
});
</script>

<template>
  <main class="flex items-center justify-center min-h-screen">
    <Card class="w-full sm:w-1/2">
      <div v-if="step === 0">
        <Welcome />
      </div>

      <div v-if="step > 0" class="flex justify-between">
        <div @click="backHandler" class="mb-2 ml-6 cursor-pointer">
          <Icon name="arrow-left" />
        </div>
        <div @click="discardHandler" class="mb-2 mr-6 cursor-pointer">
          <Icon name="bin" stroke="red" />
        </div>
      </div>

      <div v-if="step > 0" class="mb-6 flex justify-center">
        <Progress :step="step" />
      </div>
      <div v-if="step === 1">
        <GameMode />
      </div>
      <div v-if="step === 2">
        <NumberOfQuestions />
      </div>
      <div v-if="step === 3">
        <QuestionType />
      </div>
      <div v-if="step === 4">
        <Score />
      </div>
      
      <div class="px-6 pt-4 pb-2 mt-4 text-center">
        <button @click="progressHandler" :disabled="disableButton"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer min-w-25"
          :class="{ 'bg-green-600 hover:bg-green-800': step === 4 }">
          {{ step === 0 ? 'New Game' : step === 4 ? 'Start' : 'Next' }}
        </button>
      </div>
    </Card>
  </main>
</template>
