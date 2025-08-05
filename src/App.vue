<template>
  <RouterView />

  <NotificationComponent />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NotificationComponent from './components/NotificationComponent.vue';
</script>