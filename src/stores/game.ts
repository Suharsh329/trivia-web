import { defineStore } from 'pinia';
import { postData } from '@/server';

export const useGameStore = defineStore('game', {
  state: () => {
    return {
      customNumber: 1,
      difficultyPercentages: {
        1: 25,
        2: 25,
        3: 25,
        4: 25,
      },
      gameMode: 'individual',
      numberOfQuestions: 10,
      playerNames: [
        {
          name: 'Player 1',
        },
        {
          name: 'Player 2',
        },
      ],
      questionSelection: 'random',
      teamNames : [
        {
          name: 'Team 1',
        },
        {
          name: 'Team 2',
        },
      ],
      score: {
        correct: 10,
        incorrect: 5,
      },
      step: 0,
    };
  },
  actions: {
    async createNewGame() {
      const params = {
        difficultyPercentages: this.difficultyPercentages,
        gameMode: this.gameMode,
        numberOfQuestions: this.numberOfQuestions !== 0 ? this.numberOfQuestions : this.customNumber,
        playerNames: this.playerNames,
        questionSelection: this.questionSelection,
        teamNames: this.teamNames,
        score: this.score,
      };

      const response = await postData('/new-game', params);
    }
  },
});
