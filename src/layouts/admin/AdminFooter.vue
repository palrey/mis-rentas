<template>
  <q-footer elevated class="bg-grey-8 text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        <div>{{ appTitle }}</div>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script lang="ts" setup>
import { injectStrict, _appInjectable } from 'src/injectables';
import { computed } from 'vue';

/**
 * -----------------------------------------
 *	Injectable
 * -----------------------------------------
 */
const $app = injectStrict(_appInjectable);
/**
 * -----------------------------------------
 *	data
 * -----------------------------------------
 */
const appTitle = computed(() => $app.title);
</script>
