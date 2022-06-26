<template>
  <div class="row justify-center">
    <q-card>
      <q-card-section>
        <booking-report
          id="booking-report"
          :booking="{
            address: 'Calle Silencio #32',
            airline_fly: '512',
            airline_name: 'TransGaviota',
            currency: 'USD',
            date: {
              from: '2022/06/13',
              to: '2022/06/25',
            },
            first_name: 'Adrian',
            id: 1,
            last_name: 'Capote Quintana',
            passport: '874842135678',
            phone: '53375180',
            price: 250,
            room_type: 'Cuadruple',
            email: 'acq95@nauta.cu',
          }"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ROUTE_NAME } from 'src/router';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
// import JsPDF from 'jspdf';
import BookingReport from 'src/components/widgets/BookingReportWidget.vue';

/**
 * -----------------------------------------
 *	Injectable
 * -----------------------------------------
 */
const $route = useRoute();
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
onBeforeMount(() => {
  if ($route.name === ROUTE_NAME.ADMIN_BOOKING) {
    console.log('Admin.Booking');
  }
});
</script>
