<template>
  <q-card class="no-box-shadow text-grey-9">
    <q-form @submit.prevent="onSubmit">
      <q-card-section>
        <div class="text-h6 text-center">Nueva Reserva</div>
      </q-card-section>
      <q-card-section class="q-gutter-y-sm">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 text-center">
            <div class="text-body1">Información Personal</div>
          </div>
          <!-- First Name -->
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="form.first_name"
              required
              type="text"
              label="Nombre"
            />
          </div>
          <!-- / First Name -->
          <!-- Last Name -->
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="form.last_name"
              required
              type="text"
              label="Apellidos"
            />
          </div>
          <!-- / Last Name -->
          <!-- Address -->
          <div class="col-xs-12">
            <q-input
              v-model="form.address"
              required
              type="text"
              label="Dirección"
            />
          </div>
          <!-- / Address -->

          <div class="col-xs-12 text-center">
            <div class="text-body1">Contacto</div>
          </div>
          <!-- Email -->
          <div class="col-xs-12 col-sm-6">
            <q-input v-model="form.email" type="email" label="Email" />
          </div>
          <!-- / Email -->
          <!-- Phone -->
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="form.phone"
              required
              type="tel"
              label="Teléfono"
            />
          </div>
          <!-- / Phone -->

          <div class="col-xs-12 text-center">
            <div class="text-body1">Información de Viaje</div>
          </div>
          <!-- Airline Name -->
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="form.airline_name"
              type="text"
              required
              label="Aereolínea"
            />
          </div>
          <!-- Airline Fly -->
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="form.airline_fly"
              type="text"
              required
              label="Número de Vuelo"
            />
          </div>
          <!-- / Airline Fly -->
          <!-- Passport -->
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="form.passport"
              required
              type="text"
              label="Pasaporte"
            />
          </div>
          <!-- / Passport -->

          <div class="col-xs-12 text-center">
            <div class="text-body1">Información de Reserva</div>
          </div>
          <!-- Room Type -->
          <div class="col-xs-12 col-sm-6">
            <q-select
              required
              v-model="form.room_type"
              :options="['Sencilla', 'Doble', 'Triple', 'Cuadruple']"
              label="Habitación"
            />
          </div>
          <!-- Price -->
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="form.price"
              type="number"
              step="0.01"
              label="Precio"
              prefix="$"
              required
            />
          </div>
          <!-- / Price -->
          <!-- Date -->
          <div class="col-xs-12 col-sm-6 text-center">
            <div class="text-body1">Fecha</div>
            <q-date v-model="form.date" range required />
          </div>
          <!-- / Date -->
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn
          label="Cancelar"
          color="negative"
          outline
          icon="mdi-cancel"
          @click="$emit('canceled')"
        />
        <q-btn label="Guardar" color="primary" icon="mdi-check" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IBooking } from 'src/types';

const $emit = defineEmits<{
  (name: 'completed', p: IBooking): void;
  (name: 'canceled'): void;
}>();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const form = ref<Omit<IBooking, 'id'>>({
  airline_fly: '',
  airline_name: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  room_type: 'Sencilla',
  address: '',
  passport: '',
  price: 0,
  date: {
    from: '',
    to: '',
  },
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * On submit
 */
async function onSubmit() {
  console.log('onSubmit');
  console.log(form.value);
  $emit('completed', form.value);
}
</script>
