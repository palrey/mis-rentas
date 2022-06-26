<template>
  <q-layout view="lHh Lpr lFF">
    <template v-if="isMobile">
      <admin-header />

      <admin-left-drawer />

      <q-page-container>
        <router-view />
      </q-page-container>

      <!-- <admin-footer /> -->
    </template>

    <q-page-container v-else>
      <q-page padding>
        <q-card class="text-center">
          <q-img
            src="img/logo.png"
            :ratio="4 / 3"
            spinner-color="primary"
            spinner-size="82px"
            style="max-width: 20rem"
          />
          <q-card-section class="text-h6">
            Solamente disponible para telefonos
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import AdminHeader from './AdminHeader.vue';
import AdminLeftDrawer from './AdminLeftDrawer.vue';
// import AdminFooter from './AdminFooter.vue';
import { $appInjectable, _appInjectable } from 'src/injectables';
import { computed, provide } from 'vue';
// import { useQuasar } from 'quasar';

// const $q = useQuasar();
/**
 * -----------------------------------------
 *	Provide
 * -----------------------------------------
 */
provide(_appInjectable, $appInjectable);

const isMobile = computed(() => true);
// const isMobile = computed(() => $q.platform.is.mobile);
</script>
