<template>
  <q-card>
    <q-card-section>
      <div class="text-subtitle2">
        {{ `${$props.booking.first_name} ${$props.booking.last_name}` }}
      </div>
      <div class="text-subtitle2">
        Precio: ${{ Number($props.booking.price).toFixed(2) }}
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-xs-6">
          <div class="text-subtitle2">
            Desde: {{ $props.booking.date.from }}
          </div>
        </div>
        <div class="col-xs-6">
          <div class="text-subtitle2">Hasta: {{ $props.booking.date.to }}</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { IBooking } from 'src/types';

/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */
const $props = defineProps<{ booking: IBooking }>();
</script>
