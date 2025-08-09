<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import * as routes from '@/routes';
import router from './router';
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 font-sans">
    <header
      v-if="router.currentRoute.value.name !== routes.GAME_PLAY"
      class="flex justify-between items-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-b border-gray-300 rounded-lg max-w-full sm:max-w-screen-xl w-full mx-auto shadow-md overflow-x-hidden px-4 sm:px-6"
    >
      <div class="flex items-center space-x-2">
        <span class="material-icons text-blue-600">quiz</span>
        <span class="text-xl font-bold text-gray-800">Trivia Game</span>
      </div>
      <nav class="flex items-center space-x-6">
        <RouterLink
          :to="routes.ROOT"
          class="nav-item text-base text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-1"
        >
          <span class="material-icons text-lg">home</span>
          <span>Home</span>
        </RouterLink>
        <RouterLink
          :to="routes.ROOT"
          class="nav-item text-base text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-1"
        >
          <span class="material-icons text-lg">bar_chart</span>
          <span>Statistics</span>
        </RouterLink>
        <RouterLink
          :to="routes.ROOT"
          class="nav-item text-base text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-1"
        >
          <span class="material-icons text-lg">history</span>
          <span>Past Games</span>
        </RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.font-sans {
  font-family: 'Inter', Arial, sans-serif;
}

.nav-item {
  position: relative;
}

.nav-item::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #3b82f6;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}
</style>
