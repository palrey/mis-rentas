<template>
  <q-page padding>
    <q-card class="no-shadow-box">
      <!-- <q-card-section>
        <div class="text-h6">Rentas PalRey</div>
        <div class="text-subtitle2">Gestión de Reservas</div>
      </q-card-section> -->
      <q-card-section class="text-center">
        <q-img
          src="img/logo.png"
          :ratio="4 / 3"
          spinner-color="primary"
          spinner-size="82px"
          style="max-width: 15rem"
        />
      </q-card-section>
      <q-card-section>
        <q-btn
          color="primary"
          icon="mdi-home"
          label="Administrar Reservas"
          class="full-width"
          :to="{ name: ROUTE_NAME.ADMIN_BOOKINGS }"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ROUTE_NAME } from 'src/router';
</script>
