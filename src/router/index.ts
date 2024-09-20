import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

import { appRoutes } from './routes';
import { REDIRECT_MAIN, NOT_FOUND_ROUTE } from './routes/base';
import createRouteGuard from './guard';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: 'home',
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/daily',
      name: 'Daily',
      component: () => import('@/views/DalyDashboard/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/process',
      name: 'Process Line Dashboard',
      component: () => import('@/views/dashboard/ProcessLineDashboard/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    // {
    //   path: '/actual',
    //   name: 'Actual Daily',
    //   component: DailyActual,
    //   meta: {
    //     requiresAuth: false
    //   },
    // },
    ...appRoutes,
    REDIRECT_MAIN,
    NOT_FOUND_ROUTE,
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export default router;
