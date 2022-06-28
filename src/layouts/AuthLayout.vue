<template>
  <q-layout view="lHh Lpr lff">
    <q-page-container class="bg-secondary">
      <q-page padding class="q-pa-sm">
        <login-form class="absolute-center" style="min-width: 20rem" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import LoginForm from 'src/components/forms/LoginForm.vue';
import { useMeta } from 'quasar';

useMeta({
  title: 'PalRey | Inicio',
});
</script>
