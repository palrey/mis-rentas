<template>
  <div class="row justify-center">
    <q-card>
      <q-card-section v-if="booking">
        <booking-report id="booking-report" :booking="booking" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
// import JsPDF from 'jspdf';
import BookingReport from 'src/components/widgets/BookingReportWidget.vue';
import { IBooking } from 'src/types';
import { handleAxiosError } from 'src/helpers';
import { $api } from 'src/boot/axios';
import { useMeta } from 'quasar';

useMeta({
  title: 'PalRey | Reserva',
});

/**
 * -----------------------------------------
 *	Injectable
 * -----------------------------------------
 */
const $route = useRoute();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const booking = ref<IBooking>();
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */

// function download() {
//   const doc = new JsPDF('p', 'pt', 'A4');
//   const margins = {
//     top: 80,
//     bottom: 60,
//     left: 40,
//     width: 522,
//   };
//   const element = document.getElementById('booking-report');
//   if (element) {
//     doc.html(element, margins).then(() => {
//       doc.save('test.pdf');
//     });
//   }
// }
onBeforeMount(async () => {
  if ($route.query.code) {
    try {
      const resp = await $api.get<IBooking>('api/bookings/report', {
        params: {
          code: $route.query.code,
        },
      });
      booking.value = resp.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
});
</script>
