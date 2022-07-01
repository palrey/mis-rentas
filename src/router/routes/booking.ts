import AdminLayoutVue from 'src/layouts/admin/AdminLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { authGuard } from '../guards';
import { ROUTE_NAME } from './name';

export const bookingRoutes: RouteRecordRaw = {
  path: '/',
  component: AdminLayoutVue,
  beforeEnter: authGuard,
  children: [
    {
      path: '',
      name: ROUTE_NAME.BOOKING_HOME,
      component: () => import('pages/booking/BookingHome.vue'),
    },
    {
      path: 'bookings/:code',
      name: ROUTE_NAME.BOOKING_REPORT,
      component: () => import('src/pages/booking/BookingDetails.vue'),
    },
    {
      path: 'rooms',
      name: ROUTE_NAME.BOOKING_ROOMS,
      component: () => import('src/pages/booking/RoomsPage.vue'),
    },
  ],
};
