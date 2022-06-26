<template>
  <q-page padding>
    <section>
      <q-card class="no-box-shadow">
        <q-card-section>
          <q-btn
            dense
            color="primary"
            icon="mdi-plus"
            label="Nueva Reserva"
            class="full-width"
            @click="dialogForm = true"
          />
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div
              class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
              v-for="(booking, bKey) in bookings"
              :key="`booking-key-${bKey}-${booking.id}`"
            >
              <booking-widget :booking="booking" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
  <!-- Dialog Form -->
  <q-dialog v-model="dialogForm" maximized>
    <booking-form @completed="onBookingComplete" @canceled="closeDialog" />
  </q-dialog>
  <!-- / Dialog Form -->
</template>

<script setup lang="ts">
import BookingForm from 'src/components/forms/BookingForm.vue';
import BookingWidget from 'src/components/widgets/BookingWidget.vue';
import { IBooking } from 'src/types';
import { ref } from 'vue';

/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const dialogForm = ref(false);
const bookings = ref<IBooking[]>([
  {
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
  },
]);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * Close Dialog
 */
function closeDialog() {
  dialogForm.value = false;
}
/**
 * On Booking Complete
 * @param b
 */
function onBookingComplete(b: IBooking) {
  bookings.value.unshift(b);
  closeDialog();
}
</script>
