<template>
  <q-page padding>
    <section>
      <q-card class="no-box-shadow">
        <q-card-section>
          <q-btn
            dense
            color="primary"
            icon="mdi-plus"
            label="Nueva Habitacion"
            class="full-width"
            @click="dialogForm = true"
          />
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-sm" v-if="rooms.length">
            <div
              class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
              v-for="(r, bKey) in rooms"
              :key="`room-key-${bKey}-${r.id}`"
            >
              <room-widget :room="r" @edit="onEdit" @removed="onRemoved" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
  <!-- Dialog Form -->
  <q-dialog v-model="dialogForm" :maximized="isMobile">
    <room-form
      :style="`${isMobile ? '' : 'min-width:20rem'}`"
      @completed="onFormComplete"
      @canceled="closeDialog"
      @updated="onRoomUpdated"
      :room="roomEdit"
    />
  </q-dialog>
  <!-- / Dialog Form -->
</template>

<script setup lang="ts">
import RoomForm from 'src/components/forms/RoomForm.vue';
import RoomWidget from 'src/components/widgets/RoomWidget.vue';
import { IRoom } from 'src/types';
import { onBeforeMount, ref } from 'vue';
import { handleAxiosError, isMobile } from 'src/helpers';
import { $api } from 'src/boot/axios';
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const dialogForm = ref(false);
const rooms = ref<IRoom[]>([]);
const roomEdit = ref<IRoom>();
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
  roomEdit.value = undefined;
}
/**
 * On Form Complete
 * @param b
 */
function onFormComplete(b: IRoom) {
  rooms.value.push(b);
  closeDialog();
}
/**
 * On Room Complete
 * @param update
 */
function onRoomUpdated(update: IRoom) {
  const index = rooms.value.findIndex((b) => b.id === update.id);
  if (index >= 0) {
    rooms.value[index] = update;
  }
  closeDialog();
}
/**
 * on Edit
 * @param id
 */
function onEdit(id: number) {
  const index = rooms.value.findIndex((b) => b.id === id);
  if (index >= 0) {
    closeDialog();
    roomEdit.value = rooms.value[index];
    dialogForm.value = true;
  }
}
/**
 * On Removed
 * @param id
 */
function onRemoved(id: number) {
  const index = rooms.value.findIndex((b) => b.id === id);
  if (index >= 0) {
    rooms.value.splice(index, 1);
  }
  closeDialog();
}

onBeforeMount(async () => {
  try {
    const resp = await $api.get<IRoom[]>('api/rooms');
    rooms.value = resp.data;
  } catch (error) {
    handleAxiosError(error);
  }
});
</script>
