<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { computed, toRefs } from 'vue';

const { gameMode, playerNames, teamNames } = toRefs(useGameStore());

const addInput = () => {
  if (gameMode.value === 'individual') {
    const lastPlayer = playerNames.value[playerNames.value.length - 1];
    const lastPlayerNumber = lastPlayer ? parseInt(lastPlayer.name.split(' ')[1]) : 0;
    playerNames.value.push({
      name: `Player ${lastPlayerNumber + 1}`,
      score: 0,
      correct: 0,
      incorrect: 0,
    });
  } else {
    const lastTeam = teamNames.value[teamNames.value.length - 1];
    const lastTeamNumber = lastTeam ? parseInt(lastTeam.name.split(' ')[1]) : 0;
    teamNames.value.push({
      name: `Team ${lastTeamNumber + 1}`,
      score: 0,
      correct: 0,
      incorrect: 0,
    });
  }
};

const deleteInput = (index: number) => {
  if (gameMode.value === 'individual' && playerNames.value.length > 1) {
    playerNames.value.splice(index, 1);
  }

  if (gameMode.value === 'teams' && teamNames.value.length > 1) {
    teamNames.value.splice(index, 1);
  }
};

const selectGameMode = computed(() => {
  return gameMode.value;
});
</script>
<template>
  <div class="px-6 text-left">
    <div class="flex flex-col space-y-4">
      <RadioGroup label="Choose Game Mode:">
        <RadioButton v-model="gameMode" name="options" label="Individual" value="individual" class="hover:scale-105 transition" />
        <RadioButton v-model="gameMode" name="options" label="Teams" value="teams" class="hover:scale-105 transition" />
      </RadioGroup>
    </div>
    <div class="mt-6">
      <span class="font-bold text-lg">Enter Names:</span>
      <div v-if="selectGameMode === 'individual'" class="mt-4 space-y-4">
        <div v-for="(player, index) in playerNames" :key="index" class="flex items-center space-x-3">
          <Icon
            name="dismiss"
            size="size-4"
            stroke="red"
            class="cursor-pointer hover:scale-110 transition"
            @click="deleteInput(index)"
            v-if="playerNames.length > 1"
          />
          <InputText
            :placeholder="'Player ' + (index + 1)"
            v-model="player.name"
            class="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div class="mt-4 flex items-center space-x-2 cursor-pointer hover:scale-105 transition" @click="addInput">
          <Icon name="plus" size="size-4" stroke="green" />
          <span class="text-green-600 font-medium">Add Player</span>
        </div>
      </div>
      <div v-else class="mt-4 space-y-4">
        <div v-for="(team, index) in teamNames" :key="index" class="flex items-center space-x-3">
          <Icon
            name="dismiss"
            size="size-4"
            stroke="red"
            class="cursor-pointer hover:scale-110 transition"
            @click="deleteInput(index)"
            v-if="teamNames.length > 1"
          />
          <InputText
            :placeholder="'Team ' + (index + 1)"
            v-model="team.name"
            class="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div class="mt-4 flex items-center space-x-2 cursor-pointer hover:scale-105 transition" @click="addInput">
          <Icon name="plus" size="size-4" stroke="green" />
          <span class="text-green-600 font-medium">Add Team</span>
        </div>
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
