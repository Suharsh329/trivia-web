<script setup lang="ts">
import * as routes from '@/routes';
import router from '@/router';
import { useGameStore } from '@/stores/game';
import { computed, toRefs } from 'vue';

const { customNumber, difficultyPercentages, loading, numberOfQuestions, score, step } =
  toRefs(useGameStore());

const progressHandler = async () => {
  if (step.value === 4) {
    try {
      await useGameStore().createNewGame();
      await router.push({ name: routes.GAME_PLAY });
    } catch (error) {
      console.error('Error creating:', error);
    } finally{
      return;
    }
  }

  step.value += 1;
};

const backHandler = () => {
  step.value -= 1;
};

const discardHandler = () => {
  useGameStore().$reset();
};

const disableButton = computed(() => {
  return (
    ((!customNumber.value || customNumber.value < 1 || customNumber.value > 50) &&
      numberOfQuestions.value === 0 &&
      step.value === 2) ||
    (difficultyPercentages.value[1] +
      difficultyPercentages.value[2] +
      difficultyPercentages.value[3] +
      difficultyPercentages.value[4] !==
      100 &&
      step.value === 3) ||
    !score.value.correct ||
    (!score.value.incorrect && step.value === 4)
  );
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 font-sans">
    <main class="flex items-center justify-center min-h-screen">
      <Card class="w-full sm:w-1/2 bg-white rounded-2xl shadow-2xl">
        <div v-if="step === 0">
          <Welcome />
        </div>

        <div v-if="step > 0" class="flex justify-between">
          <div @click="backHandler" class="mb-2 ml-6 cursor-pointer hover:scale-105 transition">
            <Icon name="arrow-left" />
          </div>
          <div @click="discardHandler" class="mb-2 mr-6 cursor-pointer hover:scale-105 transition">
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
          <button
            @click="progressHandler"
            :disabled="disableButton"
            :loading="loading"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer min-w-25 shadow hover:scale-105 transition duration-200"
            :class="{ 'bg-green-600 hover:bg-green-800': step === 4 }"
          >
            {{ step === 0 ? 'New Game' : step === 4 ? 'Start' : 'Next' }}
          </button>
        </div>
      </Card>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');

.font-sans {
  font-family: 'Inter', Arial, sans-serif;
}
</style>
