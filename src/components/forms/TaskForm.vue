<template>
  <q-card>
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="q-gutter-y-sm">
        <div class="text-center">
          <q-date v-model="form.date" minimal />
        </div>

        <q-input v-model="form.type" type="text" label="Titulo" />

        <q-input v-model="form.message" type="textarea" label="Tarea" />
      </q-card-section>
      <q-card-actions>
        <q-btn color="negative" icon="mdi-delete" @click="onDelete" />
        <q-btn
          color="primary"
          outline
          label="Regresar"
          @click="$emit('canceled')"
        />

        <q-btn color="primary" label="Guardar" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { ITask } from 'src/types';
import { $notificationHelper, handleAxiosError } from 'src/helpers';
import { $api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */

const $emit = defineEmits<{
  (name: 'completed', p: ITask): void;
  (name: 'destroyed', p: number): void;
  (name: 'updated', p: ITask): void;
  (name: 'canceled'): void;
}>();
const $props = defineProps<{ task?: ITask }>();
const $q = useQuasar();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const form = ref<ITask>({
  completed: false,
  date: '',
  id: 0,
  message: '',
  type: '',
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */

async function onDelete() {
  $q.dialog({
    message: 'Desea eliminar la tarea?',
    title: 'Eliminar tarea',
    ok: 'Si',
    cancel: 'no',
  }).onOk(async () => {
    try {
      await $api.delete(`api/tasks/${form.value.id}`);
      $emit('destroyed', form.value.id);
    } catch (error) {
      handleAxiosError(error);
    }
  });
}
/**
 * On Submit
 */
async function onSubmit() {
  $notificationHelper.loading();
  try {
    if ($props.task) {
      $emit(
        'updated',
        (await $api.patch<ITask>(`api/tasks/${$props.task.id}`, form.value))
          .data
      );
    } else {
      $emit(
        'completed',
        (await $api.post<ITask>('api/tasks/', form.value)).data
      );
    }
  } catch (error) {
    handleAxiosError(error);
  }
  $notificationHelper.loading(false);
}

onBeforeMount(() => {
  if ($props.task) {
    form.value = $props.task;
  }
});
</script>
