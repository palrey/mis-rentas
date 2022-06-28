import { RouteRecordRaw } from 'vue-router';
import { bookingRoutes } from './routes/booking';
import { ROUTE_NAME } from './routes/name';
/**
 * routes
 */
const routes: RouteRecordRaw[] = [
  bookingRoutes,
  {
    path: '/booking-details',
    name: ROUTE_NAME.BOOKING_REPORT,
    component: () => import('src/pages/booking/BookingDetails.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
