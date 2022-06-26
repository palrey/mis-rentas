<template>
  <q-card class="no-box-shadow" style="max-width: 40rem; min-width: 20rem">
    <q-card-section class="text-center">
      <q-img
        src="img/logo.png"
        alt="Rentas Palrey logo"
        style="max-width: 8rem"
        spinner-color="primary"
        spinner-size="82px"
      />
      <div class="text-h6">Información de Reserva</div>
    </q-card-section>

    <q-card-section class="text-justify text-subtitle2">
      <div class="row q-col-gutter-md">
        <!-- Col-1 -->
        <div class="col-xs-12 col-sm-6 q-gutter-y-sm">
          <!-- First Name -->
          <div>
            <div class="text-grey-7">Nombre / First Name</div>
            <div class="text-bold">
              {{ $props.booking.first_name }}
            </div>
          </div>
          <!-- / First Name -->
          <!-- Last Name -->
          <div>
            <div class="text-grey-7">Apellidos / Last Name</div>
            <div class="text-bold">
              {{ $props.booking.last_name }}
            </div>
          </div>
          <!-- / Last Name -->
          <!-- Passport -->
          <div>
            <div class="text-grey-7">Pasaporte / Passport</div>
            <div class="text-bold">
              {{ $props.booking.passport }}
            </div>
          </div>
          <!-- / Passport -->
        </div>
        <!-- / Col -->

        <!-- Col -->
        <div class="col-xs-12 col-sm-6 q-gutter-y-sm">
          <!-- Address -->
          <div>
            <div class="text-grey-7">Dirección / Address</div>
            <div class="text-bold">
              {{ $props.booking.address }}
            </div>
          </div>
          <!-- / Address -->
          <!-- Email -->
          <div>
            <div class="text-grey-7">Correo / Email</div>
            <div class="text-bold">
              {{ $props.booking.email }}
            </div>
          </div>
          <!-- / Email -->
          <!-- Phone -->
          <div>
            <div class="text-grey-7">Teléfono / Phone</div>
            <div class="text-bold">
              {{ $props.booking.phone }}
            </div>
          </div>
          <!-- / Phone -->
        </div>
        <!-- / Col -->

        <!-- Col -->
        <div class="col-xs-12 col-sm-6 q-gutter-y-sm">
          <!-- room_type -->
          <div>
            <div class="text-grey-7">Habitación / Room</div>
            <div class="text-bold">
              {{ $props.booking.room_type }}
            </div>
          </div>
          <!-- / room_type -->
          <!-- Check in -->
          <div>
            <div class="text-grey-7">Fecha Entrada / Check in</div>
            <div class="text-bold">
              {{ $props.booking.date.from }}
            </div>
          </div>
          <!-- / Check in -->
          <!-- Check out -->
          <div>
            <div class="text-grey-7">Fecha Salida / Check out</div>
            <div class="text-bold">
              {{ $props.booking.date.to }}
            </div>
          </div>
          <!-- / Check out -->
        </div>
        <!-- / Col -->

        <!-- Col -->
        <div class="col-xs-12 col-sm-6 q-gutter-y-sm">
          <!-- Currency -->
          <div>
            <div class="text-grey-7">Moneda / Currency</div>
            <div class="text-bold">
              {{ $props.booking.currency }}
            </div>
          </div>
          <!-- / Currency -->
          <!-- Price -->
          <div>
            <div class="text-grey-7">Tarifa / Currency</div>
            <div class="text-bold">
              {{ $props.booking.price.toFixed(2) }}
            </div>
          </div>
          <!-- / Price -->
          <!-- Total -->
          <div>
            <div class="text-grey-7">Total / Total</div>
            <div class="text-bold">
              {{ totalPrice.toFixed(2) }}
            </div>
          </div>
          <!-- / Total -->
        </div>
        <!-- / Col -->
        <div class="col-xs-12 text-center q-gutter-y-sm">
          <qrcode-vue :value="qrcode" :size="200" />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <p class="text-center text-caption">RENTAS PALREY 2022</p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { date } from 'quasar';
import { IBooking } from 'src/types';
import { computed } from 'vue';
import QrcodeVue from 'qrcode.vue';
/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */
const $props = defineProps<{ booking: IBooking }>();
/**
 * -----------------------------------------
 *	data
 * -----------------------------------------
 */

const qrcode = computed(
  () =>
    `${$props.booking.first_name} ${$props.booking.last_name}\nPasaporte: ${
      $props.booking.passport
    }\nEntrada ${$props.booking.date.from}\nSalida ${
      $props.booking.date.to
    }\n${totalPrice.value.toFixed(2)} ${$props.booking.currency}`
);
const diffDays = computed(() =>
  date.getDateDiff($props.booking.date.to, $props.booking.date.from, 'days')
);
const totalPrice = computed(() => {
  return diffDays.value * $props.booking.price;
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
</script>
