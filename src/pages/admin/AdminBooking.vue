<template>
  <q-page padding>
    <section>
      <q-card class="no-box-shadow">
        <q-card-section>
          <q-btn
            outline
            dense
            color="primary"
            icon="mdi-plus"
            label="Nueva Reserva"
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
const bookings = ref<IBooking[]>([]);
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
