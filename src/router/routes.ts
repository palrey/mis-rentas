import { RouteRecordRaw } from 'vue-router';
import { adminRoutes } from './routes/admin';
/**
 * routes
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  adminRoutes,
  {
    path: '/booking-details',
    component: () => import('pages/BookingDetails.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
