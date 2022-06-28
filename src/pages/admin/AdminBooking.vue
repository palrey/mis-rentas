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
          <div class="row q-col-gutter-sm" v-if="bookings.length">
            <div
              class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
              v-for="(booking, bKey) in bookings"
              :key="`booking-key-${bKey}-${booking.id}`"
            >
              <booking-widget
                :booking="booking"
                @edit="onEdit"
                @removed="onRemoved"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
  <!-- Dialog Form -->
  <q-dialog v-model="dialogForm" :maximized="isMobile">
    <booking-form
      :booking="bookingEdit"
      @completed="onBookingComplete"
      @canceled="closeDialog"
      @updated="onBookingUpdated"
    />
  </q-dialog>
  <!-- / Dialog Form -->
</template>

<script setup lang="ts">
import BookingForm from 'src/components/forms/BookingForm.vue';
import BookingWidget from 'src/components/widgets/BookingWidget.vue';
import { IBooking } from 'src/types';
import { onBeforeMount, ref } from 'vue';
import { handleAxiosError, isMobile } from 'src/helpers';
import { $api } from 'src/boot/axios';
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const dialogForm = ref(false);
const bookings = ref<IBooking[]>([]);
const bookingEdit = ref<IBooking>();
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
  bookingEdit.value = undefined;
}
/**
 * On Booking Complete
 * @param b
 */
function onBookingComplete(b: IBooking) {
  bookings.value.push(b);
  closeDialog();
}
/**
 * On Booking Complete
 * @param update
 */
function onBookingUpdated(update: IBooking) {
  const bookingIndex = bookings.value.findIndex((b) => b.id === update.id);
  if (bookingIndex >= 0) {
    bookings.value[bookingIndex] = update;
  }
  closeDialog();
}
/**
 * on Edit
 * @param id
 */
function onEdit(id: number) {
  const bookingIndex = bookings.value.findIndex((b) => b.id === id);
  if (bookingIndex >= 0) {
    closeDialog();
    bookingEdit.value = bookings.value[bookingIndex];
    dialogForm.value = true;
  }
}
/**
 * On Removed
 * @param id
 */
function onRemoved(id: number) {
  const bookingIndex = bookings.value.findIndex((b) => b.id === id);
  if (bookingIndex >= 0) {
    bookings.value.splice(bookingIndex, 1);
  }
  closeDialog();
}

onBeforeMount(async () => {
  try {
    bookings.value = (await $api.get<IBooking[]>('api/bookings')).data;
  } catch (error) {
    handleAxiosError(error);
  }
});
</script>
