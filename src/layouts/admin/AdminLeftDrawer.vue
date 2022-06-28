<template>
  <q-drawer
    :model-value="leftDrawerOpen"
    @update:model-value="updateDrawerleft"
    show-if-above
    bordered
  >
    <div class="q-pa-md text-grey-9 text-center">{{ appTitle }}</div>

    <q-list class="rounded-borders text-grey-9">
      <!-- Bookings -->
      <q-item exact clickable :to="{ name: ROUTE_NAME.BOOKING_HOME }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-cart" text-color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Reservas</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Bookings -->
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import { injectStrict, _appInjectable } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';
import { computed } from 'vue';

/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */
const $app = injectStrict(_appInjectable);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const appTitle = computed(() => $app.title);
const leftDrawerOpen = computed(() => $app.leftDrawer);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function updateDrawerleft(l: boolean) {
  $app.leftDrawer = l;
}
</script>
