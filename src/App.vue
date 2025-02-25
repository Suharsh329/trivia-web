<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import * as routes from '@/routes';
import router from './router';
</script>

<template>
  <header 
    class="flex justify-between items-center p-4 sm:p-6 bg-blue-50 border-b border-gray-300 rounded-lg max-w-full sm:max-w-screen-xl w-full mx-auto mt-4 overflow-x-hidden px-4 sm:px-6" 
    v-if="router.currentRoute.value.name !== routes.GAME_PLAY">
    <div>
      Logo
    </div>
    <div class="space-x-2 sm:space-x-4">
      <RouterLink :to="routes.ROOT" class="nav-item ml-5 text-base text-gray-800 no-underline hover:text-[#4682b4]">Home</RouterLink>
      <RouterLink :to="routes.ROOT" class="nav-item ml-5 text-base text-gray-800 no-underline hover:text-[#4682b4]">Statistics</RouterLink>
      <RouterLink :to="routes.ROOT" class="nav-item ml-5 text-base text-gray-800 no-underline hover:text-[#4682b4]">Past Games</RouterLink>
    </div>
  </header>
  <RouterView />
</template>
