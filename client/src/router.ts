import { createRouter, createWebHistory } from 'vue-router';

import DetailedHelpCard from './Pages/DetailedHelpCard.vue';
import HelpRequests from './Pages/HelpRequests.vue';
import Login from './Pages/Login.vue';
import PageNotFound from './Pages/PageNotFound.vue';
import Profile from './Pages/Profile.vue';

export const routesName = {
  login: 'login',
  helpRequests: 'helpRequests',
  helpRequestDetails: 'helpRequestDetails',
  profile: 'profile',
  pageNotFound: 'pageNotFound',
};

const routes = [
  { path: '/', name: routesName.login, component: Login, alias: ['/login'] },
  { path: '/helpRequests', name: routesName.helpRequests, component: HelpRequests },
  { path: '/profile', name: routesName.profile, component: Profile },
  { path: '/helpRequestDetails/:id', name: routesName.helpRequestDetails, component: DetailedHelpCard },
  { path: '/:pathMatch(.*)*', name: 'pageNotFound', component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      // Если пользователь возвращается назад/вперед, использовать сохраненное положение
      return savedPosition;
    } else {
      // В остальных случаях прокрутить наверх
      return { top: 0 };
    }
  },
});

export default router;
