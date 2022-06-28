<template>
  <q-card style="max-width: 25rem" class="no-box-shadow">
    <q-form @submit.prevent="onSubmit">
      <q-card-section>
        <div class="text-body1 text-center">Entrar en Mis Rentas</div>
      </q-card-section>
      <q-card-section class="q-gutter-y-sm">
        <!-- Email -->
        <q-input v-model="form.email" name="email" type="email" label="Email" />
        <!-- / Email -->
        <!-- Password -->
        <q-input
          v-model="form.password"
          name="password"
          type="password"
          label="Contraseña"
        />
        <!-- / Password -->
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="primary"
          icon="mdi-check"
          label="Iniciar"
          type="submit"
          class="full-width"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { $api } from 'src/boot/axios';
import { $notificationHelper, handleAxiosError } from 'src/helpers';
import { injectStrict, _appInjectable } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

/**
 * IAuth
 */
interface IAuth {
  email: string;
  password: string;
}
/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */
const $app = injectStrict(_appInjectable);
const $router = useRouter();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const form = ref<IAuth>({
  email: '',
  password: '',
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
    const resp = await $api.post<{ api_token: string }>(
      'api/users/login',
      form.value
    );
    if (resp.data.api_token) {
      $app.api_token = resp.data.api_token;
      $app.save();
      void $router.push({ name: ROUTE_NAME.BOOKING_HOME });
    }
  } catch (error) {
    handleAxiosError(error);
  }
  $notificationHelper.loading(false);
}
</script>
