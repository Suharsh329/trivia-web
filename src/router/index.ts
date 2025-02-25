import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import * as routes from '../routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.ROOT,
      name: routes.ROOT,
      component: HomeView,
    },
    {
      path: routes.STATS,
      name: routes.STATS,
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: routes.PAST_GAMES,
      name: routes.PAST_GAMES,
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: routes.GAME_PLAY,
      name: routes.GAME_PLAY,
      component: () => import('../views/HomeView.vue'),
    },
  ],
});

export default router;
