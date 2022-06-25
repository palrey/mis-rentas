<template>
  <q-layout view="lHh Lpr lFF">
    <admin-header />

    <admin-left-drawer />

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <admin-footer /> -->
  </q-layout>
</template>

<script lang="ts" setup>
import AdminHeader from './AdminHeader.vue';
import AdminLeftDrawer from './AdminLeftDrawer.vue';
// import AdminFooter from './AdminFooter.vue';
import { $appInjectable, _appInjectable } from 'src/injectables';
import { provide } from 'vue';

/**
 * -----------------------------------------
 *	Provide
 * -----------------------------------------
 */
provide(_appInjectable, $appInjectable);
</script>
