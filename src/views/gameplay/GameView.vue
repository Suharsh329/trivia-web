<script lang="ts" setup>
import router from '@/router';
import { useGameStore } from '@/stores/game';
import { onMounted, ref, toRefs, computed } from 'vue';
import * as routes from '@/routes';

const {
  difficultyPercentages,
  gameMode,
  numberOfQuestions,
  playerNames,
  questions,
  score,
  teamNames,
} = toRefs(useGameStore());

const round = ref(1);
const revealAnswer = ref(false);
const showDetails = ref(false);
const showScoreModal = ref(false);

onMounted(() => {
  if (!questions.value || questions?.value?.length === 0) {
    try {
      questions.value = JSON.parse(localStorage.getItem('trivia-questions') || '[]');
      round.value = parseInt(JSON.parse(localStorage.getItem('trivia-round') || '1'));
    } catch (error) {
      localStorage.removeItem('trivia-questions');
      localStorage.removeItem('trivia-round');
      questions.value = [];
    }
  }

  if (!questions.value || questions?.value?.length === 0) {
    router.push(routes.ROOT);
    return;
  }

  if (gameMode.value === 'individual') {
    playerNames.value.forEach((player) => {
      player.correct = score.value.correct;
      player.incorrect = score.value.incorrect;
    });
  } else {
    teamNames.value.forEach((team) => {
      team.correct = score.value.correct;
      team.incorrect = score.value.incorrect;
    });
  }
});

const openScoreModal = () => {
  showScoreModal.value = true;
};

const sortedScores = computed(() => {
  const playersOrTeams = gameMode.value === 'individual' ? playerNames.value : teamNames.value;
  return [...playersOrTeams].sort((a, b) => b.score - a.score);
});

