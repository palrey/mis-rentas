<template>
  <q-card>
    <q-card-section>
      <div>No. {{ $props.booking.id }}</div>
      <div class="row q-col-gutter-sm">
        <div class="col-xs-6 text-subtitle2">
          <div>
            <q-icon name="mdi-account" class="q-mr-xs" />{{
              `${$props.booking.first_name} ${$props.booking.last_name}`
            }}
          </div>
          <div>
            <q-icon name="mdi-phone" class="q-mr-xs" />{{
              $props.booking.phone
            }}
          </div>

          <div>
            <q-icon name="mdi-cash" />
            {{ Number(totalPrice).toFixed(2) }}
            {{ $props.booking.currency }}
          </div>
        </div>

        <div class="col-xs-6">
          <q-chip
            class="glossy"
            icon="mdi-arrow-right-bold"
            :label="new Date($props.booking.date.from).toLocaleDateString()"
            dense
          />
          <q-chip
            class="glossy"
            icon="mdi-arrow-left-bold"
            :label="new Date($props.booking.date.to).toLocaleDateString()"
            dense
          />
        </div>
        <div class="col-xs-12">
          <q-chip
            dense
            v-if="$props.booking.room"
            class="glossy"
            icon="mdi-home"
            :label="$props.booking.room.title"
          />
        </div>
        <div class="col-xs-12 text-justify" v-if="$props.booking.comments">
          <div class="text-caption">{{ $props.booking.comments }}</div>
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn dense icon="mdi-eye" @click="goToReport" />
      <q-btn dense icon="mdi-link-variant" @click="copyUrl" />
      <q-btn dense icon="mdi-pencil" @click="edit" />
      <q-btn dense icon="mdi-delete" @click="remove" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { IBooking } from 'src/types';
import { computed } from 'vue';
import { copyToClipboard, date, useQuasar } from 'quasar';
import { $router } from 'src/boot/router';
import { ROUTE_NAME } from 'src/router';
import { $notificationHelper, handleAxiosError } from 'src/helpers';
import { $api } from 'src/boot/axios';
import { Plugins } from '@capacitor/core';

/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */
const { Clipboard } = Plugins;
const $emit = defineEmits<{
  (e: 'removed', id: number): void;
  (e: 'edit', id: number): void;
}>();
const $props = defineProps<{ booking: IBooking }>();
const $q = useQuasar();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const diffDays = computed(() => {
  if (
    $props.booking &&
    $props.booking.date &&
    $props.booking.date.from &&
    $props.booking.date.to
  ) {
    return date.getDateDiff(
      $props.booking.date.to,
      $props.booking.date.from,
      'days'
    );
  }
  return 0;
});
const totalPrice = computed(() => {
  return diffDays.value * $props.booking.price;
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * Copy Url
 */
async function copyUrl() {
  const url = `${window.location.origin}/booking-details?code=${$props.booking.report_code}`;
  try {
    if ($q.platform.is.capacitor) {
      await Clipboard.write({ url });
      $q.notify({
        message: 'Enlace copiado',
        color: 'positive',
        icon: 'mdi-link-variant',
        timeout: 2000,
        position: 'center',
      });
    } else {
      await copyToClipboard(url);
      $q.notify({
        message: 'Enlace copiado',
        color: 'positive',
        icon: 'mdi-link-variant',
        timeout: 2000,
        position: 'center',
      });
    }
  } catch (error) {
    $q.notify({
      message: 'Plataforma no soportada',
      color: 'negative',
      icon: 'mdi-alert',
      timeout: 2000,
      position: 'center',
    });
  }
}
/**
 * edit
 */
async function edit() {
  $q.dialog({
    title: 'Editar Reserva',
    message: 'Desea modificar la reserva?',
    ok: 'Si',
    cancel: 'no',
  }).onOk(() => {
    $emit('edit', $props.booking.id);
  });
}
/**
 * Go To Report
 */
function goToReport() {
  if ($props.booking.report_code) {
    void $router.push({
      name: ROUTE_NAME.BOOKING_REPORT,
      query: {
        code: $props.booking.report_code,
      },
    });
  }
}
/**
 * remove
 */
async function remove() {
  $q.dialog({
    title: 'Eliminar Reserva',
    message: 'Desea eliminar la reserva?',
    ok: 'Si',
    cancel: 'no',
  }).onOk(async () => {
    $notificationHelper.loading();
    try {
      await $api.delete(`api/bookings/${$props.booking.id}`);
      $emit('removed', $props.booking.id);
    } catch (error) {
      handleAxiosError(error);
    }
    $notificationHelper.loading(false);
  });
}
</script>
