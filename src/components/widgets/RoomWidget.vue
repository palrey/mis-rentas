<template>
  <q-card>
    <q-card-section>
      <div class="text-body1">
        {{ $props.room.title }} ({{ $props.room.type }})
      </div>
      <div class="text-subtitle">{{ $props.room.address }})</div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn dense icon="mdi-pencil" @click="edit" />
      <q-btn dense icon="mdi-delete" @click="remove" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { $api } from 'src/boot/axios';
import { $notificationHelper, handleAxiosError } from 'src/helpers';
import { IRoom } from 'src/types';

const $emit = defineEmits<{
  (e: 'removed', id: number): void;
  (e: 'edit', id: number): void;
}>();
const $props = defineProps<{ room: IRoom }>();
const $q = useQuasar();
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */

/**
 * edit
 */
async function edit() {
  $q.dialog({
    title: 'Editar Habitación',
    message: 'Desea modificar la Habitación?',
    ok: 'Si',
    cancel: 'no',
  }).onOk(() => {
    $emit('edit', $props.room.id);
  });
}
/**
 * remove
 */
async function remove() {
  $q.dialog({
    title: 'Eliminar Habitación',
    message: 'Desea eliminar la Habitación?',
    ok: 'Si',
    cancel: 'no',
  }).onOk(async () => {
    $notificationHelper.loading();
    try {
      await $api.delete(`api/rooms/${$props.room.id}`);
      $emit('removed', $props.room.id);
    } catch (error) {
      handleAxiosError(error);
    }
    $notificationHelper.loading(false);
  });
}
</script>
