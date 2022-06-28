<template>
  <router-view class="text-grey-9" />
</template>

<script lang="ts" setup>
import { provide } from 'vue';
import { $appInjectable, _appInjectable } from './injectables';
/**
 * -----------------------------------------
 *	Provide
 * -----------------------------------------
 */
provide(_appInjectable, $appInjectable);

$appInjectable.load();
</script>
