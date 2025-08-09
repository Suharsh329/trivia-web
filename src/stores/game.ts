import { defineStore } from 'pinia';
import { getData, postData } from '@/server';

interface Question {
  question_text: string;
  correct_answer: string;
  acceptable_answer: string;
  sub_category_name: string;
  difficulty_level: string;
  image: string;
}

// Function to generate a random game name
function generateRandomGameName(): string {
  const adjectives = [
    'Epic', 'Amazing', 'Brilliant', 'Fantastic', 'Incredible', 'Awesome',
    'Legendary', 'Ultimate', 'Super', 'Mega', 'Lightning', 'Thunder',
    'Cosmic', 'Stellar', 'Blazing', 'Mighty', 'Swift', 'Golden'
  ];

  const nouns = [
    'Quiz', 'Challenge', 'Battle', 'Tournament', 'Competition', 'Contest',
    'Showdown', 'Duel', 'Match', 'Game', 'Arena', 'Championship',
    'Quest', 'Adventure', 'Mission', 'Trial', 'Test', 'Clash'
  ];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 1000) + 1;

  return `${randomAdjective}-${randomNoun}-${randomNumber}`;
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
      teamNames: [
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
        gameId: '',
        percentages: this.difficultyPercentages,
        numberOfQuestions:
          this.numberOfQuestions !== 0 ? this.numberOfQuestions : this.customNumber,
      };

      try {
        this.loading = true;
        let response = await postData('/games', { game_name: generateRandomGameName() });
        params.gameId = response.data.game.id;
        await postData('/games/set-random-game', params);
        response = await getData(`/game?gameId=${params.gameId}&limit=${params.numberOfQuestions}`);
        this.questions = response.data.questions;
        if (!this.questions || this.questions?.length === 0) {
          throw new Error('No questions found for the selected game.');
        }
        localStorage.setItem('trivia-questions', JSON.stringify(this.questions));
      } catch (error) {
        throw error; // Forward the error to be handled by the caller
      } finally {
        this.loading = false;
      }
    },
  },
});
