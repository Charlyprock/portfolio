<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="">
    <h1 class="">{{ msg }}</h1>
  </div>
</template>

