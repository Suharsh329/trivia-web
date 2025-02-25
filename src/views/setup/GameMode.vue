<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { computed, toRefs } from 'vue';

const {
  gameMode,
  playerNames,
  teamNames,
} = toRefs(useGameStore());

const addInput = () => {
  if (gameMode.value === 'individual') {
    const lastPlayer = playerNames.value[playerNames.value.length - 1];
    const lastPlayerNumber = lastPlayer ? parseInt(lastPlayer.name.split(' ')[1]) : 0;
    playerNames.value.push({ name: `Player ${lastPlayerNumber + 1}` });
  } else {
    const lastTeam = teamNames.value[teamNames.value.length - 1];
    const lastTeamNumber = lastTeam ? parseInt(lastTeam.name.split(' ')[1]) : 0;
    teamNames.value.push({ name: `Team ${lastTeamNumber + 1}` });
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

const selectGameMode = (computed(() => {
  return gameMode.value;
}));
</script>
<template>
  <div class="px-6 text-left">
    <div class="flex flex-col space-y-1">
      <RadioGroup label="Choose Game Mode:">
        <RadioButton v-model="gameMode" name="options" label="Individual" value="individual" />
        <RadioButton v-model="gameMode" name="options" label="Teams" value="teams" />
      </RadioGroup>
    </div>
    <div class="mt-4">
      <span class="font-bold text-sm">Enter Names:</span>
      <div v-if="selectGameMode === 'individual'">
        <div class="mt-2" v-for="(player, index) in playerNames" :key="index">
          <div class="flex items-center space-x-2">
            <Icon name="dismiss" size="size-4" stroke="red" class="cursor-pointer" @click="deleteInput(index)"
              v-if="playerNames.length > 1" />
            <InputText :placeholder="'Player ' + (index + 1)" v-model="player.name" />
          </div>
        </div>
        <div class="mt-3 flex items-center space-x-2 cursor-pointer w-50" @click="addInput">
          <Icon name="plus" size="size-4" stroke="green" />
          <span class="text-green-600">Add {{ gameMode === 'individual' ? 'Player' : 'Team' }}</span>
        </div>
      </div>
      <div v-else>
        <div class="mt-2" v-for="(team, index) in teamNames" :key="index">
          <div class="flex items-center space-x-2">
            <Icon name="dismiss" size="size-4" stroke="red" class="cursor-pointer" @click="deleteInput(index)"
              v-if="teamNames.length > 1" />
            <InputText :placeholder="'Team ' + (index + 1)" v-model="team.name" />
          </div>
        </div>
        <div class="mt-3 flex items-center space-x-2 cursor-pointer w-50" @click="addInput">
          <Icon name="plus" size="size-4" stroke="green" />
          <span class="text-green-600">Add {{ gameMode === 'individual' ? 'Player' : 'Team' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>