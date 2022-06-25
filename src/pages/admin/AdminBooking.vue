<template>
  <q-page padding>
    <section>
      <q-card class="no-box-shadow">
        <q-card-section>
          <div class="text-h6">
            Mis Reservas
            <q-btn
              outline
              dense
              color="primary"
              icon="mdi-plus"
              label="Nueva Reserva"
              @click="dialogForm = true"
            />
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
import { IBooking } from 'src/types';
import { ref } from 'vue';

/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const dialogForm = ref(false);
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
  console.log(b);
  closeDialog();
}
</script>
