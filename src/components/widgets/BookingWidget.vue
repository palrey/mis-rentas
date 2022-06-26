<template>
  <q-card>
    <q-card-section>
      <div class="text-subtitle2">
        {{ `${$props.booking.first_name} ${$props.booking.last_name}` }}
      </div>
      <div class="text-caption">{{ diffDays }} días</div>
      <div class="text-caption">
        {{ Number(totalPrice).toFixed(2) }}
        {{ $props.booking.currency }}
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn dense icon="mdi-link-variant" @click="copyUrl" />
      <q-btn dense icon="mdi-pencil" @click="copyUrl" />
      <q-btn dense icon="mdi-delete" @click="remove" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { IBooking } from 'src/types';
import { computed } from 'vue';
import { copyToClipboard, date, useQuasar } from 'quasar';

/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */
const $props = defineProps<{ booking: IBooking }>();
const $q = useQuasar();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
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
/**
 * Copy Url
 */
async function copyUrl() {
  await copyToClipboard(window.location.origin + '/booking-details');
  $q.notify({
    message: 'Enlace copiado',
    color: 'positive',
    icon: 'mdi-link-variant',
    timeout: 2000,
    position: 'center',
  });
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
  }).onOk(() => {
    console.log('Delete');
  });
}
</script>
