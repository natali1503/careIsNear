import { createRouter, createWebHistory } from 'vue-router';

import HelpRequests from './Pages/HelpRequests.vue';
import Login from './Pages/Login.vue';
import PageNotFound from './Pages/PageNotFound.vue';
import Profile from './Pages/Profile.vue';

export const routesName = {
  login: 'login',
  helpRequests: 'helpRequests',
  profile: 'profile',
  pageNotFound: 'pageNotFound',
};

const routes = [
  { path: '/', name: routesName.login, component: Login, alias: ['/login'] },
  { path: '/helpRequests', name: routesName.helpRequests, component: HelpRequests },
  { path: '/profile', name: routesName.profile, component: Profile },
  // { path: '/helpRequestDetails', component:  },
  { path: '/:pathMatch(.*)*', name: 'pageNotFound', component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
