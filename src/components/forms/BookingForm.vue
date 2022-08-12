<template>
  <q-card class="no-box-shadow text-grey-9">
    <q-form @submit.prevent="onSubmit">
      <q-card-section>
        <div class="text-h6 text-center">Nueva Reserva</div>
      </q-card-section>
      <q-card-section>
        <!-- Date -->
        <div :class="`col-xs-12 text-center`">
          <div class="text-body1">Fecha</div>
          <q-date
            v-model="form.date"
            range
            required
            @range-end="onDateRangeEnd"
            v-if="!availableRooms.length"
          />
          <q-chip
            v-else
            clickable
            class="glossy"
            icon="mdi-calendar"
            :label="`${new Date(
              form.date.from
            ).toLocaleDateString()} - ${new Date(
              form.date.to
            ).toLocaleDateString()}`"
            @click="resetCalendar"
          />
        </div>
        <!-- / Date -->
      </q-card-section>
      <q-card-section class="q-gutter-y-sm" v-if="availableRooms.length">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 text-center">
            <div class="text-h6">Información Personal</div>
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

          <div class="col-xs-12 text-center">
            <div class="text-h6">Contacto</div>
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
            <div class="text-h6">Dirección</div>
          </div>

          <!-- Address country -->
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="addressDetails.country"
              type="text"
              label="País"
            />
          </div>
          <!-- / Address country -->
          <!-- Address State -->
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="addressDetails.state"
              type="text"
              label="Estado / Provincia"
            />
          </div>
          <!-- / Address State -->
          <!-- Address City -->
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="addressDetails.city"
              type="text"
              label="Ciudad / Municipio"
            />
          </div>
          <!-- / Address City -->

          <div class="col-xs-12 text-center">
            <div class="text-h6">Información de Viaje</div>
          </div>
          <!-- Airline Name -->
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="form.airline_name"
              required
              label="Aereolínea"
              :options="[
                'Vivaerobus',
                'MagniCharter',
                'Aeromar',
                'Volaris',
                'Delta',
                'Copa',
              ]"
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
            <div class="text-h6">Información de Reserva</div>
          </div>
          <!-- Room Type -->
          <div class="col-xs-12">
            <q-select
              required
              v-model="form.room_id"
              emit-value
              map-options
              option-label="title"
              option-value="id"
              :options="availableRooms"
              label="Habitación"
            />
          </div>
          <!-- Currency -->
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="form.currency"
              :options="['MXN', 'CUP', 'USD', 'EUR']"
              label="Moneda"
            />
          </div>
          <!-- / Currency -->
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

          <!-- Comments -->
          <div class="col-xs-12">
            <q-input
              v-model="form.comments"
              type="textarea"
              label="Observaciones"
            />
          </div>
          <!-- / Comments -->
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
import { onBeforeMount, ref } from 'vue';
import { IBooking, IRoom } from 'src/types';
import { $notificationHelper, handleAxiosError } from 'src/helpers';
import { $api } from 'src/boot/axios';

const $emit = defineEmits<{
  (name: 'completed', p: IBooking): void;
  (name: 'updated', p: IBooking): void;
  (name: 'canceled'): void;
}>();
const $props = defineProps<{ booking?: IBooking }>();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */

const addressDetails = ref<{
  country: string | null;
  state: string | null;
  city: string | null;
  // postal_code: string | null;
  // address: string;
}>({
  country: null,
  state: null,
  city: null,
  // postal_code: null,
  // address: '',
});

const availableRooms = ref<IRoom[]>([]);

const form = ref<IBooking>({
  id: 0,
  airline_fly: '',
  airline_name: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  room_type: 'Sencilla',
  room_id: 0,
  address: '',
  passport: '',
  price: 0,
  date: {
    from: '',
    to: '',
  },
  comments: '',
  currency: 'USD',
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * Get all Rooms
 */
async function getAllRooms() {
  $notificationHelper.loading(true, 'Buscando habitaciones disponibles');
  try {
    const resp = await $api.get<IRoom[]>('api/rooms');
    availableRooms.value = resp.data;
    if (availableRooms.value.length)
      form.value.room_id = availableRooms.value[0].id;
  } catch (error) {
    handleAxiosError(error);
  }
  $notificationHelper.loading(false);
}
/**
 * Get Available Rooms
 */
async function getAvailableRooms() {
  try {
    const resp = await $api.post<IRoom[]>('api/rooms/available', {
      date: form.value.date,
    });
    availableRooms.value = resp.data;
    if (availableRooms.value.length)
      form.value.room_id = availableRooms.value[0].id;
    if (!availableRooms.value.length) {
      $notificationHelper.error('No hay habitaciones disponibles');
    }
  } catch (error) {
    handleAxiosError(error);
  }
}
/**
 * On Date Range End
 */
function onDateRangeEnd() {
  if ($props.booking) getAllRooms();
  else getAvailableRooms();
}
/**
 * On submit
 */
async function onSubmit() {
  form.value.address = `${
    addressDetails.value.city ? addressDetails.value.city : ''
  }${addressDetails.value.state ? ', ' + addressDetails.value.state : ''}${
    addressDetails.value.country ? ', ' + addressDetails.value.country : ''
  }`;
  try {
    if ($props.booking && $props.booking.id) {
      $emit(
        'updated',
        (
          await $api.patch<IBooking>(
            `api/bookings/${$props.booking.id}`,
            form.value
          )
        ).data
      );
    } else {
      const data = (await $api.post<IBooking>('api/bookings', form.value)).data;
      $emit('completed', data);
    }
  } catch (error) {
    handleAxiosError(error);
  }
  $notificationHelper.loading(false);
}
/**
 * Reset Calendar
 */
function resetCalendar() {
  availableRooms.value = [];
  form.value.date = {
    from: '',
    to: '',
  };
}

onBeforeMount(async () => {
  if ($props.booking) {
    form.value = $props.booking;
    const address = form.value.address.split(', ');
    if (address[0]) addressDetails.value.city = address[0];
    if (address[1]) addressDetails.value.state = address[1];
    if (address[2]) addressDetails.value.country = address[2];
    await getAllRooms();
  }
});
</script>
