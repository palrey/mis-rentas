import AdminLayoutVue from 'src/layouts/admin/AdminLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { ROUTE_NAME } from './name';

export const bookingRoutes: RouteRecordRaw = {
  path: '/',
  component: AdminLayoutVue,
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
  ],
};
