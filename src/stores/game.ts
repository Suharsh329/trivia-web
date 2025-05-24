import { defineStore } from 'pinia';
import { postData } from '@/server';

interface Question {
  question: string;
  answer: string;
  acceptableAnswer: string;
  category: string;
  difficulty: string;
  image: string;
}

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
      loading: false,
      numberOfQuestions: 10,
      playerNames: [
        {
          name: 'Player 1',
          score: 0,
          correct: 0,
          incorrect: 0,
        },
        {
          name: 'Player 2',
          score: 0,
          correct: 0,
          incorrect: 0,
        },
      ],
      questions: [] as Question[],
      questionSelection: 'random',
      teamNames : [
        {
          name: 'Team 1',
          score: 0,
          correct: 0,
          incorrect: 0,
        },
        {
          name: 'Team 2',
          score: 0,
          correct: 0,
          incorrect: 0,
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
      try {
        this.loading = true;
        const response = await postData('/new-game', params);
        this.questions = response.data.questions;
        localStorage.setItem('trivia-questions', JSON.stringify(this.questions));
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  },
});