const endGame = () => {
  localStorage.removeItem('trivia-round');
  useGameStore().$reset();
  router.push(routes.ROOT);
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const nextQuestion = () => {
  if (round.value !== questions.value.length) {
    round.value++;
    localStorage.setItem('trivia-round', round.value.toString());
  }
  revealAnswer.value = false;
};

const previousQuestion = () => {
  if (round.value > 1) {
    round.value--;
    localStorage.setItem('trivia-round', round.value.toString());
  }
  revealAnswer.value = false;
};

const updatePoints = (player: any, type: string) => {
  if (type === 'correct') {
    player.score += player.correct;
  } else {
    player.score -= player.incorrect;
  }

  if (gameMode.value === 'individual') {
    localStorage.setItem(
      'trivia-scores',
      JSON.stringify(
        playerNames.value.map((player) => ({
          name: player.name,
          score: player.score,
          correct: player.correct,
          incorrect: player.incorrect,
        })),
      ),
    );
  } else {
    localStorage.setItem(
      'trivia-scores',
      JSON.stringify(
        teamNames.value.map((team) => ({
          name: team.name,
          score: team.score,
          correct: team.correct,
          incorrect: team.incorrect,
        })),
      ),
    );
  }
};

const difficultyLevels: any = {
  1: { level: 'Easy', severity: 'success' },
  2: { level: 'Medium', severity: 'info' },
  3: { level: 'Hard', severity: 'warning' },
  4: { level: 'Expert', severity: 'error' },
};
const getDifficultyLevel = (level: string) => {
  return difficultyLevels[parseInt(level)];
};

const subCategorySeverities: any = {
  'General Knowledge': { severity: 'info' },
  'Entertainment': { severity: 'success' },
  // Add more sub-categories and their severities as needed
};
const getSubCategorySeverity = (subCategory: string) => {
  return subCategorySeverities[subCategory] || { severity: 'info' };
};
</script>
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 font-sans"
    v-if="questions"
  >
    <div
      class="flex justify-between items-center p-4 sm:p-6 bg-blue-50 border-b border-gray-300 rounded-lg max-w-full sm:max-w-screen-xl w-full mx-auto shadow-md"
    >
      <h1 class="text-2xl sm:text-3xl font-extrabold">
        Game Round {{ round }} / {{ questions.length }}
      </h1>
      <div class="flex gap-4 items-center">
        <button
          class="border rounded-full h-10 w-10 text-xl cursor-pointer flex items-center justify-center hover:bg-blue-100 transition"
          @click="showDetails = !showDetails"
        >
          <span>?</span>
        </button>

        <button
          class="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 text-white font-semibold transition duration-200 cursor-pointer shadow"
          @click="endGame"
        >
          End Game
        </button>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center mt-10 px-2">
      <div
        class="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-2xl flex flex-col items-center space-y-4"
      >
        <div class="w-full flex justify-between items-center mb-4">
          <button
            @click="previousQuestion"
            class="text-blue-500 hover:text-blue-700 disabled:text-gray-300 cursor-pointer"
            :disabled="round === 1"
            v-if="round !== 1"
          >
            <span class="material-icons text-4xl">arrow_back</span>
          </button>
          <div v-else class="w-12 h-12"></div>
          <button
            @click="nextQuestion"
            class="text-blue-500 hover:text-blue-700 disabled:text-gray-300 cursor-pointer"
            :disabled="round === questions.length"
            v-if="round !== questions.length"
          >
            <span class="material-icons text-4xl">arrow_forward</span>
          </button>
          <div v-else class="w-12 h-12"></div>
        </div>
        <div>
          <Badge
            :severity="getSubCategorySeverity(questions[round - 1]?.sub_category_name).severity"
            :text="questions[round - 1]?.sub_category_name"
            class="font-semi"
            v-if="questions[round - 1]?.sub_category_name"
          />
          -
          <Badge
            :severity="getDifficultyLevel(questions[round - 1]?.difficulty_level).severity"
            :text="getDifficultyLevel(questions[round - 1]?.difficulty_level).level"
            class="font-semi"
            v-if="questions[round - 1]?.difficulty_level"
          />
        </div>
        <div class="text-xl sm:text-2xl font-bold text-center">
          {{ questions[round - 1]?.question_text }}
        </div>
        <div
          class="text-center mt-2 text-lg bg-blue-500 text-white font-medium rounded-lg py-2 px-4 cursor-pointer"
          v-if="!revealAnswer"
          @click="revealAnswer = !revealAnswer"
        >
          Reveal Answer
        </div>
        <div
          class="text-center mt-2 text-lg text-black font-medium rounded-lg py-2 px-4 cursor-pointer"
          v-else
          @click="revealAnswer = !revealAnswer"
        >
          {{ questions[round - 1]?.correct_answer }} <br />
          {{ questions[round - 1]?.acceptable_answer }}
        </div>
        <div class="flex justify-center gap-4 mt-6 w-full">
          <Button
            text="Finish Game"
            class="bg-blue-500 text-white flex-1 flex items-center justify-center gap-2 rounded-lg py-2 shadow hover:scale-105 transition cursor-pointer"
            @click="openScoreModal"
            v-if="round === questions.length"
          ></Button>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center mt-10 px-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        <div
          v-for="(player, index) in gameMode === 'individual' ? playerNames : teamNames"
          :key="index"
          class="w-full p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center space-y-4"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-xl font-bold text-blue-700 shadow"
            >
              {{ getInitials(player.name) }}
            </div>
            <div>
              <div class="text-lg font-semibold">{{ player.name }}</div>
              <div class="text-md font-semibold text-gray-600">Score: {{ player.score }}</div>
            </div>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              class="bg-green-400 h-3 rounded-full transition-all"
              :style="{ width: (player.score || 0) + '%' }"
            ></div>
          </div>
          <div class="flex gap-4 mt-4 w-full">
            <InputText
              placeholder="Correct"
              v-model="player.correct"
              class="w-1/5 p-2 border border-gray-300 rounded-lg"
            />
            <Button
              class="bg-green-500 rounded-lg cursor-pointer text-white flex-1 py-2 hover:bg-green-600 transition"
              text="Correct"
              @click="updatePoints(player, 'correct')"
            ></Button>
          </div>
          <div class="flex gap-4 mt-2 w-full">
            <InputText
              placeholder="Incorrect"
              v-model="player.incorrect"
              class="w-1/5 p-2 border border-gray-300 rounded-lg"
            />
            <Button
              class="bg-red-500 rounded-lg cursor-pointer text-white flex-1 py-2 hover:bg-red-600 transition"
              text="Incorrect"
              @click="updatePoints(player, 'incorrect')"
            ></Button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center mt-8">
      <Transition name="fade">
        <div v-if="showDetails" class="fixed inset-0 z-50 flex items-center justify-center">
          <!-- Backdrop -->
          <div
            class="fixed inset-0 bg-black/50 backdrop-blur-sm"
            @click="showDetails = false"
          ></div>

          <!-- Dialog -->
          <div
            class="relative w-full max-w-2xl p-8 bg-white rounded-2xl shadow-2xl z-10 animate-fadeIn"
          >
            <button
              @click="showDetails = false"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl cursor-pointer"
            >
              &times;
            </button>
            <div>
              <h1 class="text-2xl font-bold text-center">Game Details</h1>
            </div>
            <div class="mt-4">
              <p class="text-lg">
                Game Mode: <span class="font-semibold">{{ gameMode }}</span>
              </p>
              <p class="text-lg mt-2">
                Number of Questions: <span class="font-semibold">{{ numberOfQuestions }}</span>
              </p>
              <div class="flex flex-col mt-2">
                <p class="text-lg">Difficulty Percentages:</p>
                <ul class="list-disc pl-6">
                  <li v-for="(percentage, index) in difficultyPercentages" :key="index">
                    Level {{ index }}: {{ percentage }}%
                  </li>
                </ul>
              </div>
              <div v-if="gameMode === 'individual'" class="flex flex-col mt-2">
                <p class="text-lg">Player Names:</p>
                <ol class="list-disc pl-6">
                  <li v-for="(player, index) in playerNames" :key="index">
                    {{ player.name }}
                  </li>
                </ol>
              </div>
              <div v-else class="flex flex-col mt-2">
                <p class="text-lg">Team Names:</p>
                <ul class="list-disc pl-6">
                  <li v-for="(team, index) in teamNames" :key="index">
                    {{ team.name }}
                  </li>
                </ul>
              </div>
              <div class="mt-2">
                <p class="text-lg">Scoring:</p>
                <ul class="list-disc pl-6">
                  <li>
                    Correct Answer:
                    <span class="text-green-700 font-semibold"> + {{ score.correct }}</span>
                  </li>
                  <li>
                    Incorrect Answer:
                    <span class="text-red-700 font-semibold"> - {{ score.incorrect }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Scores Modal -->
    <div v-if="showScoreModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/70 backdrop-blur-sm"></div>

      <!-- Dialog -->
      <div class="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl z-10 animate-fadeIn">
        <div>
          <h1 class="text-2xl font-bold text-center mb-6">Game Over!</h1>
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-4 text-center">Final Scores</h2>
          <ul class="space-y-3">
            <li
              v-for="(player, index) in sortedScores"
              :key="index"
              class="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
            >
              <span class="font-medium text-lg">{{ player.name }}</span>
              <span class="font-bold text-lg text-blue-600">{{ player.score }}</span>
            </li>
          </ul>
        </div>
        <div class="mt-8 flex justify-center">
          <button
            class="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-500 text-white font-semibold transition duration-200 cursor-pointer shadow-md"
            @click="endGame"
          >
            End Game
          </button>
        </div>
      </div>
    </div>
    <!-- End Scores Modal -->
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.font-sans {
  font-family: 'Inter', Arial, sans-serif;
}

.animate-fadeIn {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
