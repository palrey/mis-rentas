import AdminLayoutVue from 'src/layouts/admin/AdminLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { ROUTE_NAME } from './name';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  component: AdminLayoutVue,
  children: [
    {
      path: '',
      name: ROUTE_NAME.ADMIN_HOME,
      component: () => import('pages/admin/AdminHome.vue'),
    },
    {
      path: 'bookings',
      name: ROUTE_NAME.ADMIN_BOOKINGS,
      component: () => import('pages/admin/AdminBooking.vue'),
    },
    {
      path: 'bookings/:code',
      name: ROUTE_NAME.ADMIN_BOOKING,
      component: () => import('pages/BookingDetails.vue'),
    },
  ],
};
