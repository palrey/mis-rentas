<template>
  <q-header reveal elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer" />

      <q-toolbar-title>
        {{ appTitle }}
      </q-toolbar-title>
    </q-toolbar>

    <q-tabs align="left" v-if="!isMobile">
      <q-route-tab :to="{ name: ROUTE_NAME.BOOKING_HOME }" label="Reservas" />
      <q-route-tab
        :to="{ name: ROUTE_NAME.BOOKING_ROOMS }"
        label="Habitaciones"
      />
      <q-route-tab :to="{ name: ROUTE_NAME.TASKS_HOME }" label="Tareas" />
    </q-tabs>
  </q-header>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { injectStrict, _appInjectable } from 'src/injectables';
import { computed } from 'vue';
import { ROUTE_NAME } from 'src/router';

/**
 * -----------------------------------------
 *	Injectables
 * -----------------------------------------
 */
const $app = injectStrict(_appInjectable);
const $q = useQuasar();
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
const appTitle = computed(() => $app.title);
const isMobile = computed(() => $q.platform.is.mobile);
/**
 * Toggle Left Drawer
 */
function toggleLeftDrawer() {
  $app.toggleLeftDrawer();
}
</script>
