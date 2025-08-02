<template>
  <header>
    <img alt="Vue logo" class="" src="@/assets/logo.svg" width="125" height="125" />

    <div class="">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <NotificationComponent />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NotificationComponent from './components/NotificationComponent.vue';
</script>