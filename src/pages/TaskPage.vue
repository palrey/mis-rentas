<template>
  <q-page padding>
    <section>
      <q-card class="no-box-shadow">
        <q-card-section>
          <q-btn
            dense
            outline
            color="primary"
            icon="mdi-magnify"
            label="Ver Todas"
            class="full-width"
            @click="getAllTasks"
          /><q-btn
            dense
            color="primary"
            icon="mdi-plus"
            label="Nueva Tarea"
            class="full-width"
            @click="dialogForm = true"
          />
        </q-card-section>
        <q-card-section>
          <q-timeline color="primary" layout="dense">
            <q-timeline-entry
              @click="onEdit(task.id)"
              v-for="(task, key) in tasks"
              :title="task.type"
              :body="task.message"
              :subtitle="new Date(task.date).toLocaleDateString()"
              :key="`task-${key}-${task.id}`"
              icon="mdi-calendar"
            />
          </q-timeline>
        </q-card-section>
      </q-card>
    </section>

    <!-- Dialog Form -->
    <q-dialog v-model="dialogForm" :maximized="isMobile">
      <task-form
        :style="`${isMobile ? '' : 'min-width:20rem'}`"
        @completed="onFormComplete"
        @destroyed="onFormDestroyed"
        @canceled="closeDialog"
        @updated="onFormUpdated"
        :task="taskEdit"
      />
    </q-dialog>
    <!-- / Dialog Form -->
  </q-page>
</template>

<script setup lang="ts">
import { $api } from 'src/boot/axios';
import { $notificationHelper, handleAxiosError, isMobile } from 'src/helpers';
import { ITask } from 'src/types';
import { onBeforeMount, ref } from 'vue';
import TaskForm from 'src/components/forms/TaskForm.vue';
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const dialogForm = ref(false);
const tasks = ref<ITask[]>([]);
const taskEdit = ref<ITask>();
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
  taskEdit.value = undefined;
}
/**
 * Get all tasks
 */
async function getAllTasks() {
  $notificationHelper.loading();
  try {
    tasks.value = (await $api.get<ITask[]>('api/tasks/all')).data;
  } catch (error) {
    handleAxiosError(error);
  }
  $notificationHelper.loading(false);
}
/**
 * On Form Complete
 * @param b
 */
function onFormComplete(b: ITask) {
  tasks.value.push(b);
  closeDialog();
}
function onFormDestroyed(id: number) {
  const index = tasks.value.findIndex((b) => b.id === id);
  if (index >= 0) {
    tasks.value.splice(index, 1);
  }
  closeDialog();
}
/**
 * On Room Complete
 * @param update
 */
function onFormUpdated(update: ITask) {
  const index = tasks.value.findIndex((b) => b.id === update.id);
  if (index >= 0) {
    tasks.value[index] = update;
  }
  closeDialog();
}
/**
 * on Edit
 * @param id
 */
function onEdit(id: number) {
  const index = tasks.value.findIndex((b) => b.id === id);
  if (index >= 0) {
    closeDialog();
    taskEdit.value = tasks.value[index];
    dialogForm.value = true;
  }
}

onBeforeMount(async () => {
  $notificationHelper.loading();
  try {
    tasks.value = (await $api.get<ITask[]>('api/tasks')).data;
  } catch (error) {
    handleAxiosError(error);
  }
  $notificationHelper.loading(false);
});
</script>
