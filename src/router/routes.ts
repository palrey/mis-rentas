import { RouteRecordRaw } from 'vue-router';
import { adminRoutes } from './routes/admin';
import { ROUTE_NAME } from './routes/name';
/**
 * routes
 */
const routes: RouteRecordRaw[] = [
  adminRoutes,
  {
    path: '/booking-details',
    name: ROUTE_NAME.BOOKING_REPORT,
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
