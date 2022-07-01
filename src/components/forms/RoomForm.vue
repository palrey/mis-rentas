<template>
  <q-card>
    <q-form @submit.prevent="onSubmit">
      <q-card-section>
        <div class="text-h6 text-center">Nueva Habitación</div>
      </q-card-section>
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="form.title" required type="text" label="Nombre" />
        <q-select
          v-model="form.type"
          :options="['Sencilla', 'Doble', 'Triple', 'Cuadruple']"
          label="Tipo"
          required
        />
        <q-input
          :model-value="capacity"
          readonly
          type="number"
          label="Capacidad"
        />
        <q-input
          v-model="form.address"
          required
          type="text"
          label="Direccion"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="primary"
          outline
          @click="$emit('canceled')"
          label="Cancelar"
        />
        <q-btn color="primary" type="submit" label="Guardar" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { $api } from 'src/boot/axios';
import { $notificationHelper, handleAxiosError } from 'src/helpers';
import { IRoom } from 'src/types';
import { computed, onBeforeMount, ref } from 'vue';
/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */
const $emit = defineEmits<{
  (name: 'completed', p: IRoom): void;
  (name: 'updated', p: IRoom): void;
  (name: 'canceled'): void;
}>();
const $props = defineProps<{ room?: IRoom }>();

/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */

const capacity = computed(() => {
  switch (form.value.type) {
    case 'Cuadruple':
      return 4;
    case 'Triple':
      return 3;
    case 'Doble':
      return 2;
    default:
      return 1;
  }
});
const form = ref<IRoom>({
  address: '',
  capacity: 0,
  open: true,
  title: '',
  type: 'Sencilla',
  id: 0,
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * On Submit
 */
async function onSubmit() {
  $notificationHelper.loading();
  try {
    form.value.capacity = capacity.value;
    if ($props.room && $props.room.id) {
      $emit(
        'updated',
        (await $api.patch<IRoom>(`api/rooms/${$props.room.id}`, form.value))
          .data
      );
    } else {
      const data = (await $api.post<IRoom>('api/rooms', form.value)).data;
      $emit('completed', data);
    }
  } catch (error) {
    handleAxiosError(error);
  }
  $notificationHelper.loading(false);
}

onBeforeMount(() => {
  if ($props.room) {
    form.value = $props.room;
  }
});
</script>
